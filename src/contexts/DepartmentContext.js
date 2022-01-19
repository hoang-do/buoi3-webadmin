import { createContext, useReducer, useState } from "react";
import { departmentReducer } from "../reducers/departmentReducer";
import {
  apiUrl,
  LOCAL_STORAGE_TOKEN_NAME,
  DELETE_DEPARTMENT,
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT,
  FIND_DEPARTMENT,
} from "./constants";
import axios from "axios";

export const DepartmentContext = createContext();

const DepartmentContextProvider = ({ children }) => {
  //State
  const [departmentState, dispatch] = useReducer(departmentReducer, {
    department: null,
    departments: [],
  });

  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [showUpdateDepartmentModal, setShowUpdateDepartmentModal] =
    useState(false);

  //get
  const getDepartments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data) {
        dispatch({
          type: "GET_DEPARTMENT",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Find post when user is updating department
  const findDepartment = (departmentId) => {
    const department = departmentState.departments.find(
      (department) => department.id === departmentId
    );
    dispatch({ type: FIND_DEPARTMENT, payload: department });
  };

  // Add department
  const addDepartment = async (newDepartment) => {
    try {
      const response = await axios.post(`${apiUrl}/department`, newDepartment, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data.dataSave) {
        dispatch({ type: ADD_DEPARTMENT, payload: response.data.dataSave });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete
  const deleteDepartment = async (id) => {
    if (window.confirm("Do you really want to delete ?")) {
      try {
        const response = await axios.delete(`${apiUrl}/department/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
          },
        });
        if (response.data.statusCode === 200)
          dispatch({ type: DELETE_DEPARTMENT, payload: id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Update
  const updateDepartment = async (updateDepartment) => {
    try {
      const response = await axios.put(
        `${apiUrl}/department/${updateDepartment.id}`,
        updateDepartment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
          },
        }
      );
      if (response.data) {
        dispatch({
          type: UPDATE_DEPARTMENT,
          payload: response.data.dataChange,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postContextData = {
    departmentState,
    getDepartments,
    showAddDepartmentModal,
    setShowAddDepartmentModal,
    deleteDepartment,
    addDepartment,
    updateDepartment,
    findDepartment,
    showUpdateDepartmentModal,
    setShowUpdateDepartmentModal,
  };

  return (
    <DepartmentContext.Provider value={postContextData}>
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentContextProvider;
