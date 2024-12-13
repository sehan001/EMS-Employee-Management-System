package com.employee.user.service.dto;

import java.util.List;

import com.employee.user.service.entity.User;

import lombok.Data;

public class UserList {

	private User user;

	private List<Salary> salary;

	private List<Department> department;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Salary> getSalary() {
		return salary;
	}

	public void setSalary(List<Salary> salary) {
		this.salary = salary;
	}

	public List<Department> getDepartment() {
		return department;
	}

	public void setDepartment(List<Department> department) {
		this.department = department;
	}

}
