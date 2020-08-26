import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BackgroundImg from "../components/BackgroundImg";

const singleProduct = ({ data, pageContext }) => {
  const { slug } = pageContext;
  return (
    <Layout>
      <SEO title={slug} />
      <BackgroundImg img={data.product.image.fluid} title={data.product.title} />
      <div className="col-10 col-sm-8 col-md-6 col-lg-4  mx-auto my-3">
        <div className="card" style={{ minHeight: "100%" }}>
          <div className="card-body text-center">
            <h6>{data.product.title}</h6>
            <h6>${data.product.price}</h6>
            <button
              className="btn btn-yellow mt-3 text-capitalize snipcart-add-item"
              data-item-id={data.product.id}
              data-item-name={data.product.title}
              data-item-price={data.product.price}
              data-item-image={data.product.image.fluid.src}
              data-item-url="https://agape-cafe.netlify.app/"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const productQuery = graphql`
  query($slug: String!) {
    product: contentfulCoffeeProducts(fields: { slug: { eq: $slug } }) {
    ...CoffeeProductFragment 
    }
  }
`;

export default singleProduct;
