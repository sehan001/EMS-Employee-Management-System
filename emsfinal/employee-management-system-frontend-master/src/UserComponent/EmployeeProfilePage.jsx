import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeProfilePage = () => {
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));

  const [department, setDepartment] = useState({});

  useEffect(() => {
    const getAllDepartment = async () => {
      const department = await retrieveDepartment();
      if (department) {
        setDepartment(department[0]);
      }
    };

    getAllDepartment();
  }, []);

  const retrieveDepartment = async () => {
    const response = await axios.get(
      "http://localhost:8087/department/fetch?departmentId=" +
        employee.departmentId
    );
    console.log(response);
    return response.data.department;
  };

  return (
    <div className="mt-3">
      <div
        className="d-flex justify-content-center"
      >
        <div
          className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
          style={{
            height: "auto",
            width: "500px",
          }}
        >
          <div className="card-header custom-bg-text text-center bg-color">
            <h2>Employee Details</h2>
          </div>
          <div
            className="card-body"
            style={{
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={"http://localhost:8081/user/image/" + employee.image}
                alt="Profile"
              />
              
              <h3>Personal Details</h3>
              <p>
                <span className="text-color">
                  <b> Employee Name:</b>
                </span>
                {employee.firstName} {employee.lastName}
              </p>
              <p>
                <span className="text-color">
                  <b> Age:</b>
                </span>
                {employee.age}
              </p>
              <p>
                <span className="text-color">
                  <b>Gender:</b>
                </span>
                {employee.gender}
              </p>
              <p>
                <span className="text-color">
                  <b> Date of Birth:</b>
                </span>
                {employee.dob} 
              </p>
              <p>
                <span className="text-color">
                  <b>Address:</b>
                </span>
                {employee.city}, {employee.pincode}
              </p>
              
              
              <h3>Professional Details</h3>
              <p>
              <span className="text-color">
              <b> Employee ID:</b>
              </span>
              {`${employee.id}12345`}
             </p>

             
              <p>
                <span className="text-color">
                  <b> Company Email Id:</b>
                </span>
                {employee.emailId}
              </p>
              <p>
                <span className="text-color">
                  <b> Contact No:</b>
                </span>
                {employee.contact}
              </p>
              <p>
                <span className="text-color">
                  <b> Experience:</b>
                </span>
                {employee.experience} years
              </p>
              <p>
                <span className="text-color">
                  <b> Current Project Name:</b>
                </span>
                {employee.projname} 
              </p>
              <p>
                <span className="text-color">
                  <b> Employment History:</b>
                </span>
                {employee.emphistory} 
              </p>
              <p>
                <span className="text-color">
                  <b> Date of Joining:</b>
                </span>
                {employee.doj} 
              </p>
              <p>
                <span className="text-color">
                  <b> HR Name:</b>
                </span>
                {employee.hrname} 
              </p>
              <p>
                <span className="text-color">
                  <b> Office Address:</b>
                </span>
                {employee.officeaddress} 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
