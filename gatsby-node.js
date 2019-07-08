const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  


  const docPage = path.resolve('./src/templates/doc-page.tsx');
  const blogPost = path.resolve('./src/templates/blog-post.tsx');

  const allMarkdown = await graphql(`
   {
     allFile(filter: {sourceInstanceName: {eq: "website"}}) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
  `);

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors); // eslint-disable-line no-console
    throw Error(allMarkdown.errors);
  }

  console.log(docPage)
  console.log(allMarkdown.data.allFile.edges[0].node.childMarkdownRemark)
  allMarkdown.data.allFile.edges.forEach(({ node }) => {
    const { slug } = node.childMarkdownRemark.fields;
    
    let template = docPage;
    
    if (slug.includes('blog/')) {
      template = blogPost;
    }
    
    createPage({
      path: slug,
      component: template,
      context: {
        slug,
      },
    });
  });






  const Home = path.resolve("src/components/Home/index.tsx");
  createPage({
    path: "es",
    component: Home,
    context:{
      language: "es"
    }
  })

  const PruebaParams = path.resolve("src/components/PruebaParams.tsx");
  // const router = [
  //   {
  //     routes: "Madrid",
  //     context: {
  //       id: "Madrid"
  //     }
  //   },
  //   {
  //     routes: "Barcelona",
  //     context: {
  //       id: "Barcelona"
  //     }
  //   },
  //   {
  //     routes: "Berlin",
  //     context: {
  //       id: "Berlin"
  //     }
  //   }
  // ];

  const router = await graphql(`
    query {
      footer: file(relativePath: { regex: "/(Footer)/" }) {
        childMarkdownRemark {
          frontmatter {
            locations
          }
        }
      }
    }
  `)
  console.log(router.data.footer.childMarkdownRemark.frontmatter.locations)
  //.footer.childMarkdownRemark.frontmatter.campus;

  router.data.footer.childMarkdownRemark.frontmatter.locations.forEach((name) => {
    createPage({
      path: `/es/ciudad/${name}`,
      component: PruebaParams,
      context:{
        language: "es"
      }
    });
  });



  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              language
              course
              course_code
              test_obj {
                test_level1_1
                test_level1_2
              }
            }
          }
        }
      }
    }
  `);
  const Courses = path.resolve("src/templates/courses.tsx");
  

  const result = data.allMarkdownRemark.edges
                .reduce((acc, {node}) => {
                        const language = node.frontmatter.language;
                        node.frontmatter.courseId = node.id
                        return (language in acc ? 
                          acc[language].push(node.frontmatter) :
                          acc[language] = [node.frontmatter]
                        ) && acc}
                , {})


  const exist = ({has, id, result, course }) => {
    if(result) {
      course[has] = true;
      course[id] = result.courseId
    } else {
      course[has] = false
    }
  }
  
  Object.values(result).forEach( language => {
    language.forEach( (course, index ) => {
      exist({has:"hasPrevious", id:"previousId", "result":language[index - 1], course})
      exist({has:"hasNext", id:"nextId", "result":language[index + 1], course})
      createPage({
            path: `${course.language}/course/${course.course_code}`,
            component: Courses,
            context: {
              courseId: course.courseId,
              previousId: course.previousId, 
              hasPrevious: course.hasPrevious, 
              nextId: course.nextId, 
              hasNext: course.hasNext,
              language: course.language
            }
          });
    })
  })

  // result.forEach(({ course_code, courseId , previousId, hasPrevious, nextId, hasNext, language}) => {
  //   createPage({
  //     path: `${language}/course/${course_code}`,
  //     component: Courses,
  //     context: {
  //       courseId,
  //       previousId, 
  //       hasPrevious, 
  //       nextId, 
  //       hasNext,
  //       language
  //     }
  //   });
  // });
};

const pad = n => (n >= 10 ? n : `0${n}`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    const { relativePath } = getNode(node.parent);

    let slug = value;

    if (relativePath.includes('blog/')) {
      const date = new Date(node.frontmatter.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const filename = path.basename(relativePath, '.md');
      slug = `/blog/${year}/${pad(month)}/${filename}`;

      createNodeField({
        node,
        name: 'date',
        value: date.toJSON(),
      });
    }

    // used for doc posts
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    // used to create GitHub edit link
    createNodeField({
      node,
      name: 'path',
      value: relativePath,
    });
  }
  
};


// exports.sourceNodes = ({ actions }) => {
//   const { createTypes } = actions
  // const typeDefs = `
  //   type MarkdownRemark implements Node {
  //     frontmatter: Frontmatter
  //   }
  //   type Frontmatter {
  //     tags: [String!]!
  //   }
  // `
  // createTypes(typeDefs)
// };

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeHeader = `
    type HeaderMd implements Node @dontInfer{
      text: String
    }
  `;
  createTypes(typeHeader);

  const types = `
  type MarkdownRemark implements Node {
    frontmatter: Frontmatter
  }
  type Frontmatter {
    tags: [String!]!
  }
`
createTypes(types)

  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        header: {
          type: "HeaderMd",
          resolve: (source, args, context, info) => {
            // If we were linking by ID, we could use `getNodeById` to
            // find the correct author:
            console.log("----------------------------------------");
            return context.nodeModel.getNodeById({
              id: source.header,
              type: "HeaderMd",
            })
            // But since we are using the author email as foreign key,
            // we can use `runQuery`, or simply get all author nodes
            // with `getAllNodes` and manually find the linked author
            // node:
            return context.nodeModel
              .getAllNodes({ type: "HeaderMd" })
              .find(author => author.text === source.header)
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Frontmatter: {
      header: {
        resolve(source, args, context, info) {
          return context.nodeModel.getNodeById({
            id: source.header,
            type: "HeaderMd",
          })
        },
      },
    },
  }
  createResolvers(resolvers)
}
// exports.createResolvers = ({
//   actions,
//   cache,
//   createNodeId,
//   createResolvers,
//   store,
//   reporter,
// }) => {
//   const { createNode } = actions
//   createResolvers({
//     GraphCMS_BlogPost: {
//       createdAt: {
//         type: `String`,
//         resolve(source, args, context, info) {
//           return dateformat(source.date, `fullDate`)
//         },
//       },
//       post: {
//         resolve(source, args, context, info) {
//           return remark()
//             .use(html)
//             .processSync(source.post).contents
//         },
//       },
//     },
//     GraphCMS_Asset: {
//       imageFile: {
//         type: `File`,
//         // projection: { url: true },
//         resolve(source, args, context, info) {
//           return createRemoteFileNode({
//             url: source.url,
//             store,
//             cache,
//             createNode,
//             createNodeId,
//             reporter,
//           })
//         },
//       },
//     },
//   })
// }
