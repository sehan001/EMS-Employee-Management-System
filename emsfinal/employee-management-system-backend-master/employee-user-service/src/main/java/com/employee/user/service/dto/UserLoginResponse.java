package com.employee.user.service.dto;

import com.employee.user.service.entity.User;

import lombok.Data;

public class UserLoginResponse extends CommonApiResponse {

	private User user;

	private String jwtToken;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

}
