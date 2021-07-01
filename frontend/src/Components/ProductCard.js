import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({ allProducts: this.props.products });
    }
  }
  componentDidMount() {
    this.setState({ allProducts: this.props.products });
  }
  render() {
    return (
      <Row className="products">
        {this.state.allProducts.map((product) => {
          return (
            <Col xs={12} md={3} className="product" key={product._id}>
              <div className="product-name">
                <Link
                  to={{
                    pathname: `/product/${product._id}`,
                    state: product,
                  }}
                >
                  <img
                    src={require(`../images/${product.image}`).default}
                    alt={product.image}
                  />
                </Link>
                <Link to={"/product/" + product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {product.rating} Stars ({product.numReviews} Reviews)
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: console.log(state),
  };
};

export default connect(mapStateToProps)(ProductCard);
