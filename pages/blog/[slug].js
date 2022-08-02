import { MDXRemote } from "next-mdx-remote";
import getPost from "../../utils/getPost";
import getPosts from "../../utils/getPosts";
import { serialize } from "next-mdx-remote/serialize";

function Post({ data, content }) {
  return (
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">{data.title}</h1>
      <time className="text-gray-500 italic">{data.date}</time>
      <p className="prose">
        <MDXRemote {...content} />
      </p>
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
  const mdxSource = await serialize(post.content);
  return {
    props: {
      data: post.data,
      content: mdxSource,
    },
  };
};