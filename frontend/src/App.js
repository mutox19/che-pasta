import jwt_decode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Nav/Header";
import PrivateRoute from "./Components/Private-Route/PrivateRoute";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import HomePage from "./Pages/Homepage/HomePage";
import Login1 from "./Pages/Login/Login1";
import Register1 from "./Pages/Register/Register1";
import ProductScreen from "./Screens/ProductScreen";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  //let dispatch = useDispatch();
  ////const {user, cart} = useSelector((state) => ({...state}));
  const openMenu = () => {
    if (localStorage.getItem("email") === "admin@chepasta.com") {
      document.querySelector(".admin_sidebar").classList.add("open");
    } else {
      document.querySelector(".sidebar").classList.add("open");
    }
  };
  const closeMenu = () => {
    document.querySelector(".admin_sidebar").classList.remove("open");
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="grid-container">
          <Header />
          <aside className="sidebar">
            <h3> Productos</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>
              x
            </button>
            <ul>
              <li>
                <a href="/">Pastas Frescas</a>
              </li>

              <li>
                <a href="/">Cocida</a>
              </li>
              <li>
                <a href="/">Pastelería</a>
              </li>

              <li>
                <a href="/">Postres</a>
              </li>
            </ul>
            <h3> La Empresa</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>
              x
            </button>
            <ul>
              <li>
                <a href="index.html">Nosotros</a>
              </li>
              <li>
                <a href="index.html">Novedades</a>
              </li>
            </ul>
            <h3> Perfil</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>
              x
            </button>
            <ul>
              <li>
                <Link to={"/register"}>Registrate</Link>
              </li>
              <li>
                <a href="index.html">Ayuda</a>
              </li>
            </ul>
          </aside>
          <aside className="admin_sidebar">
            <h3>Dashboard</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>
              x
            </button>
            <ul>
              <li>
                <Link to={"/orders"}>Orders</Link>
              </li>
            </ul>
          </aside>
          <main className="main">
            <div className="content">
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/" exact component={HomePage} />
              <Switch>
                <Route exact path="/login" component={Login1} />
                <Route exact path="/register" component={Register1} />
                <Route exact path="/carts" component={Cart} />
                {/*<Route exact path='/orders' component={OrderScreen}/> */}
                <Route exact path="/checkout" component={Checkout} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </main>
          <footer className="footer">
            Che Pasta! | Lima 775 - C1073AAO, Buenos Aires, Argentina | © Todos
            los derechos Reservados
          </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
