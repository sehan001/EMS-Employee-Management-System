import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa";

const ViewMySalary = () => {
  const [salaries, setSalaries] = useState([]);

  const employee = JSON.parse(sessionStorage.getItem("active-employee"));

  const retrieveEmployeeSalary = async () => {
    const response = await axios.get(
      "http://localhost:8082/salary/user/fetch?userId=" + employee.id
    );
    console.log(response.data);
    return response.data.salary;
  };

  useEffect(() => {
    const getAllSalary = async () => {
      const allSalary = await retrieveEmployeeSalary();
      if (allSalary) {
        setSalaries(allSalary);
      }
    };

    getAllSalary();
  }, []);

  const downloadPDF = (month) => {
    const filteredSalaries = salaries.filter((salary) => salary.month === month);
    const input = document.getElementById("salary-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`salary-details-${month}.pdf`);
    });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color"
        style={{
          height: "auto",
          width: "auto",
        }}
      >
        <div className="card-header custom-bg-text bg-color d-flex justify-content-between align-items-center">
          <h2 className="text-center flex-grow-1">Salary Detail</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive" id="salary-table">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Salary</th>
                  <th scope="col">Month</th>
                  <th scope="col">Payment Mode</th>
                  <th scope="col">Pay Cycle</th>
                  <th scope="col">Bank</th>
                  <th scope="col">Account No</th>
                  <th scope="col">Ifsc Code</th>
                  <th scope="col">Pan Card</th>
                  <th scope="col">Aadhar Card</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((salary, index) => (
                  <tr key={index}>
                    <td>
                      <b>{salary.salary}</b>
                    </td>
                    <td>
                      <b>{salary.month}</b>
                    </td>
                    <td>
                      <b>{salary.paymentMode}</b>
                    </td>
                    <td>
                      <b>{salary.payCycle}</b>
                    </td>
                    <td>
                      <b>{salary.bank}</b>
                    </td>
                    <td>
                      <b>{salary.bankAccount}</b>
                    </td>
                    <td>
                      <b>{salary.bankIfsc}</b>
                    </td>
                    <td>
                      <b>{salary.pancard}</b>
                    </td>
                    <td>
                      <b>{salary.aadharcard}</b>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => downloadPDF(salary.month)}
                      >
                        <FaDownload />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMySalary;
