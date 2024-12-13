package com.employee.user.service.dto;

import lombok.Data;

@Data
public class ProjectDto {

    private String projectCode;

    private String startDate;

    private String endDate;

    private String clientName;

    private String reportingManager;
}
