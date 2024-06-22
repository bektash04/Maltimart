import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../style/all-product.css";
import useGetData from "../custom.hooks/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Продукт успешно удален"); 
    } catch (error) {
      toast.error("Ошибка при удалении продукта");
    }   
  };

  console.log(productsData);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead className="head">
                <tr className="head__tr">
                  <th>Изображение</th>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Цена</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Col className='py-5 text-center'>
                    <BeatLoader color="#0a1d37" loading margin={5} size={20} />
                  </Col>
                ) : (
                  productsData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          className="all-product__img"
                          src={item.imgUrl}
                          alt=""
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          className="shop__btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Удалить
                        </button>
                      </td>
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

export default AllProducts;
