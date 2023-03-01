import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ky from "ky";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Auth.scss";

type UserLoginForm = {
  email: string;
  password: string;
};

interface ResponseLogin {
  token: string;
  message: string;
}

const LoginPage: FC = () => {
  const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().required("Email обязателен").email("Неверный email"),
    password: Yup.string()
      .required("Пароль обязателен")
      .min(6, "Пароль должен состьять из 6 символов")
      .max(20, "Пароль не может иметь больше 20 сиволов"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginForm>({
    resolver: yupResolver(validationSchemaLogin),
  });
  const onSubmitRegistration: any = async (data: UserLoginForm) => {
    try {
      const response: ResponseLogin = await ky
        .post("http://localhost:5000/api/users/login", {
          json: { email: data.email, password: data.password },
        })
        .json();
      toast.success(response.message);
      sessionStorage.setItem("token", response.token);
    } catch (error: any) {
      if (error.name === "HTTPError") {
        const errorJson = await error.response.json();
        toast.error(errorJson.message);
      }
    }
  };
  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} theme="colored" />
      <Container className="d-flex justify-content-center align-items-center ">
        <Card className="p-5 m-5 FormLogin">
          <h2 className="m-auto">Авторизация</h2>
          <Form
            className="d-flex flex-column mt-3"
            onSubmit={handleSubmit(onSubmitRegistration)}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
            <div className=" d-flex  justify-content-between mt-3 pl-3 pr-3">
              <div>
                Нет аккаунта?
                <NavLink to="/registration">Зарегистрироваться</NavLink>
              </div>
              <Button variant="outline-light" type="submit">
                Войти
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
