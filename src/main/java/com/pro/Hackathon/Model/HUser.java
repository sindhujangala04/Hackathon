package com.pro.Hackathon.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

	@Entity
	public class HUser {
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long userid;

	    private String username;
	    private String email;
	    private String phone;
	    private String password;

	    public HUser() {}

	    public HUser(Long userid, String username, String email, String phone, String password) {
	        this.userid = userid;
	        this.username = username;
	        this.email = email;
	        this.phone = phone;
	        this.password = password;
	    }

	    // Getters & Setters
	    public Long getUserid() { return userid; }
	    public void setUserid(Long userid) { this.userid = userid; }

	    public String getUsername() { return username; }
	    public void setUsername(String username) { this.username = username; }

	    public String getEmail() { return email; }
	    public void setEmail(String email) { this.email = email; }

	    public String getPhone() { return phone; }
	    public void setPhone(String phone) { this.phone = phone; }

	    public String getPassword() { return password; }
	    public void setPassword(String password) { this.password = password; }
	}


