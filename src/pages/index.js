import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BackgroundImg from "../components/BackgroundImg";
import Info from "../components/Info";
import Menu from "../components/Menu";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "coffeehome.jpg" }) {
        img: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      items: allContentfulCoffeeItem {
        nodes {
          title
          price
          image {
            fixed(height: 50, width: 50) {
              ...GatsbyContentfulFixed
            }
          }
          description {
            description
          }
          category
        }
      }
    }
  `);
  return (
    <Layout>
      <SEO title="Home" />
      <BackgroundImg img={data.file.img.fluid} />
      <Info path="/about" btnName="About us" />
      <Menu items={data.items.nodes} />
    </Layout>
  );
};

export default IndexPage;
