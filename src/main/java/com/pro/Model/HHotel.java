package com.pro.Model;

import java.util.List;



import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

public class HHotel {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelid;

    private String hotelname;
    private String location;
    private boolean availability;
    private int numberofrooms;

    //  One hotel → many rooms
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    private List<HRoom> rooms;

    public HHotel() {}

    public HHotel(Long hotelid, String hotelname, String location,boolean availability,
                int numberofrooms) {
        this.hotelid = hotelid;
        this.hotelname = hotelname;
        this.location = location;
        this.availability = availability;
        this.numberofrooms = numberofrooms;
    }

    // Getters & Setters
    public Long getHotelid() { return hotelid; }
    public void setHotelid(Long hotelid) { this.hotelid = hotelid; }

    public String getHotelname() { return hotelname; }
    public void setHotelname(String hotelname) { this.hotelname = hotelname; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public boolean isAvailability() { return availability; }
    public void setAvailability(boolean availability) { this.availability = availability; }

    public int getNumberofrooms() { return numberofrooms; }
    public void setNumberofrooms(int numberofrooms) { this.numberofrooms = numberofrooms; }

    public List<HRoom> getRooms() { return rooms; }
    public void setRooms(List<HRoom> rooms) { this.rooms = rooms; }
}


