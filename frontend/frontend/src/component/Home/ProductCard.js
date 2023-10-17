import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      {/* <div className="productCard"> */}
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <p className="smallText">{product.discription}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
      {/* </div> */}
    </Link>
  );
};

export default ProductCard;
