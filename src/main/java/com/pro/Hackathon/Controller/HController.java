package com.pro.Hackathon.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class HController {

    @Autowired
    private HotelService service;

    // SEARCH ROOMS
    @PostMapping("/{hotelId}/rooms/search")
    public List<Rooms> searchRooms(
            @PathVariable Long hotelId,
            @RequestBody RoomSerachRequest request) {

        return service.searchRooms(
                hotelId,
                request.getFromDate(),
                request.getToDate(),
                request.getFacilities(),
                request.getCapacity(),
                request.getMinPrice(),
                request.getMaxPrice()
        );
    }

    // BOOK ROOM
    @PostMapping("/book")
    public String bookRoom(@RequestBody Bookingreq request, HttpSession session) {

        UserHotel user = (UserHotel) session.getAttribute("user");
        if (user == null) {
            throw new UserNotLoggedInException("User not logged in");
        }

        return service.bookRoom(
                user.getUserid(),
                request.getRoomid(),
                request.getCheckIn(),
                request.getCheckOut()
        );
    }

    // USER PROFILE
    @GetMapping("/profile")
    public UserProfileDTO getUserProfile(HttpSession session) {

        UserHotel user = (UserHotel) session.getAttribute("user");
        if (user == null) {
            throw new UserNotLoggedInException("User not logged in");
        }

        UserProfileDTO dto = new UserProfileDTO();
        dto.setUserid(user.getUserid());
        dto.setName(user.getUsername());
        dto.setEmail(user.getEmail());

        return dto;
    }

    // REGISTER
    @PostMapping("/register")
    public UserHotel register(@RequestBody UserHotel user) {
        return service.registerUser(user);
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody UserHotel user, HttpSession session) {

        UserHotel existingUser = service.login(user.getEmail(), user.getPassword());

        if (existingUser != null) {
            session.setAttribute("user", existingUser);
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }

    // SEARCH BY LOCATION
    @GetMapping("/bylocation")
    public List<Hotels> searchHotelsByLocation(@RequestParam String location) {
        return service.searchByLocation(location);
    }

    // FILTER BY DATE
    @GetMapping("/date")
    public List<Hotels> getAvailableHotelsByDate(
            @RequestParam String location,
            @RequestParam String checkin,
            @RequestParam String checkout) {

        LocalDate checkInDate = LocalDate.parse(checkin);
        LocalDate checkOutDate = LocalDate.parse(checkout);

        return service.findAvailableHotels(location, checkInDate, checkOutDate);
    }

    // HOTEL DETAILS
    @GetMapping("/hotel/{hotelId}")
    public Hotels getHotelDetails(@PathVariable Long hotelId) {
        return service.getHotelById(hotelId);
    }

    // MY BOOKINGS
    @GetMapping("/mybookings")
    public List<Booking> myBookings(HttpSession session) {

        UserHotel user = (UserHotel) session.getAttribute("user");
        if (user == null) {
            throw new UserNotLoggedInException("User not logged in");
        }

        return service.getMyBookings(user.getUserid());
    }

    // CANCEL BOOKING
    @PostMapping("/cancel/{bookingId}")
    public String cancelBooking(@PathVariable Long bookingId, HttpSession session) {

        UserHotel user = (UserHotel) session.getAttribute("user");
        if (user == null) {
            throw new UserNotLoggedInException("User not logged in");
        }

        return service.cancelBooking(bookingId, user.getUserid());
    }
}
