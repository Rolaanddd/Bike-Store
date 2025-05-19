import PropTypes from "prop-types";
import CartButton from "./CartButton";
import Logout from "./Logout";
import ReviewButton from "./ReviewButton";
import { Link, useNavigate } from "react-router-dom";
import Homebutton from "./Homebutton";

export default function Nav({ cartCount }) {
  const navigate = useNavigate();
  function handleclick() {
    navigate("/register");
  }
  return (
    <div className="sticky z-50 top-0">
      <div className="grid grid-cols-12 bg-neutral-800 p-3">
        
        <div className="col-span-10  flex  justify-center items-center">
          <Link className="ml-8 mr-8 object-cover h-14 w-14" to="/homepage">
            <Homebutton />
          </Link>
          <Link className="ml-8 mr-8" to="/cart">
            <CartButton totalItems={cartCount} />
          </Link>
          <Link className="ml-8 mr-8" to="/review">
            <ReviewButton />
          </Link>
        </div>

        <div
          onClick={handleclick}
          className=" col-span-1 flex  items-center justify-end"
        >
          <Logout />
        </div>
      </div>
    </div>
  );
}

Nav.propTypes = {
  email: PropTypes.string, // Specify that email is required and should be a string
};
Nav.propTypes = {
  cartCount: PropTypes.number,
};
