import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

const NavbarMenu = () => {
  const { logoutUser } = useContext(AuthContext);

  const history = useHistory();
  const logout = () => {
    logoutUser();
    history.push("/login");
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
       
        Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Department
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/employee"
            as={Link}
          >
            Employee
          </Nav.Link>
        </Nav>

        <Nav>
          
          <Button variant="secondary" className="font-weight-bolder text-white" onClick={logout}>
            
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
