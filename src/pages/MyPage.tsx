import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getUserInfo } from "@/store/actionCreators";
import { Spinner } from "react-bootstrap";
import "@/styles/MyPage.scss";
import { useNavigate } from "react-router-dom";

const avatar = require("@/images/cat.jpg");

const MyPage: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { userName } = useTypedSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (response.status !== 200) {
        navigate("/");
      } else {
        const data = await response.json();
        dispatch(getUserInfo(data.message.username));
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return (
    <React.Fragment>
      <ToastContainer position="top-center" autoClose={5000} theme="colored" />
      {isLoading ? (
        <Spinner animation="border" variant="light" className="spiner" />
      ) : (
        <div className="mainContainerMyPage">
          <img src={avatar} alt="avatarUser" className="avatarUser" />
          {userName}
        </div>
      )}
    </React.Fragment>
  );
};

export default MyPage;
