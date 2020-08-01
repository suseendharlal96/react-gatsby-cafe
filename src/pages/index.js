import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BackgroundImg from "../components/BackgroundImg";
import Info from "../components/Info";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "default-background.jpeg" }) {
        img: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <SEO title="Home" />
      <BackgroundImg img={data.file.img.fluid} />
      <Info />
    </Layout>
  );
};

export default IndexPage;
