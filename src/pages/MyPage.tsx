import React from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Spinner, Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import "@/styles/MyPage.scss";
import * as userSelectors from "@/store/selectors";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useUserSeriesFetch } from "@/hooks/useUserSeriesFetch";
import { urlToUserSeries } from "@/components/fetchWrapper";
import ViewdSeries from "@/components/ViewdSeries";
import DesiredSeries from "@/components/DesiredSeries";

const avatar = require("../images/cat.jpg");

const MyPage = () => {
  const userName = useTypedSelector(userSelectors.userNameSelect);
  useAuthFetch(sessionStorage.getItem("token"));

  const { data, error, loading } = useUserSeriesFetch(
    urlToUserSeries,
    userName
  );

  return (
    <React.Fragment>
      {error && <div className="errorDiv">Упс... Что-то пошло не так</div>}
      {loading && (
        <Spinner animation="border" variant="light" className="spiner" />
      )}
      {data && (
        <Container>
          <Row className="mainContainerMyPage">
            <Col>
              <img src={avatar} alt="avatarUser" />
              {userName}
            </Col>
          </Row>
          <Row>
            <Tabs defaultActiveKey={"viewd"} id="uncontrolled-tab-example">
              <Tab eventKey={"viewd"} title="Просмотренные">
                {data.bwseries.map((el) => {
                  if (el.bwlistsusers.viewdseries) {
                    return <ViewdSeries key={el.id} info={el} />;
                  }
                })}
              </Tab>
              <Tab eventKey={"desired"} title="Хочу посмотреть">
                {data.bwseries.map((el) => {
                  if (el.bwlistsusers.desiredseries) {
                    return <DesiredSeries key={el.id} info={el} />;
                  }
                })}
              </Tab>
            </Tabs>
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};

export default MyPage;
