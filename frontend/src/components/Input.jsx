export default function Input({id, name, label, type, className}){
    return <>
        <div className={className + " flex flex-col"}>
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} id={id} className={"w-full rounded-lg mb-2 bg-transparent border-2 py-1 px-3 border-white focus:border-blue-300 focus:outline-none"}/>
        </div>
    </>
}