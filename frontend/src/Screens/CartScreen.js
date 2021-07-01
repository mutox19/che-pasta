import axios from "axios";
import {useState, useEffect} from "react";
import './screens.css';

/*not used */

/*
function CartScreen(props) {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/carts/list`, {
      params: {
        usuario_id: localStorage.getItem('usuario_id')
      }
    })
      .then(res => {
        setProducts(res.data.products)
      })
  }, []);

  function deleteCart(product_id) {
    axios.post(`http://localhost:8000/api/carts/delete`, {
      product_id: product_id,
      usuario_id: localStorage.getItem('usuario_id')
    })
      .then(res => {
        axios.get(`http://localhost:8000/api/carts/list`, {
          params: {
            usuario_id: localStorage.getItem('usuario_id')
          }
        })
          .then(res => {
            setProducts(res.data.products)
            console.log(res.data);
          })
      })
  }

  function addOrder() {
    // eslint-disable-next-line no-unused-vars
    for (const [i, product] of products.entries()) {
      axios.post(`http://localhost:8000/api/orders/add`, {
        usuario_id: localStorage.getItem('usuario_id'),
        product_id: product.id
      })
        .then(res => {
          console.log(res);
        })
    }
  }

  return <div>
    <ul className="products">
      {products && products.map(product =>
        <li>
          <div className="product">
            <img className="product-image" src={product.image} alt="product"/>
            <div className="product-name">
              {product.name}
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">{product.price}</div>
            <div className="product-rating">{product.rating}
              Stars ({product.numReviews} Reviews)
              <button id="button" onClick={() => deleteCart(product.id)}>X</button>
            </div>
          </div>
        </li>
      )}
    </ul>
    <button className="ordor_button" onClick={() => addOrder()}>Order</button>
  </div>

}

export default CartScreen;
*/