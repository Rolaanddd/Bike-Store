
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CloseButton from "./CloseButton";

export default function CartItems({ productname, imgURL, price, quantity, onRemove, onQuantityChange }) {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const offer = (90 / 100) * price;
  const formattedPrice = price.toLocaleString("en-IN");
  const formattedOffer = offer.toLocaleString("en-IN");

  function updateQuantity(newQuantity) {
    if (newQuantity < 1) return;
    onQuantityChange(productname, newQuantity);
  }

  return (
    <div className="h-60 custom-shadow grid grid-cols-5 overflow-hidden rounded-2xl mb-5 w-3/5">
      <div onClick={() => onRemove(productname)} className="absolute right-82 mt-1.5">
        <CloseButton />
      </div>
      <div className="col-span-2 bg-white h-full">
        <img src={imgURL} className="cover h-full" alt={productname} />
      </div>
      <div className="col-span-3 cursor-default p-5">
        <h1 className="text-4xl font-black">{productname}</h1>
        <h3 className="mt-7">
          <span className="text-2xl font-bold">Price :</span>{" "}
          <span className="font-bold text-2xl">₹{formattedOffer}</span>{" "}
          <span className="mr-3 font-light line-through">₹{formattedPrice}</span>
        </h3>

        <div className="flex items-center gap-3 mt-7">
          <h4 className="font-bold text-lg">Quantity :</h4>
          <div onClick={() => updateQuantity(quantity - 1)} className="incredecre flex justify-center items-center text-lg">
            <span>-</span>
          </div>
          <h4 className="font-bold text-lg">{quantity}</h4>
          <div onClick={() => updateQuantity(quantity + 1)} className="incredecre flex justify-center items-center text-lg">
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

CartItems.propTypes = {
  productname: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};
