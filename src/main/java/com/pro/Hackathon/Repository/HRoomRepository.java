package com.pro.Hackathon.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pro.Hackathon.Model.HRoom;

@Repository
public interface HRoomRepository extends JpaRepository<HRoom, Long> {
	@Query("""
		    SELECT DISTINCT r
		    FROM HRoom r
		    LEFT JOIN r.facilities f
		    WHERE r.hotel.hotelid = :hotelId
		    AND r.capacities >= :capacities
		    AND r.price BETWEEN :minPrice AND :maxPrice
		    AND (
		        :facilities IS NULL
		        OR LOWER(f) IN :facilities
		    )
		    AND r.availability = true
		    AND NOT EXISTS (
		        SELECT b
		        FROM HBooking b
		        WHERE b.room.roomid = r.roomid
		        AND b.status = 'BOOKED'
		        AND (
		            b.checkin < :toDate
		            AND b.checkout > :fromDate
		        )
		    )
		""")
		List<HRoom> searchRooms(
		    Long hotelId,
		    List<String> facilities,
		    Integer capacities,
		    Double minPrice,
		    Double maxPrice,
		    LocalDate fromDate,
		    LocalDate toDate
		);

//-----------------------------------------------------------------------------------------------------------------------
    // get all rooms of a hotel
    List<HRoom> findByHotelHotelid(Long hotelid);

    // get only available rooms (boolean true)
    List<HRoom> findByHotelHotelidAndAvailabilityTrue(Long hotelid);
}
