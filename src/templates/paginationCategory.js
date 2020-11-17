import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Title from "../components/Title";
import Layout from "../components/layout";
import Category from "../components/Category";

const paginationCategory = ({ data, pageContext }) => {
  const { tag, currentPage, totalPages } = pageContext;
  const totalCount = data.products.totalCount;
  return (
    <Layout>
      <section className="py-5">
        <div className="container">
          <Title title={tag} />
          <SEO title={tag} />
          <div className="row">
            {totalCount > 1 ? (
              <Category
                tag={tag}
                currentPage={currentPage}
                totalCount={totalCount}
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

export const paginationCategoryQuery = graphql`
  query($tag: String!, $limit: Int!, $skip: Int!) {
    products: allContentfulCoffeeItem(
      filter: { category: { in: [$tag] } }
      limit: $limit
      skip: $skip
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

export default paginationCategory;
