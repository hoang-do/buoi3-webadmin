import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import Employee from "./views/Employee";
import PostContextProvider from "./contexts/DepartmentContext";
import EmployeeContextProvider from "./contexts/EmployeeContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <EmployeeContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/login"
                render={(props) => <Auth {...props} authRoute="login" />}
              />
              <Route
                exact
                path="/register"
                render={(props) => <Auth {...props} authRoute="register" />}
              />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/employee" component={Employee} />
            </Switch>
          </Router>
        </EmployeeContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
