import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ky from "ky";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/actionCreators";
import classNames from "classnames";

type UserLoginForm = {
  email: string;
  password: string;
};

type ResponseLogin = {
  token: string;
  message: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const formClassEmail: string = classNames("form-control", {
    "is-invalid": errors.email,
  });
  const formClassPassword: string = classNames("form-control", {
    "is-invalid": errors.password,
  });

  const onSubmitLogin: any = async (data: UserLoginForm) => {
    try {
      const response: ResponseLogin = await ky
        .post("http://localhost:5000/api/users/login", {
          json: { email: data.email, password: data.password },
        })
        .json();
      navigate("/mypage");
      toast.success(response.message);
      dispatch(loginUser(true, response.token));
    } catch (error: any) {
      if (error.name === "HTTPError") {
        const errorJson = await error.response.json();
        toast.error(errorJson.message);
      }
    }
  };

  return (
    <Form
      className="d-flex flex-column mt-3"
      onSubmit={handleSubmit(onSubmitLogin)}
    >
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
  );
};

export default LoginForm;