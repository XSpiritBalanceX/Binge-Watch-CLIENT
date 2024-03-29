import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import * as userSelectors from "@/store/selectors";
import "@/styles/Navbar.scss";

const SignInOut = () => {
  const isLogin = useTypedSelector(userSelectors.isLoginSelect);
  const navigate = useNavigate();
  const goToLink = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    if (isLogin) {
      sessionStorage.removeItem("token");
      window.open("http://localhost:5000/api/users/logout", "_self");
    } else {
      navigate("/login");
    }
  };
  return (
    <NavLink
      to={"/login"}
      className="nav-link"
      onClick={goToLink}
      data-testid="linkSign"
    >
      {isLogin ? (
        <i className="bi bi-box-arrow-in-left"></i>
      ) : (
        <i className="bi bi-box-arrow-in-right"></i>
      )}
    </NavLink>
  );
};

export default SignInOut;
