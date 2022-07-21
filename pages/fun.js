import Head from "next/head"
import Image from "next/image"
import Layout from "../components/Layout"

let images = [
    {
        header: "Bread Making",
        subHeader: "I love to make all sorts of bread, I mostly make pizza though",
        images: [
            {path: "/images/bread1.jpg"},
            {path: "/images/bread2.jpg"},
            {path: "/images/bread3.jpg"},
            {path: "/images/bread4.jpg"},
        ]
    },
    {
        header: "Michigan vs. Washington @ The Big House",
        subHeader: "College Football is 🔥🔥🔥",
        images: [
            {path: "/images/cfb1.jpg"},
            {path: "/images/cfb2.jpg"},
            {path: "/images/cfb3.jpg"},
            {path: "/images/cfb4.jpg"},
            {path: "/images/cfb5.jpg"},
        ]
    },
]

function Section({ imgData }) {
    return (
        <div className="py-4">
            <div>
                <p className='text-lg md:text-xl lg:text-2xl font-semibold pb-px'>{imgData.header}</p>
                <p className='font-mono md:text-lg lg:text-xl text-slate-500 pb-2'>{imgData.subHeader}</p>
            </div>
            <div className="grid grid-cols-1 place-items-center md:grid-cols-2 md:place-items-start gap-y-4 md:gap-4 py-1">
                {imgData.images.map((item, i) => {
                    return (<img className='rounded-xl shadow-lg object-cover' src={item.path} />)
                })}
            </div>
        </div>
    )
}

function FunPage() {
    return (
        <Layout>
            <Head>
                <title>Rohan Nagavardhan | Interests </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='max-w-3xl flex flex-wrap'>
                {images.map((imgData, i) => {
                    return (<Section key={i} imgData={imgData} />)
                })}
            </div>
        </Layout>
    )
}

export default FunPage