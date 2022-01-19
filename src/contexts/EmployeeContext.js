import { createContext, useReducer, useState } from "react";
import { employeeReducer } from "../reducers/employeeReducer";
import {
  apiUrl,
  LOCAL_STORAGE_TOKEN_NAME,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  FIND_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "./constants";
import axios from "axios";

export const EmployeeContext = createContext();
const EmployeeContextProvider = ({ children }) => {
  // State
  const [employeeState, dispatch] = useReducer(employeeReducer, {
    employeeEdit: null,
    employees: [],
  });

  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
  // Get
  const getEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}/employee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data) {
        dispatch({
          type: "GET_EMPLOYEE",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Add department
  const addEmployee = async (newEmployee) => {
    try {
      const response = await axios.post(`${apiUrl}/employee`, newEmployee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data.dataSave) {
        dispatch({
          type: ADD_EMPLOYEE,
          payload: response.data.dataSave,
        });
        return response.data.dataSave
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };
  //Delete
  const deleteEmployee = async (id) => {
    if (window.confirm("Do you really want to delete ?")) {
      try {
        const response = await axios.delete(`${apiUrl}/employee/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
          },
        });
        if (response.data.statusCode === 200)
          dispatch({ type: DELETE_EMPLOYEE, payload: id });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Find 
  const findEmployee = (employeeID) => {
    const employeeEdit = employeeState.employees.find(
      (item) => item.id === employeeID
    );
    dispatch({
      type: FIND_EMPLOYEE,
      payload: employeeEdit,
    });
  };
  // Update
  const updateEmployee = async (updatedEmployee, updatedEmployeeId) => {
    console.log(updatedEmployee);
    try {
      const response = await axios.put(
        `${apiUrl}/employee/${updatedEmployeeId}`,
        updatedEmployee,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        dispatch({
          type: UPDATE_EMPLOYEE,
          payload: response.data.dataChange,
        });
        
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
      
  };

  const employeeData = {
    employeeState,
    getEmployees,
    showAddEmployeeModal,
    setShowAddEmployeeModal,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    findEmployee,
    showUpdateEmployeeModal,
    setShowUpdateEmployeeModal
  };
  return (
    <EmployeeContext.Provider value={employeeData}>
      {children}
    </EmployeeContext.Provider>
  );
};
export default EmployeeContextProvider;
