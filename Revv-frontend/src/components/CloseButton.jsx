import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <span className="X" />
        <span className="Y" />
        <span className="tooltip">Remove from <br /> Cart
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 3.5em;
    height: 3.5em;
    border: none;
    background-color: rgb(211, 21, 21);
    border-radius: 5px;
    transition: background 0.5s;
  }

  .X {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: rgb(255, 255, 255);
    transform: translateX(-50%) rotate(45deg);
  }

  .Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: #fff;
    transform: translateX(-50%) rotate(-45deg);
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
  .button:active {
    transform: scale(0.95);
  }

  
  }`;

export default Button;
