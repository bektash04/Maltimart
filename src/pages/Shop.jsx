import React, { useState,} from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import NoCart from '../assets/images/no-cart.svg'
import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";

import "../style/shop.css";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const hendleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "sofa") {
      const filtredProducts = products.filter(
        (item) => item.category === "sofa"
      );
      setProductsData(filtredProducts)
    }

    if (filterValue === "mobile") {
      const filtredProducts = products.filter(
        (item) => item.category === "mobile"
      );
      setProductsData(filtredProducts)
    }
    if (filterValue === "chair") {
      const filtredProducts = products.filter(
        (item) => item.category === "chair"
      );
      setProductsData(filtredProducts)
    }
    if (filterValue === "watch") {
      const filtredProducts = products.filter(
        (item) => item.category === "watch"
      );
      setProductsData(filtredProducts)
    }
    if (filterValue === "wireless") {
      const filtredProducts = products.filter(
        (item) => item.category === "wireless"
      );
      setProductsData(filtredProducts)
    }
  };

  const hendleSearch = (e) => {
const searchTeam = e.target.value
const searchProducts = products.filter(item => item.productName.toLowerCase().includes(searchTeam.toLowerCase()))

setProductsData(searchProducts)
  }
  return (
    <div>
      <Helmet title="shop">
        <CommonSection title="Товары" />

        <section>
          <Container>
            <Row>
              <Col lg="3" md="6">
                <div className="filter__widget">
                  <select onChange={hendleFilter}>
                    <option>Фильтр по категориям</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="chair">Chair</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </div>
              </Col>
              <Col lg="3" md="6" className={'text-end'}>
                <div className="filter__widget">
                  <select>
                    <option>Сортировать по</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </Col>
              <Col lg="6" md="12">
                <div className="search__box">
                  <input type="text" placeholder="поиск..." onChange={hendleSearch }/>
                  <span>
                    <i class="ri-search-line"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="pt-0">
          <Container>
            <Row>
            {productsData.length === 0 ? (
              <div className="shop__no-cart">
                <h1 className="text-center fs-4">No products are found!</h1>
              <img className="no-cart__img" src={NoCart} alt="" />
              </div>
            ) : (
              <ProductsList data={productsData} />
            )}
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default Shop;
