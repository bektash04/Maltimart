import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useSelector } from "react-redux";
import '../style/checkout.css'

const Checkout = ({ title }) => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <Helmet title="checkout">
      <CommonSection title="checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mt-4 fw-bold">Платежная информация </h6>
              <Form className='billibg__form'>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Введите свое имя" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="Введите вашу электронную почту" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="number" placeholder="Номер телефона" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Адрес улицы" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Почтовый индекс" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Город" />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkopt__cart">
                <h6>Общее количество: <span>{totalQuantity}</span></h6>
                <h6>Итого: <span>${totalAmount}</span></h6>
                <h6>Доставка <span>$30</span></h6>
                <h4>общая стоимость <span>${totalAmount}</span></h4>
                <button className="shop__btn  store__btn w-100">Оформить заказ</button>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
