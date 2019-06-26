import { graphql } from "gatsby";
import Image from "gatsby-image";
import React from "react";

export default ({ data }: any) => {
  //   const blogPost = data.cms.blogPost;
  return (
    <h1>OK</h1>
    // <div>
    //   {blogPost.titleImage &&
    //     blogPost.titleImage.imageFile &&
    //     blogPost.titleImage.imageFile.childImageSharp && (
    //       <Image fixed={blogPost.titleImage.imageFile.childImageSharp.fixed} />
    //     )}
    //   <h1>{blogPost.title}</h1>
    //   <div>Posted at: {blogPost.createdAt}</div>
    //   <div dangerouslySetInnerHTML={{ __html: blogPost.post }} />
    // </div>
  );
};

// export const query = graphql`
//   query($courseId: ID!) {
//     cms {
//       blogPost(where: { id: $blogId }) {
//         title
//         createdAt
//         post
//         titleImage {
//           url
//           imageFile {
//             childImageSharp {
//               fixed {
//                 ...GatsbyImageSharpFixed
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
