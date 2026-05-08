package com.pro.Hackathon.DTO;

import java.time.LocalDate;
import java.util.List;

public class HRoomSearchReq {
	private LocalDate fromDate;
    private LocalDate toDate;

    private List<String> facilities;
    private Integer capacity;
    private Double minPrice;
    private Double maxPrice;
	public HRoomSearchReq() {
		super();
		// TODO Auto-generated constructor stub
	}
	public HRoomSearchReq(LocalDate fromDate, LocalDate toDate, List<String> facilities, Integer capacity,
			Double minPrice, Double maxPrice) {
		super();
		this.fromDate = fromDate;
		this.toDate = toDate;
		this.facilities = facilities;
		this.capacity = capacity;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
	}
	@Override
	public String toString() {
		return "RoomSerachRequest [fromDate=" + fromDate + ", toDate=" + toDate + ", facilities=" + facilities
				+ ", capacity=" + capacity + ", minPrice=" + minPrice + ", maxPrice=" + maxPrice + "]";
	}
	public LocalDate getFromDate() {
		return fromDate;
	}
	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}
	public LocalDate getToDate() {
		return toDate;
	}
	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}
	public List<String> getFacilities() {
		return facilities;
	}
	public void setFacilities(List<String> facilities) {
		this.facilities = facilities;
	}
	public Integer getCapacity() {
		return capacity;
	}
	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}
	public Double getMinPrice() {
		return minPrice;
	}
	public void setMinPrice(Double minPrice) {
		this.minPrice = minPrice;
	}
	public Double getMaxPrice() {
		return maxPrice;
	}
	public void setMaxPrice(Double maxPrice) {
		this.maxPrice = maxPrice;
	}

}
