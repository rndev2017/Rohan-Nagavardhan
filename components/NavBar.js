function NavBarItem({ link }) {
    return (
        <a 
            href={link.href}
            className="font-mono font-medium text-slate-800 hover:font-semibold tracking-light">{link.name}
        </a>
    )
}


function NavBar({ links }) {
    return (
        <div className="space-x-4 md:space-x-6 lg:space-x-8 md:text-lg lg:text-xl">
            {links.map((link, i) => {
                return <NavBarItem key={i} link={link} />
            })}
        </div>
    )
}

export default NavBar;