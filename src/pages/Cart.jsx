import React from "react";
import "../style/cart.css";
import Hemlet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../redux/silces/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from '../assets/images/no-cart.svg'
import { Link } from "react-router-dom";

const Cart = ({ title }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <div>
      <Hemlet title="cart">
        <CommonSection title="Shorting cart" />
        <section className="section__cart">
          <Container>
            <Row>
              <Col lg="9">
                {cartItems.length === 0 ? (
                  <div className="cart__empty">
                    <h2 className="fs-4 text-center">Empty basket</h2>
                  <img src={EmptyCart} alt="" />
                  </div>
                ) : (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className="cart__body">
                      {cartItems.map((item, index) => (
                        <Tr item={item} key={index}/>
                      ))}
                    </tbody>
                  </table>
                )}
              </Col>

              <Col lg="3">
                <div>
                  <h6 className="d-flex aling-items-center justify-content-between gap-5">Итого:
                  <span className="fs-4 fw-bold"> ${totalAmount}</span>
                  </h6>
                </div>
                <p className="fs-6 mt-2 mb-4">налоги и доставка будут рассчитаны при оформлении заказа </p>
                <div>
                <button className="shop__btn w-100 mb-3"><Link to='/checkout'>проверить</Link></button>
                  <button className="shop__btn w-100 "><Link to='/shop'>продолжить покупки</Link></button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Hemlet>
    </div>
  );
};

const Tr = ({item}) => {
const dispatch = useDispatch()

const deleteProduct = () => {
  dispatch( cartActions.deleteItem(item.id))
}
  return <tr>
  <td>
    <img
      src={item.imgUrl}
      alt=""
      className="cart__img"
    />
  </td>
  <td>{item.productName}</td>
  <td>${item.price}</td>
  <td>{item.quantity}</td>
  <td >
    <motion.span whileTap={{ scale: 1.1 }}>
      <i class="ri-delete-bin-6-line" onClick={deleteProduct}></i>
    </motion.span>
  </td>
</tr>
}

export default Cart;
