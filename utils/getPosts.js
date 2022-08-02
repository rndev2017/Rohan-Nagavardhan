import fs from "fs";
import path from "path";
import matter from "gray-matter";

const getPosts = () => {
  const files = fs.readdirSync(path.join("posts"));
  const postsData = files.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const contents = fs.readFileSync(
      path.join(`posts/${slug}.mdx`),
      "utf8"
    );
    const { data } = matter(contents);
    return {
      slug,
      data,
    };
  });

  return postsData;
};

export default getPosts;