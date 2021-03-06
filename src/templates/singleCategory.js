import React from "react";

import { graphql } from "gatsby";

import SEO from "../components/seo";
import Title from "../components/Title";
import Layout from "../components/layout";
import Category from "../components/Category";

const SingleCategory = ({ data, pageContext }) => {
  const { category } = pageContext;
  const totalCount = data.products?.totalCount;
  return (
    <Layout>
      <section className="py-5">
        <div className="container">
          <Title title={category} />
          <SEO title={category} />
          <div className="row">
            {totalCount > 1 ? (
              <Category
                totalCount={totalCount}
                tag={category}
                currentPage={1}
                products={data.products.nodes.slice(0, 1)}
              />
            ) : (
              <Category
                totalCount={totalCount}
                products={data.products.nodes}
              />
            )}
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
      totalCount
    }
  }
`;

export default SingleCategory;
