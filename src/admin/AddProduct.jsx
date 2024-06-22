import React, { useState } from "react";
import { Form, FormGroup, Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import LoadingSpin from "react-loading-spin";

const AddProduct = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShoptDesc, setEnterShoptDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          toast.error("Изображение не загружено!");
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(docRef, {
            productName: enterTitle,
            shoptDesc: enterShoptDesc,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadURL,
          });
          setLoading(false);
          toast.success("Товар успешно добавлен!");
          navigate("/dashboard/all-products");
        }
      );
    } catch (err) {
      setLoading(false);
      toast.error("Товар не добавлен!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
               <Col lg="12" className="text-center">
               <LoadingSpin />
             </Col>
            ) : (
              <>
                <h4 className="mb-5">Add Products</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Название продукта</span>
                    <input
                      type="text"
                      placeholder="Двуспальный диван"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Краткое описание</span>
                    <input
                      type="text"
                      placeholder="Пояснение..."
                      value={enterShoptDesc}
                      onChange={(e) => setEnterShoptDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Описание</span>
                    <input
                      type="text"
                      placeholder="Описание"
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Стоимость</span>
                      <input
                        type="text"
                        placeholder="$100"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="w-50">
                      <span>Категория</span>
                      <select
                        className="form__group w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                      >
                        <option value=''>Select category</option>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>
                  <FormGroup className="form__group">
                    <span>Изображение продукта</span>
                    <input
                      type="file"
                      onChange={(e) => setEnterProductImg(e.target.files[0])}
                      required
                    />
                  </FormGroup>
                  <button className="primary__btn shop__btn" type="submit">
                    Добавить товар
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProduct;
