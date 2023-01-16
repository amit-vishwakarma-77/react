import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function IsUserLoggedIn() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log(localStorage.getItem("userLoggedIn"));
    if (!localStorage.getItem("userLoggedIn")) {
      // console.log(localStorage.getItem("userLoggedIn"));
      navigate("/login");
    } else if (
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
      navigate("/dashboard");
    }
  }, [navigate, location.pathname]);

  return localStorage.getItem("userLoggedIn");
}
