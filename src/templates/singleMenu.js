import React from "react";

import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BackgroundImg from "../components/BackgroundImg";

const singleMenu = ({ data, pageContext }) => {
  const { slug } = pageContext;
  return (
    <Layout>
      <SEO title={slug} />
      <BackgroundImg img={data.coffee.image.fluid} title={data.coffee.title} />
      <div className="col-10 col-sm-8 col-md-6 col-lg-4  mx-auto my-3">
        <div className="card" style={{ minHeight: "100%" }}>
          <div className="card-body text-center">
            <h6>{data.coffee.title}</h6>
            <h6>${data.coffee.price}</h6>
            <Link to={`/category/${data.coffee.category.toLowerCase()}`}>
              <h6>{data.coffee.category}</h6>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const menuQuery = graphql`
  query($slug: String!) {
    coffee: contentfulCoffeeItem(fields: { slug: { eq: $slug } }) {
      ...CoffeeItemFragment
      description {
        description
      }
      category
    }
  }
`;

export default singleMenu;
