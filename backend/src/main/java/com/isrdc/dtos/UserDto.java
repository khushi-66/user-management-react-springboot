package com.isrdc.dtos;



public class UserDto {

	
	private Integer userId;
	private String name;
	private String profession;
	private Integer age;
	private String email;
	private String phone;
	private String imagepath;
	private String password;
	
	@Override
	public String toString() {
		return "UserDto [userId=" + userId + ", name=" + name + ", profession=" + profession + ", age=" + age
				+ ", email=" + email + ", phone=" + phone + ", imagepath=" + imagepath + ", password=" + password + "]";
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getProfession() {
		return profession;
	}
	public void setProfession(String profession) {
		this.profession = profession;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getImagepath() {
		return imagepath;
	}
	public void setImagepath(String imagepath) {
		this.imagepath = imagepath;
	}



}
