import React from "react";
import { Container, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "@/styles/Auth.scss";
import RegistrationForm from "@/components/RegistrationForm";
import LoginForm from "@/components/LoginForm";

const RegistrationPage = () => {
  const location = useLocation();
  const isLoginForm = location.pathname === "/login";

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center ">
        <Card className="p-5 m-5 FormRegistration">
          <h2 className="m-auto" role="authRole">
            {isLoginForm ? "Авторизация" : "Регистрация"}
          </h2>
          {isLoginForm ? <LoginForm /> : <RegistrationForm />}
        </Card>
      </Container>
    </div>
  );
};

export default RegistrationPage;
