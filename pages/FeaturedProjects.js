import ProjectTile from '../components/ProjectTile';
import { featuredProjects } from './Projects';

export default function FeaturedProjects() {
    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-flow-col grid-cols-1 grid-rows-4 px-5 md:grid-cols-2 md:grid-rows-2 md:gap-5">
                {featuredProjects.map((project) => {
                        return <ProjectTile project={project}/>
                })}
            </div>
        </div>
    )
}