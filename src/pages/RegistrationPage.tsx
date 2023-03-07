import React, { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ky from "ky";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/Auth.scss";

type UserRegistrationForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ResponseRegistration = {
  message: string;
};

const RegistrationPage: FC = () => {
  const navigate = useNavigate();
  const validationSchemaRegistration = Yup.object().shape({
    username: Yup.string().required("Имя пользователя обезательно"),
    email: Yup.string().required("Email обязателен").email("Неверный email"),
    password: Yup.string()
      .required("Пароль обязателен")
      .min(6, "Пароль должен состьять из 6 символов")
      .max(20, "Пароль не может иметь больше 20 сиволов"),
    confirmPassword: Yup.string()
      .required("Повторите пароль")
      .oneOf([Yup.ref("password")], "Пароли не совпадают"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationForm>({
    resolver: yupResolver(validationSchemaRegistration),
  });

  const onSubmitRegistration: any = async (data: UserRegistrationForm) => {
    try {
      const response: ResponseRegistration = await ky
        .post("http://localhost:5000/api/users/registration", {
          json: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        })
        .json();

      navigate("/login");
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
        <Card className="p-5 m-5 FormRegistration">
          <h2 className="m-auto">Регистрация</h2>
          <Form
            className="d-flex flex-column mt-3"
            onSubmit={handleSubmit(onSubmitRegistration)}
          >
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
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
            <Form.Label>Повторите пароль</Form.Label>
            <Form.Control
              type="password"
              {...register("confirmPassword")}
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
            <div className=" d-flex  justify-content-between mt-3 pl-3 pr-3">
              <div>
                Есть аккаунт?
                <NavLink to="/login">Авторизоваться</NavLink>
              </div>
              <Button variant="outline-light" type="submit">
                Зарегистрироваться
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default RegistrationPage;
