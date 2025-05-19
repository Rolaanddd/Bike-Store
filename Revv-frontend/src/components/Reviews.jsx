import styled from "styled-components";
import PropTypes from "prop-types";

const Reviews = ({ review, email }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-inner font-bold">
          <div className="card-front p-5">
            <p>{review}</p>
          </div>
          <div className="card-back font-bold italic">
            <p>~{email}</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    height: 250px;
    width: 275px;
    perspective: 1000px;
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.999s;
  }

  .card:hover .card-inner {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .card-front {
    background-color: #c3b091;
    color: #4a412a;
    display: flex;
    align-items: center;
    border: 2px solid #c3b091;
    border-radius: 10px;
    justify-content: center;
    font-family: "Courier New", Courier, monospace;
    font-size: 15px;
    transform: rotateY(0deg);
  }

  .card-back {
    background-color: #ccd5ae;
    color: #b08968;
    display: flex;
    align-items: center;
    border: 10px solid #ccd5ae;
    font-family: "Courier New", Courier, monospace;
    border-radius: 10px;
    justify-content: center;
    font-size: 15px;
    transform: rotateY(180deg);
  }
`;
Reviews.propTypes = {
  email: PropTypes.string,
  review: PropTypes.string,
};

export default Reviews;
