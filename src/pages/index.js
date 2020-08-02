import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BackgroundImg from "../components/BackgroundImg";
import Info from "../components/Info";
import Menu from "../components/Menu";
import Products from "../components/Products";
import Contact from "../components/Contact";

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
          id
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
          fields{
            slug
          }
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
      <Products />
      <Contact />
    </Layout>
  );
};

export default IndexPage;
