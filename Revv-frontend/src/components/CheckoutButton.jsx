
import styled from 'styled-components';

const CheckoutButton = () => {
  return (
    <StyledWrapper>
      <button className="btn font-bold"> CheckOut
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
   --color: #00A97F;
   --color2: rgb(10, 25, 30);
   padding: 0.8em 1.75em;
   background-color: transparent;
   border-radius: 6px;
   border: .3px solid var(--color);
   transition: .2s;
   position: relative;

   overflow: hidden;
   cursor: pointer;
   z-index: 1;
   font-size: 17px;
   font-family: 'Roboto', 'Segoe UI', sans-serif;
   text-transform: uppercase;
   color: var(--color);
  }

  .btn::after, .btn::before {
   content: '';
   display: block;
   
   height: 100%;
   width: 100%;
   transform: skew(90deg) translate(-50%, -50%);
   position: absolute;
   inset: 50%;
   left: 25%;
   z-index: -1;
   transition: .3s ease-out;
   background-color: var(--color);
  }

  .btn::before {
   top: -50%;
   left: -25%;
   transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
  }

  .btn:hover::before {
   transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
  }

  .btn:hover::after {
   transform: skew(45deg) translate(-50%, -50%);
      color: white;
  }

  .btn:hover {
      color: white;
  }

  .btn:active {
   filter: brightness(.7);
   transform: scale(.94);
  }`;

export default CheckoutButton;
