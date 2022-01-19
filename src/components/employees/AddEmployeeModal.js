import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const AddEmployeeModal = () => {
  const {
    getEmployees,
    showAddEmployeeModal,
    setShowAddEmployeeModal,
    addEmployee,
  } = useContext(EmployeeContext);

  //State
  const [newEmployee, setNewEmployee] = useState({
    nameEmployee: "",
    photo: "",
    jobTitle: "",
    cellPhone: "(+84)",
    email: "",
    managerId: "",
  });

  const { nameEmployee, photo, jobTitle, cellPhone, email, managerId } =
    newEmployee;

  const onChangeNewEmployeeForm = (event) => {
    setNewEmployee({
      ...newEmployee,
      [event.target.name]: event.target.value,
    });
  };
  const onChangeNewEmployeePhoto = (event) => {
    setNewEmployee({
      ...newEmployee,
      photo: event.target.files[0],
    });
  };

  const closeDialog = () => {
    resetAddEmployeeData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nameEmployee", nameEmployee);
    formData.append("photo", photo);
    formData.append("jobTitle", jobTitle);
    formData.append("cellPhone", cellPhone);
    formData.append("email", email);
    formData.append("managerId", managerId);

    await addEmployee(formData);
    getEmployees();
    resetAddEmployeeData();
  };

  const resetAddEmployeeData = () => {
    setNewEmployee({
      nameEmployee: "",
      photo: "",
      jobTitle: "",
      cellPhone: "(+84)",
      email: "",
      managerId: "",
    });
    setShowAddEmployeeModal(false);
  };

  return (
    <Modal show={showAddEmployeeModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Create Employee</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name Employee"
              name="nameEmployee"
              required
              value={nameEmployee}
              onChange={onChangeNewEmployeeForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="file"
              placeholder="Photo"
              required
              onChange={onChangeNewEmployeePhoto}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Job Title"
              name="jobTitle"
              required
              value={jobTitle}
              onChange={onChangeNewEmployeeForm}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              maxLength={15}
              type="text"
              placeholder="Cell Phone"
              name="cellPhone"
              required
              value={cellPhone}
              onChange={onChangeNewEmployeeForm}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={onChangeNewEmployeeForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="ID Department"
              name="managerId"
              required
              value={managerId}
              onChange={onChangeNewEmployeeForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default AddEmployeeModal;
