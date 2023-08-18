import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";

import Input from "../input";
import Button from "../button";
import Selector from "../selector";

import {
  addProduct,
  editProduct as editProductAction,
} from "../../store/actions/product.actions";

import styles from "./form.module.scss";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    manufacturer: "",
    price: "0",
    expiryDate: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState([]);
  const { manufacturers, editProduct } = useSelector((store) => store.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setManufacturerOptions = () => {
    setOptions(() =>
      manufacturers.map((el) => {
        return { label: el.name, value: el.id };
      })
    );
  };

  useEffect(() => {
    setManufacturerOptions();
  }, []);

  useEffect(() => {
    if (editProduct && Object.keys(editProduct).length > 0) {
      setProduct({
        ...editProduct,
        manufacturer: {
          value: editProduct.manufacturerId,
          label: editProduct.manufacturerName,
        },
        expiryDate: moment(editProduct.expiryDate).format("YYYY-MM-DD"),
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    if (!value || value === "0") {
      setError((prevState) => {
        return { ...prevState, [name]: true };
      });
    } else {
      setError((prevState) => {
        return { ...prevState, [name]: false };
      });
    }
  };

  const handleSelect = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      manufacturer: e,
    }));
    setError((error) => ({ ...error, manufacturer: false }));
  };

  const validateForm = () => {
    setError({
      name: !product.name,
      manufacturer: !product.manufacturer,
      price: !product.price || product.price === "0",
      expiryDate: !product.expiryDate,
    });

    return !(
      !product.name ||
      !product.manufacturer ||
      !product.price ||
      product.price === "0" ||
      !product.expiryDate
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitDisabled(true);
      const newProduct = {
        id: editProduct ? editProduct.id : "p" + new Date().getTime(),
        name: product.name,
        manufacturer: product.manufacturer.value,
        expiryDate: product.expiryDate,
        price: Number(product.price),
      };
      if (editProduct) {
        dispatch(editProductAction({ ...newProduct }));
      } else {
        dispatch(addProduct({ ...newProduct }));
      }
      navigate("/products");
    }
    setSubmitDisabled(false);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{editProduct ? "Edit" : "Add"} Product</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          name="name"
          type="text"
          label="Product name:"
          value={product.name}
          placeholder="Enter product name"
          error={error.name}
          errorMessage="Product name field is required"
          onChange={handleChange}
        />

        <Selector
          label="Manufacturer:"
          options={options}
          multiselect={false}
          error={error.manufacturer}
          errorMessage="Product manufacturer field is required"
          selectedOption={product.manufacturer}
          handleChangeSelect={(e) => handleSelect(e)}
          selectClassname="selectGray"
          placeholder="Select product manufacturer"
        />

        <Input
          name="price"
          type="number"
          label="Price: (in EUR)"
          value={product.price}
          error={error.price}
          errorMessage="Product price field is required and larger than 0"
          otherProps={{ min: 0, step: 0.25 }}
          onChange={handleChange}
        />

        <Input
          name="expiryDate"
          type="date"
          label="Expiry date:"
          value={product.expiryDate}
          error={error.expiryDate}
          errorMessage="Expiry date field is required and the date must be valid and in the future"
          otherProps={{ min: new Date().toISOString().split("T")[0] }}
          onChange={handleChange}
        />

        <Button
          btnClass="btnSubmit"
          label={editProduct ? "Edit" : "Submit"}
          type="submit"
          onClick={handleSubmit}
          disabled={submitDisabled}
        />
      </form>
    </div>
  );
};

export default ProductForm;
