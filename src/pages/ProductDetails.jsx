import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import "../style/product-details.css";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import {  cartActions } from "../redux/silces/cartSlice";
import { toast } from "react-toastify";


const ProductDetails = ({ title }) => {
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const [rating, setRating] = useState(null);
  const { id } = useParams();

  const dispatch = useDispatch();
  const product = products.find((item) => item.id === id);

  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category
  } = product;

  const relateProducts = products.filter((item) => item.category === category);

  const sumbitHendler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
   

    const reviewObj = {
   userName:  reviewUserName,
   text: reviewUserMsg,
   rating
   
    }
    console.log(reviewObj);
    toast.success('комментарий успешно добавлено')
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price
      })
    );

    toast.success('успешно добавлен')
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  return (
    <div>
      <Helmet title={productName}>
        <CommonSection title={productName} />
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <img src={imgUrl} alt="" />
              </Col>
              <Col lg="6">
                <div className="product__details">
                  <h2>{productName}</h2>
                  <div className="product__rating d-flex align-items-center gap-5 mb-3">
                    <div>
                      <span >
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span >
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span >
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span >
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span >
                        <i class="ri-star-half-s-line"></i>
                      </span>
                    </div>
                    <p>
                      (<span>{avgRating}</span>ratings)
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-5">
                    <span className="product__price">${price}</span>
                    <span>Category: {category.toUpperCase()}</span>
                  </div>
                  <p className="product__desc">{shortDesc}</p>
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="shop__btn" onClick={addToCart}>
                    добавить в корзину
                  </motion.button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="tab__wrapper d-flex align-items-center gap-5">
                  <h6
                    className={`${tab === "desc" ? "active__tab" : ""}`}
                    onClick={() => setTab("desc")}
                  >
                    Описание
                  </h6>
                  <h6
                    className={`${tab === "rev" ? "active__tab" : ""}`}
                    onClick={() => setTab("rev")}
                  >
                    просмотреть отзывы({reviews.length})
                  </h6>
                </div>
                {tab === "desc" ? (
                  <div className="tab__content mt-4">
                    <p>{description}</p>
                  </div>
                ) : (
                  <div className="product__review mt-4">
                    <div className="review__wrapper">
                      <ul>
                        {reviews?.map((item, index) => (
                          <li key={index} className="mb-4">
                            <h6>Jhon Doe</h6>
                            <span>{item.rating}(рейтинг)</span>
                            <p>{item.text}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="review__form">
                        <h4>Оставьте свои впечатления</h4>
                        <form onSubmit={sumbitHendler}>
                          <div className="form__group ">
                            <input
                              type="text"
                              placeholder="введите имя"
                              ref={reviewUser}
                              required
                            />
                          </div>
                          <div className="form__group d-flex align-items-center gap-5 rating__group">
                            <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(1)}>
                              1<i class="ri-star-fill"></i>
                            </motion.span>
                            <span onClick={() => setRating(2)}>
                              2<i class="ri-star-fill"></i>
                            </span>
                            <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(2)}>
                              3<i class="ri-star-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(3)}> 
                              4<i class="ri-star-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(5)}>
                              5<i class="ri-star-fill"></i>
                            </motion.span>
                          </div>
                          <div className="form__group">
                            <textarea
                              rows={4}
                              type="text"
                              placeholder="оставить отзыв..."
                              ref={reviewMsg}
                              required
                            />
                          </div>
                          <motion.button whileTap={{scale: 1.2}} type="submit" className="shop__btn">
                            Отправить
                          </motion.button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
              <Col lg="12" className="mt-5">
                <h2 className="related__title">
                  {" "}
                  Вам может также понравиться
                </h2>
              </Col>
              <ProductsList data={relateProducts} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default ProductDetails;
