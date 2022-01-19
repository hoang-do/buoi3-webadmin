import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { DepartmentContext } from "../../contexts/DepartmentContext";

const AddDepartmentModal = () => {
  //Context
  const { getDepartments, showAddDepartmentModal, setShowAddDepartmentModal, addDepartment } =
    useContext(DepartmentContext);

  //State
  const [newDepartment, setNewDepartment] = useState({
    nameDepartment: "",
    officePhone: "(+84)",
  });

  const { nameDepartment, officePhone } = newDepartment;

  const onChangeNewDepartmentForm = (event) => {
    setNewDepartment({
      ...newDepartment,
      [event.target.name]: event.target.value,
    });
  };

  const closeDialog = () => {
    resetAddDepartmentData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDepartment(newDepartment);
    getDepartments()
    resetAddDepartmentData();
  };

  const resetAddDepartmentData = () => {
    setNewDepartment({ nameDepartment: "", officePhone: "(+84)" });
    setShowAddDepartmentModal(false);
  };

  return (
    <Modal show={showAddDepartmentModal} onHide={closeDialog}>
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
              onChange={onChangeNewDepartmentForm}
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
              onChange={onChangeNewDepartmentForm}
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
export default AddDepartmentModal;
