import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  FIND_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../contexts/constants";

export const employeeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_EMPLOYEE":
      return {
        ...state,
        employees: payload,
      };

    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, payload],
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((item) => item.id !== payload),
      };

      case FIND_EMPLOYEE:
      return {
        ...state,
        employeeEdit: payload,
      };

    case UPDATE_EMPLOYEE:
      const newEmployees = state.employees.map((item) =>
        item.id === payload.id ? payload : item
      );
      return {
        ...state,
        employees: newEmployees,
      };
    default:
      return state;
  }
};
