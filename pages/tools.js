import Head from "next/head";
import Layout from "../components/Layout";

let toolData = [
    {
        id: "swe",
        header: "Software Engineering",
        items: [
            { name: "C++ Reference", href: "https://en.cppreference.com/w/" },
            { name: "Python Cheat Sheet", href: "https://overapi.com/python" },
            { name: "Git Cheat Sheet", href: "https://overapi.com/git" },
            { name: "TailwindCSS Background Colors", href: "https://tailwindcss.com/docs/background-color" },
            { name: "TailwindCSS Install Page", href: "https://tailwindcss.com/docs/installation/framework-guides" },
            { name: "Nano-React-App", href: "https://tailwindcss.com/docs/installation/framework-guides" },
            { name: "FastAPI CORS", href: "https://fastapi.tiangolo.com/tutorial/cors/" },
            { name: "Flutter: Debug Keystore (Android)", href: "https://gist.github.com/henriquemenezes/70feb8fff20a19a65346e48786bedb8f" },
            { name: "Common RegEx Expressions", href: "https://uibakery.io/regex-library?ref=producthunt" },
            { name: "EECS 390 Notes (Programming Paradigms)", href: "https://eecs390.github.io/notes/" },
            { name: "Awesome Software Architecture", href: "https://awesome-architecture.com/software-architecture/" },
            { name: "Vim Adventures", href: "https://vim-adventures.com" },
            { name: "vim.so", href: "https://www.vim.so" },
            { name: "Squash, Merge, Rebase?", href: "https://matt-rickard.com/squash-merge-or-rebase"},
        ]
    },
    {
        id: "startup",
        header: "Startups",
        items: [
            { name: "Startup Growth Calculator", href: "http://growth.tlb.org/#_.eyJleHAwIjo1NjE3LCJyZXZHcm93dGgiOjAuMDU5NTQ0Njc1NDU3OTg3NTg0fQ==" },
            { name: "Job interview questions engineers should ask", href: "https://posthog.com/blog/what-to-ask-in-interviews?utm_source=pointer&utm_medium=newsletter" },
        ]
    },
    {
        id: "recruiting",
        header: "Recruiting",
        items: [
            { name: "internships.fyi", href: "https://www.levels.fyi/internships/" },
            { name: "Summer 2023 Internship List", href: "https://github.com/pittcsc/Summer2023-Internships" },
            { name: "Grokking the Coding Interview", href: "https://designgurus.org/course/grokking-the-coding-interview" },
            { name: "Grind75", href: "https://www.techinterviewhandbook.org/grind75" }
        ]
    },
    {
        id: "uiux",
        header: "UI/UX",
        items: [
            { name: "Type System Tool", href: "https://archetypeapp.com/#" },
            { name: "Google Fonts", href: "https://fonts.google.com/" },
            { name: "External Fonts in TailwindCSS", href: "https://blog.logrocket.com/how-to-use-custom-fonts-tailwind-css/" },
            { name: "Throttling vs Debouncing", href: "https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf" },
            { name: "CSS Reset Sheet", href: "https://meyerweb.com/eric/tools/css/reset/" },
            { name: "TailwindPDF", href: "https://tailwindpdf.com/?ref=producthunt" },
            { name: "Feather Icons", href: "https://feathericons.com" },
            { name: "Tabler Icons", href: "https://tablericons.com" },
            { name: "HeadlessUI", href: "https://headlessui.com" },
            { name: "Color Pallete Generator", href: "https://coolors.co/" }
        ]
    },
    {
        id: "bread",
        header: "Bread Making",
        items: [
            { name: "Pizza Dough Calculator", href: "https://www.stadlermade.com/pizza-calculator/" },
            { name: "Naan Recipe", href: "https://www.youtube.com/watch?v=vaJmZvreT0Y" },
            { name: "Joshua Weissman: NY Pizza Dough", href: "https://www.youtube.com/watch?v=jMCM9vyq-tg" }
        ]
    }
]

function Section({ sectionData }) {
    return (
        <div className="py-3">
            <SectionHeader id={sectionData.id} title={sectionData.header} className='text-lg md:text-xl lg:text-2xl font-semibold pb-2' />
            <ul role={'list'} className='marker:text-slate-800 list-disc pl-5 space-y-3 text-slate-500 md:text-lg lg:text-xl'>
                {sectionData.items.map((item, i) => {
                    return (<SectionItem key={i} name={item.name} href={item.href} />)
                })}
            </ul>
        </div>
    )
}

function SectionHeader({ id, title, className }) {
    return <p id={id} className={className}>{title}</p>
}

function SectionItem({ name, href }) {
    return (
        <li className="hover:text-slate-700">
            <a rel="noreferrer" target={'_blank'} href={href}>{name}</a>
        </li>
    )
}

function ToolsPage() {
    return (
        <>
            <Head>
                <title>Rohan Nagavardhan | Tools</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='max-w-2xl'>
                <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold my-2">Table of Contents</p>
                    <ol className="lg:text-lg">
                        {toolData.map((section, i) => (
                            <li key={i}>
                                <a
                                    href={`#${section.id}`}
                                    className="text-blue-600 hover:text-blue-500 cursor-pointer">
                                    {section.header}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
                {toolData.map((section, i) => {
                    return (<Section key={i} sectionData={section} />)
                })}
            </div>
        </>
    )
}

export default ToolsPage;