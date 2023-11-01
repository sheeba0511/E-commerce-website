import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";



const product = {
  _id: 1,
  numOfReviews: 1,
  name: "Samsung F23",
  price: 23000,
  discription: "This is a sample product",
  category: "SmartPhones",
  ratings: 1,
  Stock: 10,
  images: [
    {
      id: 1,
      public_id: "sample_Image",
      url: "data:image/jpeg;base64,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"
    }
  ],
  reviews: [
    {
      _id: 1,
      name: "Abhishekh",
      rating: 1,
      comment: "good",
      user: "12345678"
    }
  ]
}




const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // const { product, loading, error } = useSelector(
  //   (state) => state.productDetails
  // );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (reviewError) {
  //     alert.error(reviewError);
  //     dispatch(clearErrors());
  //   }

  //   if (success) {
  //     alert.success("Review Submitted Successfully");
  //     dispatch({ type: NEW_REVIEW_RESET });
  //   }
  //   dispatch(getProductDetails(match.params.id));
  // }, [dispatch, match.params.id, error, alert, reviewError, success]);

  
  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
    //   )}
    // </Fragment>
  );
};

export default ProductDetails;
