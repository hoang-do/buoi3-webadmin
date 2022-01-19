import NavbarMenu from "../components/layout/NavbarMenu";
import { useContext, useEffect } from "react";
import Button from "react-bootstrap/button";
import { DepartmentContext } from "../contexts/DepartmentContext";
import AddDepartmentModal from "../components/departments/AddDepartmentModal";
import UpdateDepartmentModal from "../components/departments/UpdateDepartmentModal"


function Dashboard() {
  const {
    getDepartments,
    departmentState: { departments, department},
    setShowAddDepartmentModal,
    deleteDepartment,
    findDepartment,
    setShowUpdateDepartmentModal,
  } = useContext(DepartmentContext);

  const chooseDepartment = departmentId => {
    findDepartment(departmentId);
    setShowUpdateDepartmentModal(true);
  };

  useEffect(() => getDepartments(), []);

  return (
    <>
      <NavbarMenu />
      <div className="container">
        <div className="py-4">
          <h1>Dashboard</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name Department</th>
                <th scope="col">Office Phone</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.id}>
                  <th>{department.id}</th>
                  <th>{department.nameDepartment}</th>
                  <th>{department.officePhone}</th>
                  <th>
                    <Button onClick={() => chooseDepartment(department.id)}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteDepartment(department.id)}>
                      Delete
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Open Add Department Modal */}
          <Button
            className="btn-add"
            onClick={() => setShowAddDepartmentModal(true)}
          >
            Create
          </Button>
        </div>
      </div>
      <AddDepartmentModal />
      {department && <UpdateDepartmentModal />}
    </>
  );
}

export default Dashboard;
