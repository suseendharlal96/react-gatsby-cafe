import React from "react";

import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import SEO from "../components/seo";
import Title from "../components/Title";
import Layout from "../components/layout";
import slugify from "../util/slugify";

const SingleCategory = ({ data, pageContext }) => {
  const { category } = pageContext;
  return (
    <Layout>
      <section className="py-5">
        <div className="container">
          <Title title={category} />
          <SEO title={category} />
          <div className="row">
            {data &&
              data.products.nodes.map((product) => (
                <div className="col-10 col-sm-8 col-md-6 col-lg-4  mx-auto my-3">
                  <div className="card" style={{ minHeight: "100%" }}>
                    <div style={{ maxHeight: "426px" }}>
                      <Link to={`/menu/${slugify(product.title)}`}>
                        <Img
                          fluid={product.image.fluid}
                          className="card-img-top"
                        />
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
        </div>
      </section>
    </Layout>
  );
};

export const data = graphql`
  query($category: String!) {
    products: allContentfulCoffeeItem(
      filter: { category: { in: [$category] } }
    ) {
      nodes {
        id
        title
        price
        image {
          fluid(maxHeight: 250, maxWidth: 350) {
            ...GatsbyContentfulFluid
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default SingleCategory;
