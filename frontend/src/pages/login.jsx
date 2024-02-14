import { useEffect, useRef, useState } from "react"
import checkUserLoggedIn from "../logic/checkUserLoggedIn"
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login(){
    
    const [isRight , setIsRight] = useState(false);
    const overlayPanel = useRef(null);
    const mobileChangeButton = useRef(null);

    function sendUsernameForm(event){
        event.preventDefault();
        let user = {
            username: event.target.username.value
        }
        let response = fetch("http://localhost:3000/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (res) => {
            let data= await res.json();
            localStorage.setItem("credentials", data.token);
            location.replace("/");
        }).catch(async (err) => {
            let reason = await err.json();
            console.log(reason);
        });
    }

    async function sendProtectedForm(event){
        event.preventDefault();
        let user = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        let response = await fetch("http://localhost:3000/users/login-protected", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await response.json();
        if(!response.ok){
            console.log(data);
            return;
        }
        localStorage.setItem("credentials", data.token);
        location.replace("/");
    }

    useEffect(() => {
        if(localStorage.getItem("credentials")) location.replace("/")
    }, []);

    function changeSide(){
        overlayPanel.current.classList.toggle("translate-x-full");
        mobileChangeButton.current.classList.toggle("translate-x-full");
        if(isRight){
            overlayPanel.current.classList.replace("rounded-r-xl", "rounded-l-xl");
            mobileChangeButton.current.classList.replace("rounded-r-xl", "rounded-l-xl");
            setIsRight(false);
        }else{
            overlayPanel.current.classList.replace("rounded-l-xl", "rounded-r-xl");
            mobileChangeButton.current.classList.replace("rounded-l-xl", "rounded-r-xl");
            setIsRight(true);
        }
    }

    return(
    <>
        {/*PC*/}
        <section className="relative min-h-[500px] mx-auto my-16 flex bg-slate-900 w-2/3 max-w-5xl rounded-xl shadow-md shadow-gray-800 max-md:hidden">
            <section className="absolute h-full w-1/2 bg-green-800 transition-all rounded-l-xl flex items-center p-9" ref={overlayPanel}>
                {
                    (!isRight) ?
                    <div>
                        <h1>Welcome to Weboard!</h1>
                        <p>Choose an username to start playing on public rooms and with yours friends</p>
                        <p className="mt-8">Do you have a <span className=" text-green-200">protected username</span>?</p>
                        <Button onClick={changeSide} className="mt-3">Click here!</Button>
                    </div>
                    :
                    <div>
                        <h1>Welcome back player!</h1>
                        <p>Enter your data here to begin playing with your protected username</p>
                        <p className="mt-8">Is it your <span className="text-green-200">first time</span> in here? Didn't you protect your username yet?</p>
                        <Button onClick={changeSide} className={"mt-3"}>Click here!</Button>
                    </div>
                }
            </section>
            <section className="p-9 my-auto w-1/2">
                <form action="" method="post" onSubmit={sendProtectedForm}>
                    <h2>Do you have a protected username?</h2>
                    <p className="mb-2">Type your data here to log in with your protected username</p>
                    <Input label={"E-mail"} type={"text"} id={"email"} name={"email"} className={"w-2/3"}></Input>
                    <Input label={"Password"} type={"password"} id={"password"} name={"password"} className={"w-2/3"}></Input>
                    <Button>Submit</Button>
                </form>
            </section>
            <section className="p-9 my-auto w-1/2">
                <form action="" method="post" onSubmit={sendUsernameForm}>
                    <h2>Pick a username</h2>
                    <p>Type your username here to pick it up.</p>
                    <p className="mb-2">You can protected it later</p>
                    <Input label={"Username"} type="text" id="usernamePC" name="username" className={"w-2/3"}></Input>
                    <Button className={"mt-2"}>Submit</Button>
                </form>
            </section>
        </section>
        {/*Mobile*/}
        <section className="relative min-h-[500px] mx-3 my-10 bg-slate-900 max-w-5xl rounded-xl shadow-md shadow-gray-800 min-[768px]:hidden">
            <section className="h-16 mt-4 w-full flex justify-center items-center">
                <div className="relative bg-slate-600 w-2/3 h-12 rounded-xl m-auto">
                    <div className="absolute bg-green-800 w-1/2 h-full rounded-l-xl flex items-center justify-center transition-transform" ref={mobileChangeButton}>
                        {
                            (!isRight) ?
                            <>
                                <p className="m-auto text-center">Username</p>
                            </>
                            :
                            <>
                                <p>Protected</p>
                            </>
                        }
                    </div>
                    <button className="w-1/2 h-full text-center z-50" onClick={changeSide}>Username</button>
                    <button className="w-1/2 h-full text-center z-50" onClick={changeSide}>Protected</button>
                </div>
            </section>
            {
                (isRight) ?
                <section className="px-9 my-auto text-center">
                    <form action="" method="post" onSubmit={sendProtectedForm}>
                        <h2>Do you have a protected username?</h2>
                        <p className="mb-2">Type your data here to log in with your protected username</p>
                        <Input label={"E-mail"} type={"text"} id={"email"} name={"email"} className={"items-center"}></Input>
                        <Input label={"Password"} type={"password"} id={"password"} name={"password"} className={"items-center"}></Input>
                        <Button className={"mt-4"}>Submit</Button>
                    </form>
                </section>
            :
                <section className="px-9 my-auto text-center">
                    <form action="" method="post" onSubmit={sendUsernameForm}>
                        <h2>Pick a username</h2>
                        <p>Type your username here to pick it up.</p>
                        <p className="mb-2">You can protected it later</p>
                        <Input label={"Username"} type="text" id="username" name="username" className={"items-center"}></Input>
                        <Button className={"mt-4"}>Submit</Button>
                    </form>
                </section>
            }
        </section>
    </>
    )
}