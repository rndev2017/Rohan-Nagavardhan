import React from "react"

export default function EmailIcon(props) {
    const [color, setColor] = React.useState("#FFFFFF")
    return (
        <div onMouseOut={() => setColor("#FFFFFF")} onMouseOver={() => setColor("#BEBEBE")}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width={props.width} height={props.height} viewBox="0 0 24 24" stroke-width="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <polyline points="3 7 12 13 21 7" />
            </svg>
        </div>
        
    )
}