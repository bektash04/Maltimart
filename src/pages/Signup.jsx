import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import signupImg from "../assets/images/signup.svg";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { storage } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
import "../style/login.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Creating user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user);

      const storageRef = ref(storage, `images/${Date.now() + userName}`);
      console.log("Uploading file to:", storageRef);

      const snapshot = await uploadBytesResumable(storageRef, file);
      console.log("File uploaded:", snapshot);

      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File URL:", downloadURL);

      await updateProfile(user, {
        displayName: userName,
        photoURL: downloadURL
      });
      console.log("Profile updated");

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: userName,
        email,
        photoURL: downloadURL
      });
      console.log("User data saved to Firestore");

      setLoading(false);
      toast.success("Пользователь успешно зарегистрирован");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при регистрации пользователя:", error);
      toast.error("Что-то пошло не так при регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Helmet title="signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className={"text-center"}>
                <LoadingSpin />
              </Col>
            ) : (
              <Col lg="6" className="m-auto ext-center">
                <h3 className="fs-bold text-center mb-2">Signup</h3>
                <Form className="auth__login" onSubmit={signup}>
                  <div className="login__img-cart">
                    <img src={signupImg} alt="" />
                  </div>
                  <FormGroup className="form__group">
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      placeholder="Введите Имя"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Введите Email"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Введите пароль"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                    />
                  </FormGroup>
                  <div className="form__btn">
                    <button type="submit" className="shop__btn auth__btn">
                      Зарегистрироваться
                    </button>
                    <p>
                      Уже есть аккаунт?<Link to="/login">Войти</Link>
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

export default Signup;
