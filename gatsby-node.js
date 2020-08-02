const path = require("path");

const slugify = require("./src/util/slugify");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (
    node.internal.type === "ContentfulCoffeeItem" ||
    node.internal.type === "ContentfulCoffeeProducts"
  ) {
    const slugTitle = slugify(node.title);
    createNodeField({
      node,
      name: "slug",
      value: slugTitle,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const template = {
    singleMenu: path.resolve("src/templates/singleMenu.js"),
    singleCategory: path.resolve("src/templates/singleCategory.js"),
    singleProduct: path.resolve("src/templates/singleProduct.js"),
  };

  const { data } = await graphql(`
    {
      menu: allContentfulCoffeeItem {
        nodes {
          category
          fields {
            slug
          }
        }
      }
      products: allContentfulCoffeeProducts {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);

  if (data) {
    const items = data.menu.nodes;
    items.forEach((item) => {
      createPage({
        path: `/menu/${item.fields.slug}`,
        component: template.singleMenu,
        context: { slug: item.fields.slug },
      });
    });

    const products = data.products.nodes;
    products.forEach((product) => {
      createPage({
        path: `/product/${product.fields.slug}`,
        component: template.singleProduct,
        context: { slug: product.fields.slug },
      });
    });

    const categories = [];
    items.forEach((item) => {
      categories.push(item.category.toLowerCase());
    });
    const uniqueCategories = [...new Set(categories)];
    uniqueCategories.forEach((category) => {
      createPage({
        path: `/category/${category}`,
        component: template.singleCategory,
        context: {
          category,
        },
      });
    });
  }
};
