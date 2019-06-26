const axios = require("axios");
const fs = require("mz/fs");
const path = require("path");

const S3_BASE_PATH =
  "http://localhost:3000/graphql?query={courses{id,name,description,pipedrive_product_code,course_code,course_editions{id,start_at,end_at,career_week_start,career_week_end,is_active,is_sold_out,showPrework,showCourse}}}";

async function fetchIndex() {
  const indexReponse = await axios(`${S3_BASE_PATH}`, {
    responseType: "json"
  });
  return indexReponse.data.data.courses;
}

async function makeFile({ name, description, pipedrive_product_code, course_code, course_editions }) {
  // const articleReponse = await axios(`${S3_BASE_PATH}/${slug}/article.md`);

  const filePath = path.join(__dirname, "src", "pages", "blog", `${course_code}.md`);
  const fileContentArray = [
    "---",
    "templateKey: blog-post",
    `course: "${name}"`,
    `course_code: ${course_code}`,
    `pipedrive_product_code: ${pipedrive_product_code}`,
    `description: "${description}"`,
    "---",
    // articleReponse.data
  ];



  
  await fs.writeFile(filePath, fileContentArray.join("\n"))
  // return new Promise ((resolve, reject) => 
  //       fs.writeFile(filePath, 
  //         fileContentArray.join("\n"), 
  //         (err) => 
  //           err ? 
  //           reject({msg:err}): 
  //           resolve({msg:"created"})));
}


async function main() {
  const index = await fetchIndex();
  console.log(index)
  index.forEach(makeFile);
  console.log("---------")

}

main();
