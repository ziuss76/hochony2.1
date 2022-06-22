import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Button, Form, FormControl, Carousel, Spinner} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, Route, Switch, useHistory } from "react-router-dom";
import React, { useState } from "react";
import Data from "./data.js"; // Data 자리엔 자유롭게 작명가능
import Detail from "./Detail.js";
import Cart from "./Cart.js";
import "./Cart.scss";
import axios from "axios";


function App() { 
  let [hochony, hochony변경] = useState(Data); //Data는 data.js 에 있는 데이터 전체
  let [더보기, 더보기변경] = useState(true);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
      <Container fluid> 
      <Navbar.Brand href="/">
        <img
          alt=""
          src="https://ziuss76.github.io/hochoicon.svg"
          width="35px"
          height="35px"
          className="hochoicon"
        />
        </Navbar.Brand>
        <Form className="d-flex"> 
        <FormControl
          type="search"
          className="me-1"
          placeholder=" Hochony Shop"
          aria-label="Search"
          size="sm"
          style={{ width: '8.5rem' }}
        />
        <button className="buttonSearch"><FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/></button>
      </Form>
      
    {/* Form, FormControl 쓰려면 Container 에 fluid 속성 필요! */}
    <Nav className="me-1">
      <div className="icon" >
      <Nav.Link as={Link} to="/cart"><FontAwesomeIcon icon={faCartPlus} size="lg" className="cart"/></Nav.Link>
      <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faUser} size="lg" className="info"/></Nav.Link>
      </div>
    </Nav>
      
    </Container>
  </Navbar>
  {/* Switch 쓰면 하나하나 exact 안 붙여도 됨!  */}
  <Switch>
        <Route exact path="/"> 
        {/* 윗 줄 처럼 exact 안붙여도 하나씩만 작동한다는 뜻. 보여주기 위해 일단은 넣음 */}
          <Container className="col-md-8">
          <Carousel className="m-3 Carousel">
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100"
                src="https://ziuss76.github.io/images/hochonybg1.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>1 day delivery</h3>
                <h5>싱싱한 새벽배송</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100"
                src="https://ziuss76.github.io/images/hochonybg2.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
              <h3>Welcome Sale 30%</h3>
                <h5>자, 당신도 이제 호집사</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="https://ziuss76.github.io/images/hochonybg3.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
              <h3>20% Season Off</h3>
                <h5>선주문 후뚜맞</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </Container>

          <div className="container">
              <div className="row">
                {hochony.map((a, i) => {
                  return <Card hochony={hochony[i]} i={i} key={i}/>; //hochony 중에 hochony[i] 만 전송한다
                })}
              </div>

              { 더보기 === true ?
            <button
              className="buttonYellow"
              style={{width: 85}}
              onClick={() => {
                axios //axios는 JSON 을 예쁘게 Object 형으로 바꿔줌 즉 따옴표 다 떼줌! fetch는 그런거 없음ㅅㄱ
                  .get('/content') //get 요청 할 주소
                  .then((result) => {
                    console.log(result.data);
                    //then 은 요청 성공시 실행할 코드, result.data 는 받아온 데이터
                    hochony변경([...hochony, ...result.data]); //data 카피본에 추가적으로 data2 카피본 넣기
                    더보기변경(false);
                  })
                  .catch(() => {
                    //catch 는 요청 실패시 실행할 코드
                    console.log("불러오기 실패!");
                  });
              }}
            >
              더보기
            </button> : null}

              </div>

          </Route>
        <Route path="/detail/:id">
          <Detail hochony={hochony}/>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {
  let history = useHistory();
  
  return (
    <div className="col-md-4">
      <img
        onClick={() => {
          history.push("/detail/" + props.hochony.id);
        }}
        src={"images/hochony" + (props.i + 115) + ".jpg"
        
        }
        alt="" width="94%"
      />
      <div className="product-box"
      onClick={() => {
        history.push("/detail/" + props.hochony.id);
      }}>
      <h4 className="photoTitle">{props.hochony.title}</h4>
      <p>
        {props.hochony.content}
      </p>
      <p>{props.hochony.price}원 / 재고: {props.hochony.quan}</p>
    </div>
    </div>
  );
}

export default App;
