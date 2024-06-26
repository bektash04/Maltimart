import React, { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import usserIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";
import useAuth from "../../custom.hooks/useAuth";
import { Container, Row } from "reactstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import "./header.css";
import { toast } from "react-toastify";
import goOut from '../../assets/images/G0-02.svg'


const nav__links = [
  {
    path: "home",
    display: "Home"
  },
  {
    path: "shop",
    display: "Shop"
  },
  {
    path: "cart",
    display: "Cart"
  }
];


const Header = () => {

  const menuRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const profileActionRef = useRef(null)

  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeaderFun = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

const logout = () => {
  signOut(auth).then(() => {
    toast.success('вышел из аккаунта')
    navigate('/home')
  }).catch(err => {
    toast.error(err.message)
  })
}

  useEffect(() => {
    stickyHeaderFun();

    return () => window.removeEventListener("scroll", stickyHeaderFun);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>  {

    profileActionRef.current.classList.toggle('show__profileActions') }
  
  
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                <i class="ri-heart-line"></i>
                <span className="bagbe">2</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="bagbe">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.1 }}
                  src={currentUser ? currentUser.photoURL : usserIcon}
                  alt=""
                  width={30}
                  height={30}
                  style={{ cursor: "pointer" }}
                  onClick={toggleProfileActions}
                />
                <div className="profile__actions" ref={ profileActionRef} 
                 onClick={toggleProfileActions}
                  >
                  {currentUser ? (
                    <span onClick={logout} className="profile__goTo"> <img className="profile__goOut" src={goOut} alt="" />выход</span>
                  ) : (
                    <div className="header__login">
                      <Link className="login" to='/signup'>зарегистрироваться</Link>
                      <Link to='/login'>Логин</Link>
                      <Link to='/dashdoard'>Админ Панель</Link>


                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
