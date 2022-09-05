import Footer from './Footer.js'
import NavBar from './NavBar.js'

let accounts = [
    {name: "linkedin", href:"https://www.linkedin.com/in/rohan-s-n/"},
    {name: "github", href:"https://www.github.com/rndev2017"},
    {name: "twitter", href:"https://www.twitter.com/RohanNagavardh1"}
]

let links = [
    {name: "home", href:"/"},
    {name: "tools", href:"/tools"},
    {name: "blog", href:"/blog"},
]

export default function Layout({ children }) {
    return (
        <div className="space-y-6 px-10 md:px-20 lg:px-36 py-2 md:py-6 lg:py-16">
            <NavBar links={links}/>
            {children}
            <Footer socialAccounts={accounts} />
        </div>
    )
}