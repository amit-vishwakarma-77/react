import Grid from "@mui/material/Grid";
import { Routes, Route } from "react-router-dom";
import { IsUserLoggedIn } from "../axios/auth/validateUserSession";
import LoginForm from "./loginForm";
import SignUpForm from "./signUpForm";

function UserForm() {
  IsUserLoggedIn();
  return (
    <Grid container spacing={1}>
      <Grid item md={4}></Grid>
      <Grid item xs={12} md={4}>
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Routes>
      </Grid>
      <Grid item md={4}></Grid>
    </Grid>
  );
}

export default UserForm;
