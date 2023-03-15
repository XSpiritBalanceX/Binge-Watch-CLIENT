import React from "react";
import { NavLink } from "react-router-dom";

const MenuInCatalog = () => {
  return (
    <React.Fragment>
      <NavLink to={"/catalog/detective"} className="nav-link">
        Детектив
      </NavLink>
      <NavLink to={"/catalog/drama"} className="nav-link">
        Драма
      </NavLink>
      <NavLink to={"/catalog/comedy"} className="nav-link">
        Комедия
      </NavLink>
      <NavLink to={"/catalog/melodrama"} className="nav-link">
        Мелодрама
      </NavLink>
      <NavLink to={"/catalog"} className="nav-link">
        Все
      </NavLink>
    </React.Fragment>
  );
};

export default MenuInCatalog;
