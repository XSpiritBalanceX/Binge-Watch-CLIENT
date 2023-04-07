import React from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Spinner } from "react-bootstrap";
import "@/styles/MyPage.scss";
import * as userSelectors from "@/store/selectors";
import { useAuthFetch } from "@/hooks/useAuthFetch";

const avatar = require("../images/cat.jpg");

const MyPage = () => {
  const userName = useTypedSelector(userSelectors.userNameSelect);
  const { loading } = useAuthFetch(sessionStorage.getItem("token"));
  return (
    <React.Fragment>
      {loading ? (
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
