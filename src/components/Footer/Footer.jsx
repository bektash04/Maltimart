import React from 'react'
import {Col, Container, Row, ListGroup, ListGroupItem} from 'reactstrap'
import { Link } from 'react-router-dom'

import './footer.css'


const Footer = () => {

  const yesr = new Date().getFullYear()
  return (
    <footer className='footer'>
<Container>
  <Row>
    <Col lg="4" className='md-4' md='6'>
    <div className="logo">
              <div className='mart-logo'>
                <h1 className='mart-text' style={{textAlign: 'center'}}>Multimart</h1>
              </div>
              </div>
              <p className="footer__text mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit atque dignissimos quos nam iure voluptate quas quidem soluta doloribus dolores?</p>

    </Col>

    <Col lg="3" md='3' className='md-4'>
      <div className="footer__quick-links">
        <h2 className='quick__links-title'>Высшая категория</h2>
        <ListGroup>
          <ListGroupItem className='ps-0 border-0'>
            <Link to='#'>Мобильные телефоны</Link>
          </ListGroupItem >
          <ListGroupItem className='ps-0 border-0'>
            <Link to='#'>Современные диваны</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to='#'>Кресло с подлокотником</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to='#'>Смарт-часы</Link>
          </ListGroupItem>
        </ListGroup>

      </div>
    </Col>

    <Col lg="2" md='3' className='md-4'>
    <div className="footer__quick-links">
        <h2 className='quick__links-title'>Полезные ссылки</h2>
        <ListGroup>
          <ListGroupItem className='ps-0 border-0'>
            <Link to='/shop'>Shop</Link>
          </ListGroupItem >
          <ListGroupItem className='ps-0 border-0'>
            <Link to='/cart'>Cart</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0'>
            <Link to='/login'>Login</Link>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0 '>
            <Link to='/singnup'>Privacy Policy</Link>
          </ListGroupItem>
        </ListGroup>

      </div>
    </Col>

    <Col lg="3" md='4'>
    <div className="footer__quick-links">
        <h2 className='quick__links-title'>Контакты</h2>
        <ListGroup className='footer__contact'>
          <ListGroupItem className='ps-0 border-0 d-flex aling-items-center gap-2  mart__links'>
           <span><i class="ri-map-pin-line"></i></span>
           <p>Bishkek, Chuy,123</p>
          </ListGroupItem >
          <ListGroupItem className='ps-0 border-0 d-flex aling-items-center gap-2'>
          <span><i class="ri-smartphone-line"></i></span>
           <p>+996 705  001 219</p>
          </ListGroupItem>
          <ListGroupItem className='ps-0 border-0 d-flex aling-items-center gap-2'>
          <span><i class="ri-mail-line"></i></span>
           <p>example123.@gmail.com</p>
          </ListGroupItem>
    
        </ListGroup>

      </div>
    </Col>

<Col lg='12'>
  <p className="footer__copyright">Developer's copyright {yesr} All rights reserved</p>
</Col>
  </Row>
</Container>
    </footer>
  )
}

export default Footer