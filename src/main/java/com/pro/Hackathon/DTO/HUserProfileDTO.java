package com.pro.Hackathon.DTO;

public class HUserProfileDTO {
	private Long userid;
    private String name;
    private String email;
	public Long getUserid() {
		return userid;
	}
	public void setUserid(Long userid) {
		this.userid = userid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "UserProfileDTO [userid=" + userid + ", name=" + name + ", email=" + email + "]";
	}
	public HUserProfileDTO(Long userid, String name, String email) {
		super();
		this.userid = userid;
		this.name = name;
		this.email = email;
	}
	public HUserProfileDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

}
