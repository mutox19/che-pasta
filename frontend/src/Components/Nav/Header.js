import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const Header = (props) => {
  let dispatch = useDispatch();
  let history = useHistory();
  const openMenu = () => {
    if (localStorage.getItem("email") === "admin@chepasta.com") {
      document.querySelector(".admin_sidebar").classList.add("open");
    } else {
      document.querySelector(".sidebar").classList.add("open");
    }
  };
  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());

    history.push("/");
  };

  const { auth, cart } = useSelector((state) => ({ ...state }));
  const logged = auth.isAuthenticated;

  return (
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>&#9776;</button>
        <Link to="/">Che Pasta!</Link>
      </div>
      <div className="header-links">
        <Row>
          <Link to={"/carts"}>{cart.length}&nbsp;Carrito</Link>
          {(() => {
            if (logged) {
              return (
                <>
                  <p className="logged-user">{auth.user.name}</p>
                  <Link onClick={onLogoutClick}>Logout</Link>
                </>
              );
            } else {
              return <Link to={"/login"}>Logueate</Link>;
            }
          })()}
        </Row>
      </div>
    </header>
  );
};

export default Header;
