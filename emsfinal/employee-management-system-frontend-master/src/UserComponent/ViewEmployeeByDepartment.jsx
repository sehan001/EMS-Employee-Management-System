import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ViewEmployeeByDepartment = () => {
  const manager = JSON.parse(sessionStorage.getItem("active-manager"));
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const getAllDepartment = async () => {
      const allEmployee = await retrieveAllEmployee();
      if (allEmployee) {
        setAllEmployees(allEmployee.users);
      }
    };

    getAllDepartment();
  }, []);

  const retrieveAllEmployee = async () => {
    const response = await axios.get(
      `http://localhost:8081/user/fetch/department/employee?role=employee&departmentId=${manager.departmentId}`
    );
    return response.data;
  };

  const deleteEmployee = (userId) => {
    fetch(`http://localhost:8081/user/delete?userId=${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 2000); // Reload after 2 seconds
          } else {
            toast.error("Failed to delete the employee", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const viewSalary = (employee) => {
    setSelectedEmployee(employee);
  };

  const updateEmployee = (user) => {
    navigate("/user/update", { state: user });
  };

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color">
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Employee</h2>
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
              <p>Current Project: {selectedEmployee.user.projname}</p>
             
              <button
                className="btn btn-sm bg-color custom-bg-text"
                onClick={() => setSelectedEmployee(null)}
              >
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
                    <th scope="col">Current Project</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allEmployees.map((employee) => (
                    <tr key={employee.user.id}>
                      <td>
                        <img
                          src={`http://localhost:8081/user/image/${employee.user.image}`}
                          className="img-fluid"
                          alt="product_pic"
                          style={{ maxWidth: "90px" }}
                        />
                      </td>
                      <td><b>{`${employee.user.id}12345`}</b></td>
                      <td><b>{employee.user.firstName}</b></td>
                      <td><b>{employee.user.lastName}</b></td>
                      <td><b>{employee.user.emailId}</b></td>
                      <td><b>{employee.user.contact}</b></td>
                      <td><b>{employee.user.experience}</b></td>
                      <td><b>{employee.user.projname}</b></td>
                      
                      <td>
                        <button
                          onClick={() => deleteEmployee(employee.user.id)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          <i className="fa fa-trash-o"></i>
                        </button>
                        <button
                          onClick={() => updateEmployee(employee.user)}
                          className="btn btn-sm bg-color custom-bg-text ms-1"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => viewSalary(employee)}
                          className="btn btn-sm bg-color custom-bg-text ms-1"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
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

export default ViewEmployeeByDepartment;
