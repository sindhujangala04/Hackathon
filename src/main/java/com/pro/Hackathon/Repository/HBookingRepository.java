package com.pro.Hackathon.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pro.Hackathon.Model.HBooking;
import com.pro.Hackathon.Model.HRoom;

@Repository
public interface HBookingRepository extends JpaRepository<HBooking, Long> {
	//book room -----------------------------------------------------------
	@Query("""
		    SELECT COUNT(b) > 0 FROM HBooking b
		    WHERE b.room.roomid = :roomId
		    AND b.status = 'BOOKED'
		    AND (
		        b.checkin < :toDate
		        AND b.checkout > :fromDate
		    )
		""")
		boolean isRoomBooked(Long roomId, LocalDate fromDate, LocalDate toDate);
	//--------------------------------------------------------------------------

    // get bookings for a specific room
    List<HBooking> findByRoom(HRoom room);


    List<HBooking> findByUserUserid(Long userid);

	List<HBooking> findByUserUseridOrderByBookingidDesc(Long userId);

}
