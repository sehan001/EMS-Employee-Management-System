package com.employee.department.service.dto;

import java.util.List;
import com.employee.department.service.entity.Department;
import lombok.Data;


public class DepartmentResponseDto extends CommonApiResponse {

	private List<Department> department;

	public List<Department> getDepartment() {
		return department;
	}

	public void setDepartment(List<Department> department) {
		this.department = department;
	}
	
	

}
