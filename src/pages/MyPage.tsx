import React, { useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Spinner, Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import "@/styles/MyPage.scss";
import * as userSelectors from "@/store/selectors";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useUserSeriesFetch } from "@/hooks/useUserSeriesFetch";
import { urlToUserSeries, APIUser } from "@/components/fetchWrapper";
import ViewdSeries from "@/components/ViewdSeries";
import DesiredSeries from "@/components/DesiredSeries";
import { toast } from "react-toastify";
import { useUpdateSeasonFetch } from "@/hooks/useUpdateSeasonFetch";

interface DataResponseAdd {
  message: string;
}

const avatar = require("../images/cat.jpg");

const MyPage = () => {
  const userName = useTypedSelector(userSelectors.userNameSelect);
  const userEmail = useTypedSelector(userSelectors.userEmailSelect);
  useAuthFetch(sessionStorage.getItem("token"));

  const { data, error, loading, seriesFetch } = useUserSeriesFetch(
    urlToUserSeries,
    userName
  );

  const handleClickUpdate = () => {
    seriesFetch();
  };

  const [currentIdSeries, setCurrentId] = useState<string | null>(null);
  const [currentNumberSeason, setCurrentNumber] = useState<number | null>(null);

  useUpdateSeasonFetch(currentIdSeries, currentNumberSeason, userEmail);

  const addSeries = async (
    id: string,
    numberSeason: number,
    paramReq: string
  ) => {
    const dataResponse: DataResponseAdd = await APIUser.addedSeriesToList(
      paramReq,
      {
        email: userEmail as string,
        idseries: id,
        numberseason: numberSeason,
      }
    );
    if (dataResponse) {
      toast.success(dataResponse.message);
    }
    return Promise.resolve();
  };

  const deleteSeries = async (id: string, paramReq: string) => {
    const dataResponse: DataResponseAdd = await APIUser.deleteSeriesFromList(
      paramReq,
      {
        email: userEmail as string,
        idseries: id,
      }
    );
    if (dataResponse) {
      toast.success(dataResponse.message);
    }
    return Promise.resolve();
  };

  const updateSeason = (id: string, numberSeason: number) => {
    setCurrentId(id);
    setCurrentNumber(numberSeason);
  };

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
                {data.bwseries
                  .filter((el) => el.bwlistsusers.viewdseries)
                  .map((el) => {
                    return (
                      <ViewdSeries
                        key={el.id}
                        info={el}
                        cbUpdateSeason={updateSeason}
                        cbDeleteSeries={deleteSeries}
                        cbHandleClickUpdate={handleClickUpdate}
                      />
                    );
                  })}
              </Tab>
              <Tab eventKey={"desired"} title="Хочу посмотреть">
                {data.bwseries
                  .filter((el) => el.bwlistsusers.desiredseries)
                  .map((el) => {
                    return (
                      <DesiredSeries
                        key={el.id}
                        info={el}
                        cbAddSeries={addSeries}
                        cbDeleteSeries={deleteSeries}
                        cbHandleClickUpdate={handleClickUpdate}
                      />
                    );
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
