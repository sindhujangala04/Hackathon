package com.pro.Hackathon.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pro.Hackathon.DTO.HBookingreq;
import com.pro.Hackathon.DTO.HRoomSearchReq;
import com.pro.Hackathon.DTO.HUserProfileDTO;
import com.pro.Hackathon.ExceptionHandler.UserNotLoggedInException;
import com.pro.Hackathon.Model.HBooking;
import com.pro.Hackathon.Model.HHotel;
import com.pro.Hackathon.Model.HRoom;
import com.pro.Hackathon.Model.HUser;
import com.pro.Hackathon.Service.HackathonService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class HController {

    @Autowired
    private HackathonService service;

    // SEARCH ROOMS
    @PostMapping("/{hotelId}/rooms/search")
    public List<HRoom> searchRooms(
            @PathVariable Long hotelId,
            @RequestBody HRoomSearchReq request) {

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
    public String bookRoom(@RequestBody HBookingreq request, HttpSession session) {

        HUser user = (HUser) session.getAttribute("user");
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
    public HUserProfileDTO getUserProfile(HttpSession session) {

        HUser user = (HUser) session.getAttribute("user");
        if (user == null) {
            throw new UserNotLoggedInException("User not logged in");
        }

        HUserProfileDTO dto = new HUserProfileDTO();
        dto.setUserid(user.getUserid());
        dto.setName(user.getUsername());
        dto.setEmail(user.getEmail());

        return dto;
    }

    // REGISTER
    @PostMapping("/register")
    public HUser register(@RequestBody HUser user) {
        return service.registerUser(user);
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody HUser user, HttpSession session) {

        HUser existingUser = service.login(user.getEmail(), user.getPassword());

        if (existingUser != null) {
            session.setAttribute("user", existingUser);
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }

    // SEARCH BY LOCATION
    @GetMapping("/bylocation")
    public List<HHotel> searchHotelsByLocation(@RequestParam String location) {
        return service.searchByLocation(location);
    }

    // FILTER BY DATE
    @GetMapping("/date")
    public List<HHotel> getAvailableHotelsByDate(
            @RequestParam String location,
            @RequestParam String checkin,
            @RequestParam String checkout) {

        LocalDate checkInDate = LocalDate.parse(checkin);
        LocalDate checkOutDate = LocalDate.parse(checkout);

        return service.findAvailableHotels(location, checkInDate, checkOutDate);
    }

    // HOTEL DETAILS
    @GetMapping("/hotel/{hotelId}")
    public HHotel getHotelDetails(@PathVariable Long hotelId) {
        return service.getHotelById(hotelId);
    }

    // MY BOOKINGS
    @GetMapping("/mybookings")
    public List<HBooking> myBookings(HttpSession session) {

        HUser user = (HUser) session.getAttribute("user");
        if (user == null) {
            throw new UserNotLoggedInException("User not logged in");
        }

        return service.getMyBookings(user.getUserid());
    }

    // CANCEL BOOKING
    @PostMapping("/cancel/{bookingId}")
    public String cancelBooking(@PathVariable Long bookingId, HttpSession session) {

        HUser user = (HUser) session.getAttribute("user");
        if (user == null) {
            throw new UserNotLoggedInException("User not logged in");
        }

        return service.cancelBooking(bookingId, user.getUserid());
    }
}
