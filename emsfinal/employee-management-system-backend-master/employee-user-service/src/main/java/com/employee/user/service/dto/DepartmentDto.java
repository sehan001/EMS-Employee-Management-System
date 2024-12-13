package com.employee.user.service.dto;

import java.util.List;

import lombok.Data;

public class DepartmentDto extends CommonApiResponse {

	private List<Department> department;

	public List<Department> getDepartment() {
		return department;
	}

	public void setDepartment(List<Department> department) {
		this.department = department;
	}

}
