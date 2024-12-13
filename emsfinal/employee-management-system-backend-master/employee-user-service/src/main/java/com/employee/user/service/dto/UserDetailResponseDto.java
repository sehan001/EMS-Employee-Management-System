package com.employee.user.service.dto;

import java.util.List;

import com.employee.user.service.entity.User;

import lombok.Data;

public class UserDetailResponseDto extends CommonApiResponse {

	private User user;

	private List<Salary> salaryList;

	private List<Department> department;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Salary> getSalaryList() {
		return salaryList;
	}

	public void setSalaryList(List<Salary> salaryList) {
		this.salaryList = salaryList;
	}

	public List<Department> getDepartment() {
		return department;
	}

	public void setDepartment(List<Department> department) {
		this.department = department;
	}

}
