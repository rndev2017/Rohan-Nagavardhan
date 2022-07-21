import Head from "next/head"
import Layout from "../components/Layout"

function Blog() {
    return (
        <Layout>
            <Head>
                <title>Rohan Nagavardhan | Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <p className='text-lg md:text-xl lg:text-2xl font-semibold pb-px'>Under Construction 🚧</p>
            </div> 
        </Layout>
    )
}

export default Blog