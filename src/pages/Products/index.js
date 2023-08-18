import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Button from "../../components/button";
import Table from "../../components/table";

import styles from "./products.module.scss";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const store = useSelector((store) => store);

  const handleCreateProduct = () => {
    navigate(`/create`);
  };

  const fetchProducts = () => {
    const productsWithManufacturers = store.data.products.map((product) => {
      const manufacturer = store.data.manufacturers.find(
        (manufacturer) => manufacturer.id === product.manufacturer
      );
      return {
        ...product,
        manufacturerName: manufacturer
          ? manufacturer.name
          : "Unknown Manufacturer",
      };
    });

    setProducts(productsWithManufacturers);
  };

  useEffect(() => {
    fetchProducts();
  }, [store.data.products]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h3>Product list</h3>
        <Button
          btnClass="btnPrimary"
          label="Add new"
          onClick={() => handleCreateProduct()}
        />
      </header>

      <Table rows={products} />
    </div>
  );
};

export default Products;
