import React, { useState, useEffect } from "react";

import Img from "gatsby-image";

import Title from "./Title";

const Menu = ({ items }) => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setfilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (items) {
      setAllItems(items);
      setfilteredItems(items);
      getCategories(items);
    }
  }, []);

  const getCategories = (items) => {
    let tempItems = items.map((item) => {
      return item.category.toLowerCase();
    });
    let categories = ["All", ...new Set(tempItems)];
    setCategories(categories);
  };

  const handleFilter = (category) => {
    const a = [...allItems];
    let filtered = a;
    if (category.toLowerCase() !== "all") {
      filtered = a.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    } else {
    }
    setfilteredItems(filtered);
  };

  let coffeeItems =
    items.length > 0 ? (
      <section className="menu py-5">
        <div className="container">
          <Title title="our menu" />
          <div className="row mb-5">
            <div className="col-10  mx-auto text-center">
              {categories.map((category, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    className="btn btn-yellow text-capitalize m-3"
                    onClick={() => {
                      handleFilter(category);
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="row">
            {filteredItems.map((node) => {
              return (
                <div
                  key={node.id}
                  className="col-11 col-md-6 my-2 d-flex mx-auto"
                >
                  <div>
                    <Img fixed={node.image.fixed} />
                  </div>

                  <div className="flex-grow-1 px-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0">{node.title}</h6>
                      <h6 className="text-yellow mb-0">${node.price}</h6>
                    </div>

                    <p className="text-muted">
                      <small>{node.description.description}</small>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    ) : (
      <section className="menu py-5">
        <div className="container">
          <Title title="best of our menu" />
          <div className="row">
            <div className="col-10 col-6 mx-auto text-center text-capitalize">
              <h1>there are no items to display</h1>
            </div>
          </div>
        </div>
      </section>
    );
  return coffeeItems;
};

export default Menu;
