const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// const remark = require(`remark`)
// const html = require(`remark-html`)
// const dateformat = require(`dateformat`)
// const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
// // const { makeBlogPath } = require(`./src/utils`)
// const {PruebaParams} = require("./src/components/PruebaParams.tsx");
// exports.createPages = async ({ actions, graphql }) => {
//   const { data } = await graphql(`
//     query {
//       cms {
//         blogPosts(where: { status: PUBLISHED }) {
//           id
//           createdAt
//           slug
//         }
//       }
//     }
//   `)

//   data.cms.blogPosts.forEach((blog, i) => {
//     actions.createPage({
//       path: `/${i}`,
//       component: path.resolve(`./src/components/blog-post.js`),
//       context: {
//         blogId: blog.id,
//       },
//     })
//   })
// }
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const PruebaParams = path.resolve("src/components/PruebaParams.tsx");
  const router = [
    {
      routes: "Madrid",
      context: {
        id: "Madrid"
      }
    },
    {
      routes: "Barcelona",
      context: {
        id: "Barcelona"
      }
    },
    {
      routes: "Berlin",
      context: {
        id: "Berlin"
      }
    }
  ];
  createPage({
    path: "/prueba/pepe",
    component: PruebaParams,
    context: {
      id: "Prueba"
    }
  });
  router.forEach(({ routes, context }) => {
    createPage({
      path: `/ciudad/${routes}`,
      component: PruebaParams,
      context
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

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
