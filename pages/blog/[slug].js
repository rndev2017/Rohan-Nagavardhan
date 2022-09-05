import { MDXRemote } from "next-mdx-remote";
import getPost from "../../utils/getPost";
import getPosts from "../../utils/getPosts";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { Prism } from "@mantine/prism";

const components = { Prism }

function Post({ data, content }) {
  return (
    <div>
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">{data.title}</h1>
      <p className=" text-gray-500 italic text-lg md:text-xl my-2">{data.date}</p>
      <article 
        className="prose dark:prose-invert prose-neutral prose-headings:my-3 lg:prose-lg 
          lg:prose-headings:my-3 mt-6 dark:prose-a:text-sky-500 prose-a:text-sky-600 
            marker:text-neutral-700 dark:marker:text-neutral-400
           prose-img:rounded-lg prose-img:shadow-md prose-video:rounded-lg
           prose-video:shadow-md">
        <MDXRemote
          components={components}
          {...content} />
      </article>
    </div>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  const mdxSource = await serialize(
    post.content, {
      mdxOptions: [rehypeHighlight]
    }
  );
  return {
    props: {
      data: post.data,
      content: mdxSource,
    },
  };
};