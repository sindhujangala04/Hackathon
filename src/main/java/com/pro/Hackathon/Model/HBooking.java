package com.pro.Hackathon.Model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


public class HBooking {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingid;

    private String status;
    private LocalDate checkin;
    private LocalDate checkout;
    private LocalDateTime bookeddate;

    //  Many bookings → one user
    @ManyToOne
    @JoinColumn(name = "userid")
    @JsonIgnore
    private HUser user;

    //  Many bookings → one room
    @ManyToOne
    @JoinColumn(name = "roomid")
    private HRoom room;

    //  Many bookings → one hotel
    @ManyToOne
    @JoinColumn(name = "hotelid")
    @JsonIgnore
    private HHotel hotel;

    public HBooking() {}

    public HBooking(Long bookingid, String status, LocalDate checkin,
                   LocalDate checkout, LocalDateTime bookeddate,
                   HUser user, HRoom room, HHotel hotel) {
        this.bookingid = bookingid;
        this.status = status;
        this.checkin = checkin;
        this.checkout = checkout;
        this.bookeddate = bookeddate;
        this.user = user;
        this.room = room;
        this.hotel = hotel;
    }

    // Getters & Setters
    public Long getBookingid() { return bookingid; }
    public void setBookingid(Long bookingid) { this.bookingid = bookingid; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getCheckin() { return checkin; }
    public void setCheckin(LocalDate checkin) { this.checkin = checkin; }

    public LocalDate getCheckout() { return checkout; }
    public void setCheckout(LocalDate checkout) { this.checkout = checkout; }

    public LocalDateTime getBookeddate() { return bookeddate; }
    public void setBookeddate(LocalDateTime bookeddate) { this.bookeddate = bookeddate; }

    public HUser getUser() { return user; }
    public void setUser(HUser user) { this.user = user; }

    public HRoom getRoom() { return room; }
    public void setRoom(HRoom room) { this.room = room; }

    public HHotel getHotel() { return hotel; }
    public void setHotel(HHotel hotel) { this.hotel = hotel; }
}


