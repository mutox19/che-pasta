import React, { Component } from "react";
import ProductCard from "../../Components/ProductCard";
import { ProductServices } from "../../_services/ProductServices";


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [],
    };
  }
  componentDidMount() {
    Promise.all([ProductServices.getAllProducts()]).then(([products]) => {
      this.setState({ allProducts: [...products.body] });
    });
  }

  render() {
    const { allProducts } = this.state;

    return (
      <>
        <ProductCard products={allProducts} />
      </>
    );
  }
}

export default HomePage;

