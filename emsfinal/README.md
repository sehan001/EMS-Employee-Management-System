## Employee Management System
The Employee Management System is a comprehensive solution for managing employee records and payroll. It features two main modules: Admin and Employee.

# Features
# Admin Module
Register Employee: Admins can add new employees to the system.
Update Employee: Admins can update existing employee details.
Delete Employee: Admins can remove employees from the system.
Add Payslips: Admins can generate and upload payslips for employees, which employees can then download.
Employee Module
View Payslips: Employees can view and download their payslips.
Installation
Prerequisites
Java 11+
Node.js
MySQL or PostgreSQL
Git
Steps
Clone the repository:



Navigate to the backend directory:

bash
Copy code
cd employeemanagementsystem/backend
Configure the application:

Update src/main/resources/application.properties with your database credentials.
Example application.properties:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/employeemanagement
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
Build and run the Spring Boot application:

bash
Copy code
./mvnw spring-boot:run
Frontend Setup:

Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install the required dependencies:

bash
Copy code
npm install
Start the React application:

bash
Copy code
npm start
Usage
Admin Module
Admin Login:

Access the admin portal via /admin.
Use your admin credentials to log in.
Register Employee:

## java
Copy code
// Spring Boot Controller to register a new employee
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/register")
    public ResponseEntity<Employee> registerEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.save(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }
}
Update Employee:

java
Copy code
// Spring Boot Controller to update an existing employee
@PutMapping("/update/{id}")
public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
    Employee updatedEmployee = employeeService.update(id, employee);
    return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
}
Delete Employee:

java
Copy code
// Spring Boot Controller to delete an employee
@DeleteMapping("/delete/{id}")
public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
    employeeService.delete(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
}
Add Payslip:

java
Copy code
// Spring Boot Controller to add a payslip to an employee
@PostMapping("/payslip/{id}")
public ResponseEntity<Payslip> addPayslip(@PathVariable Long id, @RequestBody Payslip payslip) {
    Payslip newPayslip = employeeService.addPayslip(id, payslip);
    return new ResponseEntity<>(newPayslip, HttpStatus.CREATED);
}
Employee Module
View Payslips:
java
Copy code
// Spring Boot Controller to view payslips
@GetMapping("/payslips/{id}")
public ResponseEntity<List<Payslip>> viewPayslips(@PathVariable Long id) {
    List<Payslip> payslips = employeeService.getPayslips(id);
    return new ResponseEntity<>(payslips, HttpStatus.OK);
}
React Frontend
Login Page:

jsx
Copy code
// React component for login page
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            setAuth(response.data);
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
Employee Dashboard:

jsx
Copy code
// React component for employee dashboard
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
    const [payslips, setPayslips] = useState([]);

    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                const response = await axios.get('/api/employee/payslips');
                setPayslips(response.data);
            } catch (error) {
                console.error('Error fetching payslips', error);
            }
        };

        fetchPayslips();
    }, []);

    return (
        <div>
            <h1>Employee Dashboard</h1>
            <ul>
                {payslips.map((payslip) => (
                    <li key={payslip.id}>
                        <a href={payslip.url}>Download Payslip for {payslip.month}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeDashboard;
Contributing
We welcome contributions to improve this project. Please follow these steps:

Fork the repository.
Create a new branch with a descriptive name:
bash
Copy code
git checkout -b feature/your-feature-name
Make your changes and commit them:
bash
Copy code
git commit -m "Description of your changes"
Push your changes to your forked repository:
bash
Copy code
git push origin feature/your-feature-name
Open a pull request to the main repository.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact
For any questions or suggestions, please open an issue on GitHub or contact us at 2000030374cse@gmail.com
images
![image](https://github.com/gynodevir/emsfinal/assets/96582600/4d9fafc1-5ff0-4c3f-98ff-d10c91f5a0f1)
![image](https://github.com/gynodevir/emsfinal/assets/96582600/d6bd2e95-e229-42e1-aa02-698b2c5c35be)
![image](https://github.com/gynodevir/emsfinal/assets/96582600/b76ee360-6bd6-4e16-b94c-82d7312bb5e8)
![image](https://github.com/gynodevir/emsfinal/assets/96582600/cad4b3ef-3c09-4e21-a596-4d786daa9fc7)
![image](https://github.com/gynodevir/emsfinal/assets/96582600/ebd0adbf-ad69-46c5-a64a-dba051fbd6a5)



