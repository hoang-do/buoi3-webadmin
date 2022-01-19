import {
  DELETE_DEPARTMENT,
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT,
  FIND_DEPARTMENT,
} from "../contexts/constants";

export const departmentReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_DEPARTMENT":
      return {
        ...state,
        departments: payload,
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, payload],
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department.id !== payload
        ),
      };
    case FIND_DEPARTMENT:
      return { ...state, department: payload };

    case UPDATE_DEPARTMENT:
      const newDepartments = state.departments.filter((department) =>
        department.id === payload.id ? payload : department
      );
      return {
        ...state,
        departments: newDepartments,
      };
    default:
      return state;
  }
};
