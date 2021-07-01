/*import {Link} from 'react-router-dom'
import axios from "axios";
import {useState, useEffect} from "react";

/*not used*/
/*
function HomeScreen (props){
  const [products, setProducts] = useState([]);
  console.log("thisProduct",props);
  useEffect(() => {
    setProducts(props)
  }, []);
    return <div>
        <ul className="products">
    {products && products.map(product=>
        <li>
        <div className="product">
        <Link to={'/product/'+ product.id}><img className="product-image" src={product.image} alt="product" /></Link>
          <div className="product-name">
            <Link to={'/product/'+ product.id}>{product.name}</Link>
          </div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-price">{product.price}</div>
          <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
        </div>
      </li>
    )}
  </ul></div>

}
export default HomeScreen; */