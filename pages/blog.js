import Head from "next/head"
import Preview from "../components/Preview";
import getPosts from "../utils/getPosts"


function Blog({ posts }) {
    return (
        <>
            <Head>
                <title>Rohan Nagavardhan | Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {posts && <div>
                {posts.map((post) => (
                    <Preview
                        key={post.slug}
                        title={post.data.title}
                        date={post.data.date}
                        description={post.data.description}
                        slug={post.slug}
                    />
                ))}
            </div>}
            {!posts && <p className="font-mono">no posts :(</p>}
        </>
    )
}

export const getStaticProps = () => {
    const posts = getPosts();

    return {
        props: {
            posts,
        },
    };
};

export default Blog