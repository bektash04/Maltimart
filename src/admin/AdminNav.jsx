import React from "react";
import { Container, Row, Col } from "reactstrap";
import useAuth from "../custom.hooks/useAuth";
import { NavLink } from "react-router-dom";

import "../style/admin-nav.css";

const adminNav = [
  {
    display: "Dashboard",
    path: "/dashboard"
  },
  {
    display: "All-products",
    path: "/dashboard/all-products"
  },
  {
    display: "Orders",
    path: "/dashboard/orders"
  },
  {
    display: "Users",
    path: "/dashboard/users"
  },
  {
    display: "Add-product",
    path: "/dashboard/add-product"
  }
];

const AdminNav = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>Multimart</h2>
              </div>
              <div className="search__box">
                <input type="text" placeholder="serach.." />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-rigth">
                <span>
                  <i class="ri-notification-3-line"></i>
                </span>
                <span>
                  <i class="ri-settings-2-line"></i>
                </span>
                <img src={currentUser && currentUser.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {adminNav.map((item, index) => (
                <li className="admin__menu-item" key={index}>
                    <NavLink to={item.path} className={NavClass => NavClass.isActive ?  'active__admin-menu' : ''}>{item.display}</NavLink>
                </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
