export default function Button({onClick, className, children}){
    return(
    <>
        <button onClick={onClick} className={className + " rounded-xl button-shadow cursor-pointer py-1 px-2"}>{children}</button>
    </>
    )
}