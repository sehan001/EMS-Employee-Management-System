import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({});

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    // Set role based on email
    let role = loginRequest.role || 'employee'; // Default to employee if role not set

    if (name === 'emailId') {
      if (value === 'admin@gmail.com') {
        role = 'admin';
      } else if (value === 'adm@gmail.com') {
        role = 'manager';
      } else {
        role = 'employee';
      }
    }

    setLoginRequest({ ...loginRequest, [name]: value, role });
  };

  const loginAction = (e) => {
    e.preventDefault();

    fetch("http://localhost:8081/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.success) {
            console.log("Got the success response");

            if (res.jwtToken !== null) {
              console.log("JWT TOKEN not null, positive response");
              if (res.user.role === "admin") {
                sessionStorage.setItem(
                  "active-admin",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("admin-jwtToken", res.jwtToken);
              } else if (res.user.role === "manager") {
                sessionStorage.setItem(
                  "active-manager",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("manager-jwtToken", res.jwtToken);
              } else if (res.user.role === "employee") {
                console.log("Storing employee jwt token in session storage");
                sessionStorage.setItem(
                  "active-employee",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("employee-jwtToken", res.jwtToken);
              }

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
                window.location.href = "/home";
              }, 1000); // Redirect after 1 second
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            console.log("Didn't get success response");
            toast.error("It seems server is down", {
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

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">User Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={loginAction}>
              <div className="mb-3 text-color">
                <label htmlFor="emailId" className="form-label">
                  <b>Email Id</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={loginRequest.emailId || ''}
                />
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="password" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={loginRequest.password || ''}
                  autoComplete="on"
                />
              </div>
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
              >
                Login
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;