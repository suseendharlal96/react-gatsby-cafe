import { graphql } from "gatsby";

export const CoffeeItemFragment = graphql`
  fragment CoffeeItemFragment on contentfulCoffeeItem {
    title
    id
    price
    image {
      fluid {
        ...GatsbyContentfulFluid
      }
    }
  }
`;
