import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";

import {
  removeProduct,
  setEditProduct,
} from "../../store/actions/product.actions";

import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

import styles from "./table.module.scss";

const PAGE_SIZE = 5;

const Table = ({ rows = [], columns = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

  // Calculate the number of pages
  const pageCount = Math.ceil(rows.length / PAGE_SIZE);

  // Get the data for the current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = rows.slice(startIndex, endIndex);

  // Handle page navigation
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const columnsHeader = [
    "Name",
    "Manufacturer",
    "Price",
    "Expiry date",
    "Edit",
    "Delete",
  ];

  const handleEdit = (item) => {
    dispatch(setEditProduct(item));
    navigate(`/edit`);
  };

  const handleRemove = (itemId) => {
    dispatch(removeProduct(itemId));
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ overflowX: "auto" }}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.header}>
              {columnsHeader.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, index) => {
              return (
                <tr key={index} className={styles.row}>
                  <td key={"name" + index} className={styles.name}>
                    {row.name}
                  </td>
                  <td
                    key={"manufacturer" + index}
                    className={styles.manufacturer}
                  >
                    {row.manufacturerName}
                  </td>
                  <td key={"price" + index} className={styles.price}>
                    EUR {row.price}
                  </td>
                  <td key={"expiryDate" + index} className={styles.expiryDate}>
                    {moment(row.expiryDate).format("DD.MM.YYYY")}
                  </td>
                  <td key={"edit" + index} className={styles.edit}>
                    <FaEdit onClick={() => handleEdit(row)} />
                  </td>
                  <td key={"remove" + index} className={styles.remove}>
                    <FaTrashAlt onClick={() => handleRemove(row.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <FaArrowCircleLeft />
        </button>
        <span>
          page {currentPage} of {pageCount}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === pageCount}>
          <FaArrowCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Table;
