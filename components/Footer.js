function FooterItem({ account }) {
    return (
        <a 
            href={account.href}
            target="_blank"
            className="font-mono font-medium text-slate-800 hover:font-semibold tracking-light">{account.name}
        </a>
    )
}


function Footer({ socialAccounts }) {
    return (
        <div className="space-x-6 md:space-x-8 lg:space-x-10 md:text-lg lg:text-xl">
            {socialAccounts.map((account, i) => {
                return <FooterItem key={i} account={account} />
            })}
        </div>
    )
}

export default Footer;