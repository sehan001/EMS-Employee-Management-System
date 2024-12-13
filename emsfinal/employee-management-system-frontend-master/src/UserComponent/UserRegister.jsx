import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const UserRegister = () => {
  const navigate = useNavigate();
  const manager = JSON.parse(sessionStorage.getItem("active-manager"));
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    gender: "",
    departmentId: "",
    experience: "",
    officeaddress: "",
    emphistory: "",
    doj: "",
    hrname: "",
    dob:"",
    projname:"",
    projcode:"",
    repmanager:"",
    empemail:"",
    startdate:"",
    enddate:"",
    projects: [],
  });

  useEffect(() => {
    if (document.URL.indexOf("admin") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "admin" }));
    } else if (document.URL.indexOf("employee") !== -1) {
      setUser((prevUser) => ({
        ...prevUser,
        role: "employee",
        departmentId: manager.departmentId,
      }));
    } else if (document.URL.indexOf("manager") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "manager" }));
    }
  }, [manager]);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProjectInput = (e, index) => {
    const { name, value } = e.target;
    const projects = [...user.projects];
    projects[index][name] = value;
    setUser({ ...user, projects });
  };

  const addProject = () => {
    setUser((prevUser) => ({
      ...prevUser,
      projects: [
        ...prevUser.projects,
        { projectCode: "", startDate: "", endDate: "", clientName: "", reportingManager: "" },
      ],
    }));
  };

  const removeProject = (index) => {
    setUser((prevUser) => {
      const projects = [...prevUser.projects];
      projects.splice(index, 1);
      return { ...prevUser, projects };
    });
  };

  const [departments, setDepartments] = useState([]);

  const retrieveAllDepartments = async () => {
    const response = await axios.get("http://localhost:8087/department/all");
    return response.data;
  };

  useEffect(() => {
    const getAllDepartments = async () => {
      const allDepartments = await retrieveAllDepartments();
      if (allDepartments) {
        setDepartments(allDepartments.department);
      }
    };
    getAllDepartments();
  }, []);

  const saveUser = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedPhoto);
    Object.keys(user).forEach((key) => {
      if (key === "projects") {
        user[key].forEach((project, index) => {
          Object.keys(project).forEach((projectKey) => {
            formData.append(`projects[${index}][${projectKey}]`, project[projectKey]);
          });
        });
      } else {
        formData.append(key, user[key]);
      }
    });

    axios
      .post("http://localhost:8081/user/register", formData)
      .then((resp) => {
        if (resp.data.success) {
          toast.success(resp.data.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.href = "/user/login";
          }, 1000);
        } else {
          toast.error("It seems server is down!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          toast.error("It seems server is down!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.response) {
          toast.error(error.response.data.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div className="card form-card border-color text-color custom-bg" style={{ width: "50rem" }}>
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveUser}>
              <div>
                <button
                  className="btn btn-link"
                  type="button"
                  style={{ color: "purple" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#professionalDetails"
                  aria-expanded="true"
                  aria-controls="professionalDetails"
                >
                  <Button variant="contained" className="mt-2" startIcon={<IoIosArrowDropdownCircle />}>
                    Professional Details
                  </Button>
                </button>
                <div id="professionalDetails" className="collapse show">
                  <div className="row">
                    
                    <div className="col-md-6 mb-3 text-color">
                      <b><label className="form-label">Company Email Id</label></b>
                      <input type="email" className="form-control" id="emailId" name="emailId" onChange={handleUserInput} value={user.emailId} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label"><b>Password</b></label>
                      <input type="password" className="form-control" id="password" name="password" onChange={handleUserInput} value={user.password} />
                    </div>
                    
                    {user.role !== "employee" && (
                      <div className="col-md-6 mb-3 text-color">
                        <label htmlFor="departmentId" className="form-label"><b>Department</b></label>
                        <select onChange={handleUserInput} className="form-control" name="departmentId">
                          <option value="">Select Department</option>
                          {departments.map((d) => (
                            <option value={d.id} key={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="contact" className="form-label"><b>Contact No</b></label>
                      <input type="number" className="form-control" id="contact" name="contact" onChange={handleUserInput} value={user.contact} />
                    </div>
                   
                    <div className="col-md-6 mb-3">
                      <label htmlFor="experience" className="form-label"><b>Experience</b></label>
                      <input type="text" className="form-control" id="experience" name="experience" onChange={handleUserInput} value={user.experience} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="officeaddress" className="form-label"><b>Office Address</b></label>
                      <input type="text" className="form-control" id="officeaddress" name="officeaddress" onChange={handleUserInput} value={user.officeaddress} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="emphistory" className="form-label"><b>Employment History</b></label>
                      <input type="text" className="form-control" id="emphistory" name="emphistory" onChange={handleUserInput} value={user.emphistory} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="doj" className="form-label"><b>Date of Joining</b></label>
                      <input type="date" className="form-control" id="doj" name="doj" onChange={handleUserInput} value={user.doj} />
                    </div>
                   
                    <div className="col-md-6 mb-3">
                      <label htmlFor="hrname" className="form-label"><b>HR Name</b></label>
                      <input type="text" className="form-control" id="hrname" name="hrname" onChange={handleUserInput} value={user.hrname} />
                    </div>
                  </div>
                 
                </div>
              </div>
         
              <div className="col-12">
              <div>
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

                <div id="personalDetails" className="collapse">
                  <div className="row">
                  <div className="col-md-6 mb-3 text-color">
                      <label htmlFor="firstName" className="form-label"><b>First Name</b></label>
                      <input type="text" className="form-control" id="firstName" name="firstName" onChange={handleUserInput} value={user.firstName} />
                    </div>
                    <div className="col-md-6 mb-3 text-color">
                      <label htmlFor="lastName" className="form-label"><b>Last Name</b></label>
                      <input type="text" className="form-control" id="lastName" name="lastName" onChange={handleUserInput} value={user.lastName} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="dob" className="form-label"><b>Date of Birth</b></label>
                      <input type="date" className="form-control" id="dob" name="dob" onChange={handleUserInput} value={user.dob} />
                    </div>
                    <div className="col-md-6 mb-3 text-color">
                      <label htmlFor="street" className="form-label"><b>Temporary Address</b></label>
                      <input type="text" className="form-control" id="street" name="street" onChange={handleUserInput} value={user.street} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="age" className="form-label"><b>Age</b></label>
                      <input type="number" className="form-control" id="age" name="age" onChange={handleUserInput} value={user.age} />
                    </div>
                    <div className="col-md-6 mb-3 text-color">
                      <label htmlFor="gender" className="form-label"><b>User Gender</b></label>
                      <select onChange={handleUserInput} className="form-control" name="gender">
                        <option value="0">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3 text-color">
                      <label htmlFor="city" className="form-label"><b>Permanent Address</b></label>
                      <input type="text" className="form-control" id="city" name="city" onChange={handleUserInput} value={user.city} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="pincode" className="form-label"><b>Pincode</b></label>
                      <input type="text" className="form-control" id="pincode" name="pincode" onChange={handleUserInput} value={user.pincode} />
                    </div>
                   
                    <div className="col-md-6 mb-3">
                      <label htmlFor="photo" className="form-label"><b>Upload Photo</b></label>
                      <input type="file" className="form-control" id="photo" name="photo" onChange={(e) => setSelectedPhoto(e.target.files[0])} />
                    </div>
                  </div>
                </div>
                
              </div>
              <button
                  className="btn btn-link"
                  type="button"
                  style={{ color: "purple" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#projectDetails"
                  aria-expanded="true"
                  aria-controls="projectDetails"
                >
                  <Button variant="contained" className="mt-2" startIcon={<IoIosArrowDropdownCircle />}>
                    Project Details
                  </Button>
                </button>
                <div id="projectDetails" className="collapse show">
                  <div className="row">
                  <div className="col-md-6 mb-3 text-color">
                      <b><label className="form-label">Project Code</label></b>
                      <input type="number" className="form-control" id="projcode" name="projcode" onChange={handleUserInput} value={user.projcode} />
                    </div>
                    <div className="col-md-6 mb-3 text-color">
                      <b><label className="form-label">Reporting Manager</label></b>
                      <input type="text" className="form-control" id="repmanager" name="repmanager" onChange={handleUserInput} value={user.repmanager} />
                    </div>
                    <div className="col-md-6 mb-3 text-color">
                      <b><label className="form-label">Employee Email</label></b>
                      <input type="email" className="form-control" id="empemail" name="empemail" onChange={handleUserInput} value={user.empemail} />
                    </div>

                    <div className="col-md-6 mb-3 text-color">
                      <b><label className="form-label">Start Date</label></b>
                      <input type="text" className="form-control" id="startdate" name="startdate" onChange={handleUserInput} value={user.startdate} />
                    </div>

                    <div className="col-md-6 mb-3 text-color">
                      <b><label className="form-label">End Date</label></b>
                      <input type="text" className="form-control" id="enddate" name="enddate" onChange={handleUserInput} value={user.enddate} />
                    </div>
                    <div className="col-md-6 mb-3 text-color">
                      <b><label className="form-label">Project Name</label></b>
                      <input type="text" className="form-control" id="projname" name="projname" onChange={handleUserInput} value={user.projname} />
                    </div>
                    
                   {user.role !== "employee" && (
                      <div className="col-md-6 mb-3 text-color">
                        <label htmlFor="departmentId" className="form-label"><b>Department</b></label>
                        <select onChange={handleUserInput} className="form-control" name="departmentId">
                          <option value="">Select Department</option>
                          {departments.map((d) => (
                            <option value={d.id} key={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                   {/* <div className="col-md-6 mb-3">
                      <label htmlFor="contact" className="form-label"><b>Contact No</b></label>
                      <input type="number" className="form-control" id="contact" name="contact" onChange={handleUserInput} value={user.contact} />
                    </div>
                   
                    <div className="col-md-6 mb-3">
                      <label htmlFor="experience" className="form-label"><b>Experience</b></label>
                      <input type="text" className="form-control" id="experience" name="experience" onChange={handleUserInput} value={user.experience} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="officeaddress" className="form-label"><b>Office Address</b></label>
                      <input type="text" className="form-control" id="officeaddress" name="officeaddress" onChange={handleUserInput} value={user.officeaddress} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="emphistory" className="form-label"><b>Employment History</b></label>
                      <input type="text" className="form-control" id="emphistory" name="emphistory" onChange={handleUserInput} value={user.emphistory} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="doj" className="form-label"><b>Date of Joining</b></label>
                      <input type="date" className="form-control" id="doj" name="doj" onChange={handleUserInput} value={user.doj} />
                    </div>
                   
                    <div className="col-md-6 mb-3">
                      <label htmlFor="hrname" className="form-label"><b>HR Name</b></label>
                      <input type="text" className="form-control" id="hrname" name="hrname" onChange={handleUserInput} value={user.hrname} />
                    </div> */}
                  </div> 
                 
                </div>
                <button type="submit" className="btn btn-primary"><b>Save</b></button>

              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default UserRegister;
