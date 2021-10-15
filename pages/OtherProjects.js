import { otherProjects } from "../components/ProjectsData";
import SkillChip from "../components/SkillChip";
import ExternalLinkIcon from "../components/ExternalLinkIcon";


function Project(props) {
    return (
        <div className="p-6 max-w-2xl">
            <div className="flex flex-row items start">
                <p className="font-semi text-lg md:text-xl text-gray-900">{props.data.name}</p>
                {props.data.code !== null ?
                    <a href={props.data.code} target="_blank">
                        <ExternalLinkIcon strokeWidth="2" height="15" width="15" color="#111827" hoverColor="#3b83f6"/>
                    </a>
                    : null
                }
            </div>
            <div className="text-gray-600 text-sm md:text-base leading-relaxed py-2">
                <p>{props.data.description}</p>
                {props.data.code === null ?
                    <p className="text-xs leading-relaxed md:text-sm py-2 text-gray-400">
                        Oops... It seems like I can't make the code public for this project. 
                            If you would like to access the source code, email me at{' '}
                        <a href="mailto:rnagavar@umich.edu" target="_blank" 
                        className="hover:cursor-pointer hover:text-blue-500">rnagavar@umich.edu!</a></p>
                    : null
                }
            </div>
            {/* skill chips             */}
            <div className="flex flex-wrap mt-2">
                {props.data.skills.map((skill) => {
                    return <div className="pb-1 pr-1"><SkillChip name={skill}/></div>
                })}
            </div>

        </div>
    )
}

export default function OtherProjects() {
    return (
        <div className="flex flex-col items-center mt-5">
            {otherProjects.map((project) => {
                        return <Project data={project}/>
            })}
        </div>
    )
}

