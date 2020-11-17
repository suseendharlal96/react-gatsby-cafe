import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import Pagination from "./Pagination";
import slugify from "../util/slugify";

const Category = ({ products, totalCount, tag, currentPage }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column",width:'100%',alignItems:'center' }}>
      {totalCount > 1 && (
        <Pagination
          tag={tag}
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / 1)}
        />
      )}
      {products &&
        products.map((product, index) => (
          <div
            key={index}
            style={{ display: "flex" }}
          >
            <div className="card" style={{ minHeight: "100%" }}>
              <div style={{ maxHeight: "426px" }}>
                <Link to={`/menu/${slugify(product.title)}`}>
                  <Img fluid={product.image.fluid} className="card-img-top" />
                </Link>
                <div className="card-body text-center">
                  <Link to={`/menu/${slugify(product.title)}`}>
                    <h6>{product.title}</h6>
                  </Link>
                  <h6>${product.price}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Category;
