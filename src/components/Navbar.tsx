import React, { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "@/styles/Navbar.scss";
import SignInOut from "./SignInOut";

const logo = require("@/images/logo.png");

const NavBar: FC = () => {
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
          <SignInOut />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
