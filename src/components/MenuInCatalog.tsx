import React from "react";
import { NavLink } from "react-router-dom";

const MenuInCatalog = () => {
  return (
    <React.Fragment>
      <NavLink to={"/catalog/детектив"} className="nav-link">
        Детектив
      </NavLink>
      <NavLink to={"/catalog/драма"} className="nav-link">
        Драма
      </NavLink>
      <NavLink to={"/catalog/комедия"} className="nav-link">
        Комедия
      </NavLink>
      <NavLink to={"/catalog/мелодрама"} className="nav-link">
        Мелодрама
      </NavLink>
      <NavLink to={"/catalog/сериалы"} className="nav-link">
        Все
      </NavLink>
    </React.Fragment>
  );
};

export default MenuInCatalog;
