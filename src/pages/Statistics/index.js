import React from "react";
import { useSelector } from "react-redux";

import CustomBarChart from "../../components/barChart";
import CustomPieChart from "../../components/pieChart";

import styles from "./statistics.module.scss";

const Statistics = () => {
  const { products, manufacturers } = useSelector((store) => store.data);

  const productsByHighestPrice = products
    .slice()
    .sort((a, b) => b.price - a.price);

  const top5HighestPriceProducts = productsByHighestPrice.slice(0, 5);
  const top5LowestPriceProducts = productsByHighestPrice
    .slice(products.length - 6, products.length - 1)
    .reverse();

  const manufacturerProductCounts = products.reduce((counts, product) => {
    const manufacturerName =
      manufacturers.find(
        (manufacturer) => manufacturer.id === product.manufacturer
      )?.name || "Unknown Manufacturer";

    counts[manufacturerName] = (counts[manufacturerName] || 0) + 1;
    return counts;
  }, {});

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Statistics</h3>

      <div className={styles.chart}>
        <h4 className={styles.subtitle}>
          Top 5 most expensive products and top 5 least expensive products
        </h4>
        <CustomBarChart
          data={[...top5HighestPriceProducts, ...top5LowestPriceProducts]}
        />
      </div>

      <div className={styles.chart}>
        <h4 className={styles.subtitle}>
          Manufacturers and number of products
        </h4>
        <CustomPieChart data={manufacturerProductCounts} />
      </div>
    </div>
  );
};

export default Statistics;
