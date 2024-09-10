import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>
          Order your <br /> favorite food here
        </h2>
        <p>
          You can choose your favorite food from the above menu along with the
          best side dishes and enjoy it to your liking.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
