package com.pro.Hackathon.Service;


import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pro.Hackathon.ExceptionHandler.CancellationNotAllowedException;
import com.pro.Hackathon.ExceptionHandler.RoomAlreadyBookedException;
import com.pro.Hackathon.ExceptionHandler.UnauthorizedActionException;
import com.pro.Hackathon.Model.HBooking;
import com.pro.Hackathon.Model.HHotel;
import com.pro.Hackathon.Model.HRoom;
import com.pro.Hackathon.Model.HUser;
import com.pro.Hackathon.Repository.HBookingRepository;
import com.pro.Hackathon.Repository.HHotelRepository;
import com.pro.Hackathon.Repository.HRoomRepository;
import com.pro.Hackathon.Repository.HUserRepository;



@Service
public class HackathonService {

    @Autowired
    private HUserRepository userRepo;

    @Autowired
    private HHotelRepository hotelRepo;

    @Autowired
    private HRoomRepository roomRepo;

    @Autowired
    private HBookingRepository bookingRepo;

    // SEARCH ROOMS
    public List<HRoom> searchRooms(
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

        HUser user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        HRoom room = roomRepo.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        boolean alreadyBooked = bookingRepo.isRoomBooked(roomId, checkIn, checkOut);
        if (alreadyBooked) {
            throw new RoomAlreadyBookedException("Room is already booked for the selected dates");
        }

        HBooking booking = new HBooking();
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
    public HUser registerUser(HUser user) {
        return userRepo.save(user);
    }

    // LOGIN
    public HUser login(String email, String password) {
        return userRepo.findByEmailAndPassword(email, password);
    }

    // SEARCH BY LOCATION
    public List<HHotel> searchByLocation(String location) {
        return hotelRepo.findByLocation(location);
    }

    // FIND AVAILABLE HOTELS BY DATE
    public List<HHotel> findAvailableHotels(String location, LocalDate checkin, LocalDate checkout) {

        List<HHotel> hotels = hotelRepo.findByLocation(location);
        List<HHotel> availableHotels = new ArrayList<>();

        for (HHotel hotel : hotels) {

            List<HRoom> rooms = roomRepo.findByHotelHotelid(hotel.getHotelid());

            for (HRoom room : rooms) {

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
    public HHotel getHotelById(Long hotelId) {
        return hotelRepo.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
    }

    // ROOM AVAILABILITY CHECK
    private boolean isRoomAvailable(HRoom room, LocalDate checkin, LocalDate checkout) {

        List<HBooking> bookings = bookingRepo.findByRoom(room);

        for (HBooking booking : bookings) {
            if (booking.getCheckin().isBefore(checkout) &&
                booking.getCheckout().isAfter(checkin)) {
                return false;
            }
        }

        return true;
    }

    // MY BOOKINGS
    public List<HBooking> getMyBookings(Long userId) {
        return bookingRepo.findByUserUserid(userId);
    }

    // CANCEL BOOKING
    public String cancelBooking(Long bookingId, Long userId) {

        HBooking booking = bookingRepo.findById(bookingId)
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
System.out.println("HI");
        return "Booking cancelled successfully";
    }
}
