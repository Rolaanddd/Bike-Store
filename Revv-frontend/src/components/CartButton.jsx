import styled from "styled-components";
import Cart from "/src/photos/Cart.svg";

import PropTypes from "prop-types";

const CartButton = ({ totalItems }) => {
  return (
    <StyledWrapper>
      <button>
        {totalItems > 0 && (
          <div className="absolute ml-3 bg-red-600 rounded-2xl w-5 top-1 text-xs font-bold text-white h-4.5">
            {totalItems}
          </div>
        )}
        <img src={Cart} alt="Cart" />
        <span className="tooltip">Cart</span>
      </button>
    </StyledWrapper>
  );
};

CartButton.propTypes = {
  totalItems: PropTypes.number,
};

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;

  button {
    background: none;
    border: none;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
  }

  button:hover {
    background: rgba(170, 170, 170, 0.062);
    transition: 0.3s;
  }

  .tooltip {
    position: absolute;
    top: 50%;
    left: 110%; /* Position it beside the button */
    transform: translateY(-50%);
    background: black;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s;
  }

  button:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

export default CartButton;
