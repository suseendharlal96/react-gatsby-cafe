import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link } from "gatsby";

import logo from "../images/logo.png";
import cart from "../images/cart.png";

const Header = ({ siteTitle }) => {
  const [links, setlinks] = useState([
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
  ]);

  const [isOpen, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  const toggleNavbar = () => {
    setOpen(!isOpen);
  };

  const setActive = (i) => {
    setActiveLink(i + 1);
  };

  return (
    <nav className="navbar navbar-fixed-top navbar-expand-sm bg-dark navbar-dark">
      <Link to="/" className="navbar-brand">
        <img style={{ height: "50px", width: "50px" }} src={logo} alt="logo" />
        <span style={{ margin: "10px 0px 0px 10px" }}>{siteTitle}</span>
      </Link>
      <button onClick={toggleNavbar} className="navbar-toggler">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={
          isOpen ? "collapse navbar-collapse" : "collapse navbar-collapse show"
        }
      >
        <ul className="navbar-nav mx-auto">
          {links.map((link, i) => (
            <li key={link.id} className="nav-item">
              <Link
                to={link.path}
                onClick={() => setActive(i)}
                className={`nav-link ${link.id === activeLink ? "active" : ""}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="nav-item ml-sm-5">
            <img
              src={cart}
              style={{ height: "50px", width: "50px", cursor: "pointer" }}
              alt="cart"
              title="Cart"
              className="cart-icon snipcart-checkout"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
