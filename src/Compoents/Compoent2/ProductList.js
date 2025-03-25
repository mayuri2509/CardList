import React, { Component } from "react";
import Filter from "./Filter";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      categories: [],
      currentPage: 1,
      productsPerPage: 10,
      selectedCategory: "",
      sortOption: "",
    };
  }

  componentDidMount() {
    fetch("https://dummyjson.com/products?limit=500")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ products: data.products, filteredProducts: data.products })
      );

    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }

  handleCategoryChange = (categorySlug) => {
    const { products, sortOption } = this.state;
    let filteredProducts =
      categorySlug !== ""
        ? products.filter((product) => product.category === categorySlug)
        : products;

    filteredProducts = this.sortProducts(filteredProducts, sortOption);
    this.setState({ selectedCategory: categorySlug, filteredProducts, currentPage: 1 });
  };

  handleSortChange = (sortOption) => {
    this.setState({ sortOption }, this.applySorting);
  };

  sortProducts = (products, sortOption) => {
    let sortedProducts = [...products];

    if (sortOption === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-asc") {
      sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "rating-desc") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    return sortedProducts;
  };

  applySorting = () => {
    const { filteredProducts, sortOption } = this.state;
    const sortedProducts = this.sortProducts(filteredProducts, sortOption);
    this.setState({ filteredProducts: sortedProducts });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { filteredProducts, currentPage, productsPerPage, categories, sortOption } = this.state;
    const sortedProducts = this.sortProducts(filteredProducts, sortOption);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayedProducts = sortedProducts.slice(startIndex, endIndex);

    return (
      <div> 
     
        <div className="filter">
          <Filter
            categories={categories}
            onCategoryChange={this.handleCategoryChange}
            onSortChange={this.handleSortChange}
            sortOption={sortOption}
          />
        </div>

        <div className="parent">
            
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div key={product.id} className="child">
                <h3>{product.title}</h3>
                <img src={product.thumbnail} alt={product.title} width="170" />
                <p>Rating: {product.rating}</p>
                <p>Price: ${product.price}</p>
                <p id="desp">{product.description}</p>
              </div>
            ))
          ) : (
            <p> Loding product.....</p>
          )}
        </div>

        <div className="container">
          <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array(Math.ceil(filteredProducts.length / productsPerPage))
            .fill()
            .map((_, i) => (
              <button
                style={{ backgroundColor: currentPage === i + 1 ? "green" : "grey" }}
                key={i}
                onClick={() => this.handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          <button
            onClick={() => this.handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default ProductList;
