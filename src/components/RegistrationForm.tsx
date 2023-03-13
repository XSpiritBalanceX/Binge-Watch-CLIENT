import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ky from "ky";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames";
import { fetchWrapper } from "./fetchWrapper";

type UserRegistrationForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface ResponseRegistration {
  message: string;
}

const RegistrationForm = () => {
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

  const formClassUserName: string = classNames("form-control", {
    "is-invalid": errors.username,
  });
  const formClassEmail: string = classNames("form-control", {
    "is-invalid": errors.email,
  });
  const formClassPassword: string = classNames("form-control", {
    "is-invalid": errors.password,
  });
  const formClassConfirmPassword: string = classNames("form-control", {
    "is-invalid": errors.confirmPassword,
  });

  const onSubmitRegistration: any = async (data: UserRegistrationForm) => {
    let dataResponse: ResponseRegistration =
      (await fetchWrapper.registrationUser({
        username: data.username,
        email: data.email,
        password: data.password,
      })) as ResponseRegistration;
    if (dataResponse) {
      navigate("/login");
      toast.success(dataResponse.message);
    }
    /* try {
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
    } */
  };

  return (
    <Form
      className="d-flex flex-column mt-3"
      onSubmit={handleSubmit(onSubmitRegistration)}
    >
      <Form.Label>Имя пользователя</Form.Label>
      <Form.Control
        type="text"
        {...register("username")}
        className={formClassUserName}
      />
      <div className="invalid-feedback">{errors.username?.message}</div>
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        {...register("email")}
        className={formClassEmail}
      />
      <div className="invalid-feedback">{errors.email?.message}</div>
      <Form.Label>Пароль</Form.Label>
      <Form.Control
        type="password"
        {...register("password")}
        className={formClassPassword}
      />
      <div className="invalid-feedback">{errors.password?.message}</div>
      <Form.Label>Повторите пароль</Form.Label>
      <Form.Control
        type="password"
        {...register("confirmPassword")}
        className={formClassConfirmPassword}
      />
      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
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
  );
};

export default RegistrationForm;
