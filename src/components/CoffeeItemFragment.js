import { graphql } from "gatsby";

export const CoffeeItemFragment = graphql`
  fragment CoffeeItemFragment on ContentfulCoffeeItem {
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
