import SkillChip from './components/SkillChip'

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
        <div className="flex flex-col items-center justify-start text-gray-600">
            <p className="uppercase tracking-widest text-blue-500 font-medium">Skills</p>
            <div className="mt-5">
                <div className="flex flex-wrap sm:max-w-xs bg-gray-100 p-6 rounded-xl">
                    {skills.map((skill) => {
                            return (
                                <div className="m-2">
                                    <SkillChip name={skill}/>
                                </div>
                            )
                    })}
                </div>
            </div>
        </div>
    )
}