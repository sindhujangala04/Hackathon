package com.pro.Hackathon.Service;


import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class HotelService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private HotelRepository hotelRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private BookingRepository bookingRepo;

    // SEARCH ROOMS
    public List<Rooms> searchRooms(
            Long hotelId,
            LocalDate fromDate,
            LocalDate toDate,
            List<String> facilities,
            Integer capacity,
            Double minPrice,
            Double maxPrice) {

        List<String> normalizedFacilities = facilities.stream()
                .map(String::toLowerCase)
                .toList();

        return roomRepo.searchRooms(
                hotelId,
                normalizedFacilities,
                capacity,
                minPrice,
                maxPrice,
                fromDate,
                toDate
        );
    }

    // BOOK ROOM
    public String bookRoom(Long userId, Long roomId, LocalDate checkIn, LocalDate checkOut) {

        UserHotel user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Rooms room = roomRepo.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        boolean alreadyBooked = bookingRepo.isRoomBooked(roomId, checkIn, checkOut);
        if (alreadyBooked) {
            throw new RoomAlreadyBookedException("Room is already booked for the selected dates");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setHotel(room.getHotel());
        booking.setCheckin(checkIn);
        booking.setCheckout(checkOut);
        booking.setStatus("BOOKED");
        booking.setBookeddate(LocalDateTime.now());

        bookingRepo.save(booking);

        return "Room booked successfully";
    }

    // REGISTER
    public UserHotel registerUser(UserHotel user) {
        return userRepo.save(user);
    }

    // LOGIN
    public UserHotel login(String email, String password) {
        return userRepo.findByEmailAndPassword(email, password);
    }

    // SEARCH BY LOCATION
    public List<Hotels> searchByLocation(String location) {
        return hotelRepo.findByLocation(location);
    }

    // FIND AVAILABLE HOTELS BY DATE
    public List<Hotels> findAvailableHotels(String location, LocalDate checkin, LocalDate checkout) {

        List<Hotels> hotels = hotelRepo.findByLocation(location);
        List<Hotels> availableHotels = new ArrayList<>();

        for (Hotels hotel : hotels) {

            List<Rooms> rooms = roomRepo.findByHotelHotelid(hotel.getHotelid());

            for (Rooms room : rooms) {

                if (!room.isAvailability()) continue;

                if (isRoomAvailable(room, checkin, checkout)) {
                    availableHotels.add(hotel);
                    break;
                }
            }
        }

        return availableHotels;
    }

    // HOTEL DETAILS
    public Hotels getHotelById(Long hotelId) {
        return hotelRepo.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
    }

    // ROOM AVAILABILITY CHECK
    private boolean isRoomAvailable(Rooms room, LocalDate checkin, LocalDate checkout) {

        List<Booking> bookings = bookingRepo.findByRoom(room);

        for (Booking booking : bookings) {
            if (booking.getCheckin().isBefore(checkout) &&
                booking.getCheckout().isAfter(checkin)) {
                return false;
            }
        }

        return true;
    }

    // MY BOOKINGS
    public List<Booking> getMyBookings(Long userId) {
        return bookingRepo.findByUserUserid(userId);
    }

    // CANCEL BOOKING
    public String cancelBooking(Long bookingId, Long userId) {

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getUser().getUserid().equals(userId)) {
            throw new UnauthorizedActionException("You are not authorized to cancel this booking");
        }

        if (!booking.getStatus().equalsIgnoreCase("booked")) {
            throw new CancellationNotAllowedException("Booking is already cancelled");
        }

        long hours = Duration.between(booking.getBookeddate(), LocalDateTime.now()).toHours();
        if (hours > 24) {
            throw new CancellationNotAllowedException("Cancellation not allowed after 24 hours of booking");
        }

        booking.setStatus("CANCELLED");
        bookingRepo.save(booking);

        return "Booking cancelled successfully";
    }
}
