import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ViewAllManager = () => {
  const [allManagers, setAllManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null); // State to manage selected manager
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllManagers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/user/fetch/all?role=manager");
        if (response.data.success) {
          setAllManagers(response.data.users);
        } else {
          toast.error("Failed to fetch managers", {
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
        console.error("Error fetching managers:", error);
        toast.error("Failed to fetch managers", {
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

    fetchAllManagers();
  }, []);

  const deleteManager = async (userId) => {
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
        // Reload managers after deletion
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      } else {
        toast.error(data.responseMessage || "Failed to delete manager", {
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
      console.error("Error deleting manager:", error);
      toast.error("Failed to delete manager", {
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

  const viewManagerDetails = (manager) => {
    setSelectedManager(manager); // Set selected manager to show details
  };

  const closeManagerDetails = () => {
    setSelectedManager(null); // Clear selected manager to hide details
  };

  const updateManager = (user) => {
    navigate("/user/update", { state: user });
  };

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 custom-bg border-color" style={{ height: "45rem" }}>
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Managers</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          {selectedManager ? (
            <div className="manager-details">
              <h3>Manager Details</h3>
              <img
                src={`http://localhost:8081/user/image/${selectedManager.user.image}`}
                className="img-fluid"
                alt="Manager"
              />
              <p>First Name: {selectedManager.user.firstName}</p>
              <p>Last Name: {selectedManager.user.lastName}</p>
              <p>Email: {selectedManager.user.emailId}</p>
              <p>Contact: {selectedManager.user.contact}</p>
              <p>Experience: {selectedManager.user.experience}</p>
              <p>Age: {selectedManager.user.age}</p>
              <p>Gender: {selectedManager.user.gender}</p>
              <button className="btn btn-sm bg-color custom-bg-text" onClick={closeManagerDetails}>
                Close
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">Manager</th>
                    <th scope="col">Manager Code</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Company Email Id</th>
                    <th scope="col">Contact</th>
                    {/*<th scope="col">Department</th> */}
                    <th scope="col">Experience</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    {/* <th scope="col">Street</th>
                  <th scope="col">City</th>
                  <th scope="col">Pincode</th> */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allManagers.map((manager) => (
                    <tr key={manager.user.id} style={{ cursor: "pointer" }}>
                      <td>
                        <img
                          src={`http://localhost:8081/user/image/${manager.user.image}`}
                          className="img-fluid"
                          alt="product_pic"
                          style={{ maxWidth: "90px" }}
                        />
                      </td>
                      <td><b>{manager.user.id}</b></td>
                      <td><b>{manager.user.firstName}</b></td>
                      <td><b>{manager.user.lastName}</b></td>
                      <td><b>{manager.user.emailId}</b></td>
                      <td><b>{manager.user.contact}</b></td>
                      {/* <td>
                        <b>{manager.department[0].name}</b>
                      </td> */}
                      <td><b>{manager.user.experience}</b></td>
                      <td><b>{manager.user.age}</b></td>
                      <td><b>{manager.user.gender}</b></td>
                      {/* <td>
                        <b>{manager.user.street}</b>
                      </td>
                      <td>
                        <b>{manager.user.city}</b>
                      </td>
                      <td>
                        <b>{manager.user.pincode}</b>
                      </td> */}
                      <td>
                        <button onClick={() => deleteManager(manager.user.id)} className="btn btn-sm bg-color custom-bg-text">
                          <i className="fa fa-trash-o"></i>
                        </button>
                        <button onClick={() => updateManager(manager.user)} className="btn btn-sm bg-color custom-bg-text ms-1">
                          <i className='fas fa-edit'></i>
                        </button>
                        <button onClick={() => viewManagerDetails(manager)} className="btn btn-sm bg-color custom-bg-text ms-1">
                          <i className="fas fa-eye"></i>
                        </button>
                        
                        <ToastContainer />
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

export default ViewAllManager;
