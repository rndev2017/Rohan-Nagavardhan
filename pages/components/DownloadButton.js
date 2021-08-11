function DownloadIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-download" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
        <a href="./documents/resume.pdf" download="Rohan_Nagavardhan">
            <button className="flex flex-row justify-center py-3 px-5 rounded-full hover:bg-gray-700 bg-gray-600">
                <span className="pr-2"><DownloadIcon/></span>
                <p className="text-white pr-2">{props.buttonText}</p>
            </button>
        </a>
    )
}

