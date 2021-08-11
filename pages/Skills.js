function SkillChip(props) {
    return (
        <div className="py-2 px-3 text-sm md:text-base bg-blue-100 rounded-full">
            <p className="text-blue-500">
                {props.name}
            </p>
        </div>
        
    )
}

export default function Skills() {
    let skills = [
        "Python",
        "C/C++",
        "Dart",
        "JavaScript",
        "HTML/CSS",
        "MATLAB",
        "Git",
        "VSCode",
        "FastAPI",
        "Flutter",
        "PostgreSQL",
        "SQLite",
        "Linux/Unix",
        "AWS",
        "GCP",
        "Raspberry Pi",
        "Flask",
        "React"
    ]
    return (
        <div className="p-5 flex flex-col items-center justify-start text-gray-600">
            <p className="uppercase tracking-widest text-blue-500 font-medium mb-3">Skills</p>
            <div className="flex flex-wrap sm:max-w-xs bg-gray-100 p-6 rounded-xl">
                {skills.map((skill) => {
                        return (
                            <div className="p-1">
                                <SkillChip name={skill}/>
                            </div>
                        )
                })}
            </div>
        </div>
    )
}