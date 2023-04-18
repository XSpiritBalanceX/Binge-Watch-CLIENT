import React from "react";
import "@/styles/MainPage.scss";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { useMainPageFetch } from "@/hooks/useCatalogFetch";
import MainItem from "@/components/MainItem";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useMainPageFetch();

  const goToSeriesPage = (id: string) => {
    navigate("/series/" + id);
  };

  return (
    <React.Fragment>
      {error && <div className="errorDiv">Упс... Что-то пошло не так</div>}
      {loading && (
        <Spinner animation="border" variant="light" className="spiner" />
      )}
      {data && (
        <Container>
          <Row>
            <Col className="seriesContainer">
              <p>
                Топ сериалов <span>10</span>
              </p>
              {data.topTenSeries.map((el) => {
                return (
                  <MainItem
                    key={el.id}
                    infoSeries={el}
                    cbGoToSeriesPage={goToSeriesPage}
                  />
                );
              })}
            </Col>
          </Row>
          <Row>
            <h4>Последние добавленные сериалы</h4>
          </Row>
          <Row className="seriesContainer">
            {data.latestSeries.map((el) => {
              return (
                <MainItem
                  key={el.id}
                  infoSeries={el}
                  cbGoToSeriesPage={goToSeriesPage}
                />
              );
            })}
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};

export default MainPage;
