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
    paginationCategory: path.resolve("src/templates/paginationCategory.js"),
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
    const allCategories = {};
    items.forEach((item) => {
      categories.push(item.category.toLowerCase());
      const uniqueCategories = [...new Set(categories)];

      uniqueCategories.forEach((category) => {
        createPage({
          path: `/category/${slugify(category)}`,
          component: template.singleCategory,
          context: {
            category,
          },
        });
      });

      allCategories[item.category] = (allCategories[item.category] || 0) + 1;
      if (allCategories[item.category] > 1) {
        const categoryPerPage = 1;
        const totalPages = Math.ceil(
          allCategories[item.category] / categoryPerPage
        );
        Array.from({ length: totalPages }).map((_, index) => {
          const currentPage = index + 1;
          if (index === 0) {
            return;
          } else {
            createPage({
              path: `/category/${slugify(item.category)}/${currentPage}`,
              component: template.paginationCategory,
              context: {
                currentPage,
                totalPages,
                tag: item.category,
                limit: categoryPerPage,
                skip: index * categoryPerPage,
              },
            });
          }
        });
      }
    });
  }
};
