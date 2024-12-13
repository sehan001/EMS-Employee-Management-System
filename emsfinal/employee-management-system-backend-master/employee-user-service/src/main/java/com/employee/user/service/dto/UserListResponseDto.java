package com.employee.user.service.dto;

import java.util.List;

import lombok.Data;

public class UserListResponseDto extends CommonApiResponse {

	private List<UserList> users;

	public List<UserList> getUsers() {
		return users;
	}

	public void setUsers(List<UserList> users) {
		this.users = users;
	}

}
