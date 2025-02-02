import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddEmployeeSalary = () => {
  const navigate = useNavigate();

  const [salary, setSalary] = useState({
    userId: "",
    lastName: "",
    payCycle: "",
    paymentMode: "",
    bank: "",
    bankAccount: "",
    bankIfsc: "",
    salary: "",
    fromDate: "",
    toDate: "",
    month:"",
    pancard:"",
    aadharcard:"",
  });

  const handleUserInput = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
  };

  const saveEmployeeSalary = (e) => {
    fetch("http://localhost:8082/salary/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salary),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.success) {
            console.log("Got the success response");

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
            }, 1000); // Redirect after 3 seconds
          } else {
            console.log("Didn't got success response");
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
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Finance</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveEmployeeSalary}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b>Employee Code</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="userId"
                  name="userId"
                  onChange={handleUserInput}
                  value={salary.userId}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="bank" className="form-label">
                  <b>Bank Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bank"
                  name="bank"
                  onChange={handleUserInput}
                  value={salary.bank}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label className="form-label">Bank Account Number</label>
                </b>
                <input
                  type="number"
                  className="form-control"
                  id="bankAccount"
                  name="bankAccount"
                  onChange={handleUserInput}
                  value={salary.bankAccount}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label className="form-label">Bank Ifsc</label>
                </b>
                <input
                  type="text"
                  className="form-control"
                  id="bankIfsc"
                  name="bankIfsc"
                  onChange={handleUserInput}
                  value={salary.bankIfsc}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b>Salary</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  name="salary"
                  onChange={handleUserInput}
                  value={salary.salary}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="sex" className="form-label">
                  <b>CTC Breakup</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="payCycle"
                >
                  <option value="0">Select CTC Breakup</option>
                  <option value="Month">Month</option>

                </select>
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="paymentMode" className="form-label">
                  <b>Payment Mode</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="paymentMode"
                >
                  <option value="0">Select Payment Mode</option>
                  <option value="Bank Transfer">Online</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="month" className="form-label">
                  <b>Month</b>
                </label>
                <input
                  type="month"
                  className="form-control"
                  id="month"
                  name="month"
                  onChange={handleUserInput}
                  value={salary.month}
                />
              </div>


              
              <div className="col-md-6 mb-3">
                <label htmlFor="month" className="form-label">
                  <b>PAN Card</b>
                </label>
                <input
                  type="pan card"
                  className="form-control"
                  id="pancard"
                  name="pancard"
                  onChange={handleUserInput}
                  value={salary.pancard}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="month" className="form-label">
                  <b>Aadhar Card</b>
                </label>
                <input
                  type="aadharcard"
                  className="form-control"
                  id="aadharcard"
                  name="aadharcard"
                  onChange={handleUserInput}
                  value={salary.aadharcard}
                />
              </div>


              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Add Salary"
                />
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeSalary;
