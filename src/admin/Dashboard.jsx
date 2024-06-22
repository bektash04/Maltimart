import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import useGetData from '../custom.hooks/useGetData'
import '../style/dashboard.css'

const Dashboard = () => {

  const {data: products} = useGetData('products')
  const {data: users} = useGetData('users')

  return (
    <>
    <section>
      <Container>
        <Row>
          <Col lg='3 mb-4'>
            <div className="revenue__box">
              <h5>общий объём продаж</h5>
              <span>$7855</span>
            </div>
          </Col>
          <Col lg='3 3 mb-4'>
          <div className="order__box">
              <h5>Заказы</h5>
              <span>855</span>
            </div>
          </Col>
          <Col lg='3 3 mb-4'>
          <div className="product__box">
              <h5>общее количество продуктов</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col lg='3 3 mb-4'>
          <div className="users__box">
              <h5>общее количество пользователей</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default Dashboard

