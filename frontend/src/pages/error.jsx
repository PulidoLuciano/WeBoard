import { Link } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";

export default function Error({error}){
    return (
        <>
            <Header></Header>
            <main className="flex flex-col items-center p-8">
                <h2>Ooops! Something bad happened</h2>
                <p>{error}</p>
                <Button className={"bg-green-800 font-bold mt-14"}><Link to={"/"}>Go to Main page</Link></Button>
            </main>
            
        </>
    )
}