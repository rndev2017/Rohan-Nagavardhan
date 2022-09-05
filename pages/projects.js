import Head from "next/head"

const projects = [
    {
        header: 'Personal',
        items: []
    },
    {
        header: 'School',
        items: []
    } 
]

function ProjectsPage() {
    return (
        <>
            <Head>
                <title>Rohan Nagavardhan | Tools</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='max-w-2xl'>
                <p className='text-lg md:text-xl lg:text-2xl font-semibold pb-2'>Projects</p>
            </div>
        </>
    )
}

export default ProjectsPage