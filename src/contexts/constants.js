export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://nws-management.herokuapp.com"
    : "somedeployedURL";

export const LOCAL_STORAGE_TOKEN_NAME = "user-info";

export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT'
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT'
export const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT'
export const FIND_DEPARTMENT = 'FIND_DEPARTMENT'

export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const FIND_EMPLOYEE = "FIND_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";