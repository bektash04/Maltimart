import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom.hooks/useGetData";
import BeatLoader from "react-spinners/BeatLoader";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import '../style/users.css'

const Users = () => {
  const { data: usersData, loading } = useGetData("users");

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      toast.success("Электронная почта успешно удален"); 
    } catch (error) {
    }   
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
        
            <h4 className="user-h4  fw-bold">пользователи</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table">
              <thead>
                <tr >
                  <th>Изображение</th>
                  <th>Имя пользователя</th>
                  <th>Электронная почта</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Col className='pt-6 '> <BeatLoader color="#0a1d37" loading margin={5} size={20} /></Col>
                ) : (
                    usersData?.map((user, index) => (
                            <tr key={user.uid}>
                                <td><img className="users__img" src={user.photoURL} alt=""/></td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td><button className="shop__btn btn-danger" type="submit" onClick={() => {handleDeleteUser(user.uid)}}>Удалить</button></td>
       

                            </tr>
                    ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
