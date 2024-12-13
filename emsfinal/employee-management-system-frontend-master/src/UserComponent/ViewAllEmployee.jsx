import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.css";
import "font-awesome/css/font-awesome.min.css";

const ViewAllEmployee = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to manage selected employee
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8081/user/fetch/all?role=employee");
        if (response.data.success) {
          // Initialize status as "Active" for each employee
          const employeesWithStatus = response.data.users.map((employee) => ({
            ...employee,
            user: {
              ...employee.user,
              status: "Active", // Assuming 'status' is a field in employee.user object
            },
          }));
          setAllEmployees(employeesWithStatus);
        } else {
          toast.error("Failed to fetch employees", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employees", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchAllEmployees();
  }, []);

  const deleteEmployee = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/user/delete?userId=${userId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.responseMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Reload employees after deletion
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      } else {
        toast.error(data.responseMessage || "Failed to delete employee", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const updateEmployee = (user) => {
    navigate("/user/update", { state: user });
  };

  const toggleStatus = (employee) => {
    // Toggle logic for status
    const updatedEmployees = allEmployees.map((emp) =>
      emp.user.id === employee.user.id
        ? {
            ...emp,
            user: {
              ...emp.user,
              status: emp.user.status === "Active" ? "Inactive" : "Active",
            },
          }
        : emp
    );
    setAllEmployees(updatedEmployees);
  };

  const viewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee); // Set selected employee to show details
  };

  const closeEmployeeDetails = () => {
    setSelectedEmployee(null); // Clear selected employee to hide details
  };

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color" style={{ height: "45rem" }}>
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Employees</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          {selectedEmployee ? (
            <div className="employee-details">
              <h3>Employee Details</h3>
              <img
                src={`http://localhost:8081/user/image/${selectedEmployee.user.image}`}
                className="img-fluid"
                alt="Employee"
              />
              <p>First Name: {selectedEmployee.user.firstName}</p>
              <p>Last Name: {selectedEmployee.user.lastName}</p>
              <p>Email: {selectedEmployee.user.emailId}</p>
              <p>Contact: {selectedEmployee.user.contact}</p>
              <p>Experience: {selectedEmployee.user.experience}</p>
              <p>Age: {selectedEmployee.user.age}</p>
              <p>Gender: {selectedEmployee.user.gender}</p>
              <button className="btn btn-sm bg-color custom-bg-text" onClick={closeEmployeeDetails}>
                Close
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">Employee</th>
                    <th scope="col">Employee Code</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Company Email Id</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Experience</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Action</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allEmployees.map((employee) => (
                    <tr key={employee.user.id} style={{ cursor: "pointer" }}>
                      <td>
                        <img
                          src={`http://localhost:8081/user/image/${employee.user.image}`}
                          className="img-fluid"
                          alt="product_pic"
                          style={{ maxWidth: "90px" }}
                        />
                      </td>
                      <td><b>{employee.user.id}</b></td>
                      <td><b>{employee.user.firstName}</b></td>
                      <td><b>{employee.user.lastName}</b></td>
                      <td><b>{employee.user.emailId}</b></td>
                      <td><b>{employee.user.contact}</b></td>
                      <td><b>{employee.user.experience}</b></td>
                      <td><b>{employee.user.age}</b></td>
                      <td><b>{employee.user.gender}</b></td>
                      <td>
                        <button onClick={() => deleteEmployee(employee.user.id)} className="btn btn-sm bg-color custom-bg-text">
                          <i className="fa fa-trash-o"></i>
                        </button>
                        <button onClick={() => updateEmployee(employee.user)} className="btn btn-sm bg-color custom-bg-text ms-1">
                          <i className='fas fa-edit'></i>
                        </button>
                        <button onClick={() => viewEmployeeDetails(employee)} className="btn btn-sm bg-color custom-bg-text ms-1">
                        <i className="fas fa-eye"></i>
                        </button>
                        <ToastContainer />
                      </td>
                      <td onClick={() => toggleStatus(employee)} style={{ cursor: "pointer" }}>
                        <i className={`fas ${employee.user.status === "Active" ? "fa-check-circle text-success" : "fa-times-circle text-danger"}`}></i>
                        {employee.user.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllEmployee;
