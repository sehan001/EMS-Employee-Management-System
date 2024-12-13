package com.employee.user.service.dto;

import java.util.List;

import lombok.Data;

public class SalaryDto extends CommonApiResponse {

	List<Salary> salary;

	public List<Salary> getSalary() {
		return salary;
	}

	public void setSalary(List<Salary> salary) {
		this.salary = salary;
	}

}
