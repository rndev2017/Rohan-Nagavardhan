export default function SkillChip(props) {
    return (
        <div className="flex justify-center items-center font-medium py-1 px-2 bg-blue-100 rounded-full text-blue-500">
            <div className="text-sm font-normal leading-none max-w-full flex-initial">{props.name}</div>
        </div>
    )
}