import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { DepartmentContext } from "../../contexts/DepartmentContext";

const UpdateDepartmentModal = () => {
  //Context
  const {
    departmentState: { department },
    getDepartments,
    showUpdateDepartmentModal,
    setShowUpdateDepartmentModal,
    updateDepartment,
  } = useContext(DepartmentContext);

  //State
  const [updatedDepartment, setUpdatedDepartment] = useState(department)

  useEffect(() => setUpdatedDepartment(department), [department])
  const { nameDepartment, officePhone } = updatedDepartment;

  const onChangeUpdatedDepartmentForm = (event) => {
    setUpdatedDepartment({
      ...updatedDepartment,
      [event.target.name]: event.target.value,
    });
  };

  const closeDialog = () => {
    setUpdatedDepartment(department)
    setShowUpdateDepartmentModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDepartment(updatedDepartment)
    getDepartments()
    setShowUpdateDepartmentModal(false);
  };


  return (
    <Modal show={showUpdateDepartmentModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Create Department</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name Department"
              name="nameDepartment"
              required
              aria-describedby="title-help"
              value={nameDepartment}
              onChange={onChangeUpdatedDepartmentForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="officePhone"
              name="officePhone"
              value={officePhone}
              onChange={onChangeUpdatedDepartmentForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default UpdateDepartmentModal;
