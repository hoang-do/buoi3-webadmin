import NavbarMenu from "../components/layout/NavbarMenu";
import { useContext, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import Button from "react-bootstrap/Button";
import { apiUrl } from "../contexts/constants";
import AddEmployeeModal from "../components/employees/AddEmployeeModal";
import UpdateEmployeeModal from "../components/employees/UpdateEmployeeModal"

function Employee() {
  const {
    getEmployees,
    employeeState: { employees, employeeEdit },
    deleteEmployee,
    setShowAddEmployeeModal,
    findEmployee,
    setShowUpdateEmployeeModal,
  } = useContext(EmployeeContext);

  useEffect(() => getEmployees(), []);

  const chooseEmployee = (employeeID) => {
    findEmployee(employeeID);
    setShowUpdateEmployeeModal(true);
  };
  return (
    <>
      <NavbarMenu />
      <div className="container">
        <div className="py-4">
          <h1>Employee</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name Employee</th>
                <th scope="col">Photo</th>
                <th scope="col">Job Title</th>
                <th scope="col">Cell Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Manager</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <th>{employee.id}</th>
                  <th>{employee.nameEmployee}</th>
                  <td>
                    <img
                      src={`${apiUrl}/employee/${employee.photo}`}
                      alt={employee.photo}
                      with="150"
                      height="150"
                    />
                  </td>
                  <th>{employee.jobTitle}</th>
                  <th>{employee.cellPhone}</th>
                  <th>{employee.email}</th>
                  <th>{employee.manager.nameDepartment}</th>
                  <th>
                    <Button onClick={() => chooseEmployee(employee.id)}>Edit</Button>
                    <Button onClick={() => deleteEmployee(employee.id)}>Delete</Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Open Add Employee Modal */}
          <Button
            className="btn-add"
            onClick={() => setShowAddEmployeeModal(true)}
          >
            Create
          </Button>
        </div>
      </div>
      <AddEmployeeModal />
      {employeeEdit !== null && <UpdateEmployeeModal />}
    </>
  );
}
export default Employee;
