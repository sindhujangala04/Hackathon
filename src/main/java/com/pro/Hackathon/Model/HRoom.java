package com.pro.Hackathon.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;


import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class HRoom {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomid;

    private String roomnumber;
    private boolean availability;
    private double price;
    private int capacities;

    //  Many rooms → one hotel
    @ManyToOne
    @JoinColumn(name = "hotelid")
    @JsonIgnore
    private HHotel hotel;

    //  Facilities list
    @ElementCollection
    @CollectionTable(name = "room_facilities", joinColumns = @JoinColumn(name = "roomid"))
    @Column(name = "facility")
    private List<String> facilities;

    public HRoom() {}

    public HRoom(Long roomid, String roomnumber, boolean availability,
                double price, int capacities, HHotel hotel, List<String> facilities) {
        this.roomid = roomid;
        this.roomnumber = roomnumber;
        this.availability = availability;
        this.price = price;
        this.capacities = capacities;
        this.hotel = hotel;
        this.facilities = facilities;
    }

    // Getters & Setters
    public Long getRoomid() { return roomid; }
    public void setRoomid(Long roomid) { this.roomid = roomid; }

    public String getRoomnumber() { return roomnumber; }
    public void setRoomnumber(String roomnumber) { this.roomnumber = roomnumber; }

    public boolean isAvailability() { return availability; }
    public void setAvailability(boolean availability) { this.availability = availability; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getCapacities() { return capacities; }
    public void setCapacities(int capacities) { this.capacities = capacities; }

    public HHotel getHotel() { return hotel; }
    public void setHotel(HHotel hotel) { this.hotel = hotel; }

    public List<String> getFacilities() { return facilities; }
    public void setFacilities(List<String> facilities) { this.facilities = facilities; }
}


