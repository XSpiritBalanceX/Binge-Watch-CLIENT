import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "@/styles/Navbar.scss";
import SignInOut from "./SignInOut";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import * as userSelectors from "@/store/selectors";

const logo = require("../images/logo.png");

const NavBar = () => {
  const isLogin = useTypedSelector(userSelectors.isLoginSelect);

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
          <NavLink to={"/catalog/сериалы"} className="nav-link">
            Каталог
          </NavLink>
          {isLogin && (
            <NavLink to={"/mypage"} className="nav-link">
              <i className="bi bi-person-circle"></i>
            </NavLink>
          )}
          <SignInOut />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
