import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import loginImg from "../assets/images/login.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import "../style/login.css";
import { toast } from "react-toastify";
import LoadingSpin from "react-loading-spin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Navigating to /checkout");
      navigate("/checkout");
    }
  }, [user, navigate]);

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Signing in...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = userCredential.user;

      console.log("User signed in:", signedInUser);
      setUser(signedInUser);
      toast.success("Успешно завершен вход в систему");
    } catch (error) {
      console.error("Ошибка при входе в систему:", error);
      toast.error("Ошибка при входе: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <LoadingSpin />
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fs-bold text-center mb-2">Login</h3>
                <Form className="auth__login" onSubmit={signIn}>
                  <div className="login__img-cart">
                    <img src={loginImg} alt="Login" />
                  </div>
                  <FormGroup className="form__group">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Введите Email"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Введите пароль"
                      required
                    />
                  </FormGroup>
                  <div className="form__btn">
                    <button type="submit" className="shop__btn auth__btn">
                      Войти
                    </button>
                    <p>
                      Нет аккаунта? <Link to="/signup">Создать аккаунт</Link>
                    </p>
                  </div>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
