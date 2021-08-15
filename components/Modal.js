import React from "react";
import styles from './Modal.module.css'
import SkillChip from "./SkillChip";
import { GitHubIcon, ExternalLinkIcon } from "./Icons";

function CloseButton(props) {
    return (
        <div className="px-2 py-1 rounded-md bg-gray-600 hover:bg-gray-800 flex flex-row">
            <span className="text-xs md:text-sm text-white">Close</span>
        </div>
    )
}

export default function Modal(props) {
    return (
        <>
            <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-5 max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*Project Thumbnail and Close Button*/}
                        <div className={styles.container}>
                            <div className="flex justify-center items-center absolute top-3 right-3 md:top-5 md:right-5">
                                {props.data.link !== null 
                                ? <a className="mr-5" 
                                    href={props.data.link}
                                    target="_blank">
                                    <ExternalLinkIcon color="#6b7280" hoverColor="#111827" height="24" width="24"/>
                                    </a> 
                                : null
                                }
                                {props.data.code !== null 
                                ? <a className="mr-10" 
                                    href={props.data.code}
                                    target="_blank">
                                        <GitHubIcon color="#6b7280" hoverColor="#111827" height="24" width="24"/>
                                    </a> 
                                : null
                                }
                                <div className="hover:cursor-pointer" onClick={() => props.close(false)}><CloseButton height="24" width="24"/></div>
                            </div>
                            
                            <img className={styles.thumbnail} src={props.data.thumbnail}/>
                        </div>
                        {/*Name and Organization along with Awards*/}
                        <div className="relative px-6 pt-2 flex-auto">
                            <p className="text-3xl font-bold tracking-wide pb-2">{props.data.name}</p>
                        </div>
                        {/* Skills */}
                        <div className="relative px-4 overflow-hidden">
                            <div className="flex flex-wrap">
                                {props.data.skills.map((skill) => {
                                    return <div className="m-1"><SkillChip name={skill}/></div>
                                })}
                            </div>
                            
                        </div>
                        {/* Description of project */}
                        <div className="relative px-6 py-10">
                            <p className=" text-gray-500 leading-relaxed">
                                {props.data.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
