function DownloadIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-download" width={props.width} height="props.width" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <polyline points="9 14 12 17 15 14" />
        </svg>
    )
}

export default function DownloadButton(props) {
    return (
        <a href="./documents/Rohan_Nagavardhan.pdf" download="Rohan_Nagavardhan">
            <button className="hover:scale-105 hover:bg-black hover:transition hover:ease-in-out hover:duration-500 
                py-4 flex flex-row justify-center items-center rounded-full bg-gray-900">
                <span className="pr-2 pl-12"><DownloadIcon height="19" width="19"/></span>
                <p className="tracking-widest text-white pr-12">{props.buttonText}</p>
            </button>
        </a>
    )
}

