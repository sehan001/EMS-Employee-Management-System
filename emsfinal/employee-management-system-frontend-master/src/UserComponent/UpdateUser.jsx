import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const UpdateUser = () => {
  const location = useLocation();
  const userData = location.state;

  const [user, setUser] = useState(userData);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [projects, setProjects] = useState([{ projname: '', projcode: '', repmanager: '', empemail: '', startdate: '', enddate: '' }]);

  const handleAddProject = () => {
    setProjects([...projects, { projname: '', projcode: '', repmanager: '', empemail: '', startdate: '', enddate: '' }]);
  };
  
  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const saveUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("image", selectedPhoto);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("password", user.password);
    formData.append("contact", user.contact);
    formData.append("emailId", user.emailId);
    formData.append("street", user.street);
    formData.append("age", user.age);
    formData.append("gender", user.gender);
    formData.append("experience", user.experience);
    formData.append("city", user.city);
    formData.append("pincode", user.pincode);
    formData.append("departmentId", user.departmentId);
    formData.append("role", user.role);
    formData.append("status", user.status);
    formData.append("officeaddress", user.officeaddress); // Include office address
    formData.append("emphistory", user.emphistory); // Include employment history
    formData.append("doj", user.doj); // Include date of joining
    formData.append("dob", user.dob);
    formData.append("hrname", user.hrname);
    formData.append("projname", user.projname); // Include HR name
    formData.append("projcode", user.projcode);
    formData.append("repmanager", user.repmanager);
    formData.append("empemail", user.empemail);
    formData.append("startdate", user.startdate);
    formData.append("enddate", user.enddate);


    try {
      const response = await axios.put("http://localhost:8081/user/update", formData);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.href = "/home"; // Redirect to home page
        }, 1000);
      } else {
        toast.error("Failed to update user.", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      toast.error("Failed to update user.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div className="card form-card border-color text-color custom-bg" style={{ width: "50rem" }}>
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Update {user.role}</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveUser}>
              {/* Input fields for each attribute */}
                <button
                  className="btn btn-link"
                  type="button"
                  style={{ color: "purple" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#personalDetails"
                  aria-expanded="true"
                  aria-controls="personalDetails"
                >
                  <Button variant="contained" className="mt-2" startIcon={<IoIosArrowDropdownCircle />}>
                    Professional Details
                  </Button>
                </button>

                <div className="col-md-6 mb-3 text-color">
  <label htmlFor="code" className="form-label"><b>Employee Code</b></label>
  <input
    className="form-control"
    id="code"
    name="code"
    value={`${user.id}12345`} // Correct usage of template literal
    readOnly // Use readOnly instead of readonly
  />
</div>



              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label htmlFor="emailId" className="form-label">Company Email Id</label>
                </b>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  value={user.emailId}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                  value={user.contact}
                  onChange={handleUserInput}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="officeaddress" className="form-label">
                  <b>Office Address</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="officeaddress"
                  name="officeaddress"
                  value={user.officeaddress}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="emphistory" className="form-label">
                  <b>Employment History</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emphistory"
                  name="emphistory"
                  value={user.emphistory}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="doj" className="form-label">
                  <b>Date of Joining</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="doj"
                  name="doj"
                  value={user.doj}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="hrname" className="form-label">
                  <b>HR Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="hrname"
                  name="hrname"
                  value={user.hrname}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="experience" className="form-label">
                  <b>Experience</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="experience"
                  name="experience"
                  value={user.experience}
                  onChange={handleUserInput}
                />
              </div>
              
              <button
                  className="btn btn-link"
                  type="button"
                  style={{ color: "purple" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#personalDetails"
                  aria-expanded="true"
                  aria-controls="personalDetails"
                >
                  <Button variant="contained" className="mt-2" startIcon={<IoIosArrowDropdownCircle />}>
                    Personal Details
                  </Button>
                </button>
              
                <div className="col-md-6 mb-3 text-color">
                <label htmlFor="firstName" className="form-label">
                  <b> First Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="lastName" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">
                  <b>Permanent address</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={user.city}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="age" className="form-label">
                  <b>Age</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={user.age}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="gender" className="form-label">
                  <b>Gender</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="street" className="form-label">
                  <b>Temporary Address</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  value={user.street}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="dob" className="form-label">
                  <b>Date of Birth</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={user.dob}
                
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="pincode" className="form-label">
                  <b>Pincode</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  value={user.pincode}
                  onChange={handleUserInput}
                />
              </div>
            {/*  <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="departmentId" className="form-label">
                  <b>Department ID</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="departmentId"
                  name="departmentId"
                  value={user.departmentId}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="role" className="form-label">
                  <b>Role</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="status" className="form-label">
                  <b>Status</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  name="status"
                  value={user.status}
                  onChange={handleUserInput}
                />
              </div> */}
              
              <div className="col-md-6 mb-3">
                <label htmlFor="image" className="form-label">
                  <b>Profile Picture</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}
                />
              </div>
              
              <button
                  className="btn btn-link"
                  type="button"
                  style={{ color: "purple" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#personalDetails"
                  aria-expanded="true"
                  aria-controls="personalDetails"
                >
                  <Button variant="contained" className="mt-2" startIcon={<IoIosArrowDropdownCircle />}>
                    Project Details
                  </Button>
                </button>
              
                <div className="col-md-6 mb-3 text-color">
                <label htmlFor="projcode" className="form-label">
                  <b>Project Code </b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projcode"
                  name="projcode"
                  value={user.projcode}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="repmanager" className="form-label">
                  <b>Reporting Manager</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="repmanager"
                  name="repmanager"
                  value={user.repmanager}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="empemail" className="form-label">
                  <b>Employee Email</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="empemail"
                  name="empemail"
                  value={user.empemail}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="startdate" className="form-label">
                  <b>Start Date</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="startdate"
                  name="startdate"
                  value={user.startdate}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="enddate" className="form-label">
                  <b>End Date</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="enddate"
                  name="enddate"
                  value={user.enddate}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="projname" className="form-label">
                  <b>Project Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projname"
                  name="projname"
                  value={user.projname}
                  onChange={handleUserInput}
                />
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button  className="btn btn-primary">
                  Add Project
                </button>
              </div>


             

              <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Update User
                </button>
              </div>
             

            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
