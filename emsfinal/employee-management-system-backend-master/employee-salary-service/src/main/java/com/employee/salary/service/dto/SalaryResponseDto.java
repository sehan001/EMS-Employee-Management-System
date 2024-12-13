package com.employee.salary.service.dto;

import java.util.List;

import com.employee.salary.service.entity.Salary;

import lombok.Data;

public class SalaryResponseDto extends CommonApiResponse {

	private List<Salary> salary;

	public List<Salary> getSalary() {
		return salary;
	}

	public void setSalary(List<Salary> salary) {
		this.salary = salary;
	}
	
	

}
