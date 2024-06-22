import React, { useState, useEffect } from "react";
import Services from "../services/Services";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row, Col } from "reactstrap";
import ProductsList from "../components/UI/ProductsList";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import Clock from "../components/UI/Clock";
import "../style/home.css";
import heroImg from "../assets/images/hero-img.png";


import counterImg from '../assets/images/counter-timer-img.png'

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);


 



  const year = new Date().getFullYear();
  useEffect(() => {
    const filtredTredingProducts = products.filter(
      (item) => item.category === "chair");
 

      const filtredBestSalesProducts = products.filter(
        (item) => item.category === "sofa");

        const filtredMobileProducts = products.filter(
          (item) => item.category === "mobile");

          const filtredWirelessProducts = products.filter(
            (item) => item.category === "wireless");

            const filtredPopularProducts = products.filter(
              (item) => item.category === "watch");
  

  
        setTrendingProducts(filtredTredingProducts)
        setBestSalesProducts(filtredBestSalesProducts)
        setMobileProducts(filtredMobileProducts)
        setWirelessProducts(filtredWirelessProducts)
        setPopularProducts(filtredPopularProducts)




  }, []);
  return (
    <Helmet title={"Home"}>
      <section className="hero___section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Трединг продукта в {year}</p>
                <h2>
                  Сделайте свой интерьер более минималистичным и современным{" "}
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aperiam a, nam nobis aliquid ad exercitationem laboriosam
                  sequi magnam? Esse, tempore.
                </p>
                <motion.button className="shop__btn" whileTap={{ scale: 1.1 }}>
                  <Link to="/shop">купить сейчас</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h1 className="section__title">Модные товары</h1>
            </Col>

      {/* // {loading ? (
  //   <div>
  //     <h2>fkljdlfjkla</h2>
  //   </div>
  // ) : (
  //   <ProductsList data={trendingProducts} />
  // )} */}
  
            <ProductsList data={trendingProducts}/>
          </Row>
        </Container>
      </section>
      <section className="best__sales">
          <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h1 className="section__title">Лучшие продажи</h1>
            </Col>
            <ProductsList data={bestSalesProducts}/>
          </Row>
          </Container>
      </section>
    
    <section className="timer__count">
<Container>
  <Row>
    <Col lg='6' md='12' className='count__down-col'>
      <div className="clock__top-content">
        <h4 className="text-white fs-6 md-2" >Ограниченная акция</h4>
        <h3 className="text-white fs-5 md-3">Качественное кресло</h3>
      </div>
      <Clock/>
      <motion.button whileTap={{scale: 1.1}} className="shop__btn store__btn"> <Link to='/shop'>Visit Store</Link></motion.button>
    </Col>
    <Col lg='6' md='12' className='text-end counter__img'>
      <img src={counterImg} alt="" />
    </Col>

  </Row>
</Container>
    </section>

    <section className="new__arrivals">
      <Container>
        <Row>
        <Col lg="12" className="text-center mb-5">
              <h1 className="section__title">Новое поступление</h1>
            </Col>
            <ProductsList data={mobileProducts}/>
            <ProductsList data={wirelessProducts}/>
        </Row>
      </Container>
    </section>
    <section className="popular__cotegory">
    <Container>
        <Row>
        <Col lg="12" className="text-center mb-5">
              <h1 className="section__title">Популярное в категории</h1>
            </Col>
            <ProductsList data={popularProducts}/>
        </Row>
      </Container>
    </section>
    </Helmet>
  );
};

export default Home;
