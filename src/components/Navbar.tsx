import React, { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/Navbar.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";
const logo = require("../images/logo.png");

const NavBar: FC = () => {
  const { isLogin } = useTypedSelector((store) => store);
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
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to={"/"}>
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <NavLink to={"/"} className="nav-link">
            Главная
          </NavLink>
          <NavLink to={"/catalog"} className="nav-link">
            Каталог
          </NavLink>
          <NavLink to={"/mypage"} className="nav-link">
            <i className="bi bi-person-circle"></i>
          </NavLink>
          <NavLink to={"/login"} className="nav-link" onClick={goToLink}>
            {isLogin ? (
              <i className="bi bi-box-arrow-in-left"></i>
            ) : (
              <i className="bi bi-box-arrow-in-right"></i>
            )}
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
