package com.pro.Hackathon.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pro.Hackathon.Model.HHotel;

@Repository
public interface HHotelRepository extends JpaRepository<HHotel, Long> {

    List<HHotel> findByLocation(String location);

}