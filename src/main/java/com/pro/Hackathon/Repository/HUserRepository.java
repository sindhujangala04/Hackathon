package com.pro.Hackathon.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pro.Hackathon.Model.HUser;



@Repository
public interface HUserRepository extends JpaRepository<HUser, Long> {

    HUser findByEmailAndPassword(String email, String password);

}
