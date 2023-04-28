import React from "react";
import { Button } from "react-bootstrap";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import * as userSelectors from "@/store/selectors";
import { useParams } from "react-router-dom";
import { APIUser } from "@/components/fetchWrapper";
import { toast } from "react-toastify";
import "@/styles/SeriesPage.scss";

interface DataResponseAdd {
  message: string;
}

const AddButton = () => {
  const isLogin = useTypedSelector(userSelectors.isLoginSelect);
  const userEmail = useTypedSelector(userSelectors.userEmailSelect);
  const params = useParams();
  const seriesID = params.id as string;

  const handleAddSeries = async (
    button: React.MouseEvent<HTMLButtonElement>
  ) => {
    const dataResponse: DataResponseAdd = await APIUser.addedSeriesToList(
      button.currentTarget.name,
      {
        email: userEmail as string,
        idseries: seriesID,
        numberseason: 1,
      }
    );
    if (dataResponse) {
      toast.success(dataResponse.message);
    }
  };

  return (
    <React.Fragment>
      {isLogin && (
        <div className="buttonSeries">
          <Button
            variant="outline-info"
            name="watched"
            onClick={(e) => handleAddSeries(e)}
          >
            Посмотрел
          </Button>
          <Button
            variant="outline-info"
            name="desired"
            onClick={(e) => handleAddSeries(e)}
          >
            Хочу посмотреть
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddButton;
