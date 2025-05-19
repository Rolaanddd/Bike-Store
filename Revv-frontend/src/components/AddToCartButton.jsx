import styled from "styled-components";

const AddToCartButton = () => {
  return (
    <StyledWrapper>
      <button> Add to Cart</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    padding: 1em 1em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
    color: #fff;
    background-color: #52b788;
    border: none;
    border-radius: 2px;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  }

  button:hover {
    background-color: #23c483;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  button:active {
    transform: translateY(-1px);
  }
`;

export default AddToCartButton;
