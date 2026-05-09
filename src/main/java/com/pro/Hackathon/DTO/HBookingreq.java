package com.pro.Hackathon.DTO;

import java.time.LocalDate;

public class HBookingreq {
	
	
		 private Long roomid;
		    private LocalDate checkIn;
		    private LocalDate checkOut;
			public HBookingreq() {
				super();
				// TODO Auto-generated constructor stub
			}
			public HBookingreq(Long roomid, LocalDate checkIn, LocalDate checkOut) {
				super();
				this.roomid = roomid;
				this.checkIn = checkIn;
				this.checkOut = checkOut;
			}
			@Override
			public String toString() {
				return "Bookingreq [roomid=" + roomid + ", checkIn=" + checkIn + ", checkOut=" + checkOut + "]";
			}
			public Long getRoomid() {
				return roomid;
			}
			public void setRoomid(Long roomid) {
				this.roomid = roomid;
			}
			public LocalDate getCheckIn() {
				return checkIn;
			}
			public void setCheckIn(LocalDate checkIn) {
				this.checkIn = checkIn;
			}
			public LocalDate getCheckOut() {
				return checkOut;
			}
			public void setCheckOut(LocalDate checkOut) {
				this.checkOut = checkOut;
			}
	}


