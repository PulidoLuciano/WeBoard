import Input from "../components/Input";
import Button from "../components/Button";

export default function Account({user}){
    
    async function sendProtectForm(event){
        event.preventDefault();
        let data = {
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        }
        let response = await fetch(`http://${import.meta.env.VITE_BACKENDURL}/users/protect`, {
            method: "PUT",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("credentials"),
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data),
        });
        response = await response.json();
        location.href("/");
    }

    async function sendPhotoForm(event){
        event.preventDefault();
        let data = new FormData(event.target);
        let response = await fetch(`http://${import.meta.env.VITE_BACKENDURL}/users/photo`, {
            method: "PUT",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("credentials"),
            },
            body: data,
        });
        response = await response.json();
    }

    async function sendChangePasswordForm(event){
        event.preventDefault();
        let data = {
            oldPassword: event.target.oldPassword.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        }
        let response = await fetch(`http://${import.meta.env.VITE_BACKENDURL}/users/password`, {
            method: "PUT",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("credentials"),
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data),
        });
        if(response.ok)
            event.target.reset();
        response = await response.json();
        console.log(response);
    }

    return (
        <>
            <h1 className="px-3 max-w-4xl md:mx-auto">Account</h1>
            <section className="px-3 max-w-4xl md:mx-auto">
               <h3>Protect username</h3>
               {
                (user.email) ?
                <p>This username is already verified</p>
                :
                <form action="" onSubmit={sendProtectForm}>
                    <Input label={"E-mail"} id={"email"} type={"email"} name={"email"}></Input>
                    <Input label={"Password"} id={"password"} type={"password"} name={"password"}></Input>
                    <Input label={"Confirm password"} id={"confirmPassword"} type={"password"} name={"confirmPassword"}></Input>
                    <Button className={"mt-3"}>Submit</Button>
                </form> 
               }
            </section>
            <section className="p-3 max-w-4xl md:mx-auto">
               <h3>Change Photo</h3>
               {
                (user.email) ?
                <form action="" onSubmit={sendPhotoForm}>
                    <Input label={"Upload your file (png, jpg, webp, jpeg)"} type={"file"} name={"profilePhoto"} id={"profilePhoto"}></Input>
                    <Button className={"mt-3"}>Submit</Button>
               </form>
               :
               <p>You need a protected username in order to change your photo</p>
               }
            </section>
            <section className="p-3 max-w-4xl md:mx-auto">
                <h3>Change password</h3>
                {
                    (user.email) ?
                    <form action="" onSubmit={sendChangePasswordForm}>
                        <Input label={"Old Password"} id={"oldPassword"} type={"password"} name={"oldPassword"}></Input>
                        <Input label={"Password"} id={"password"} type={"password"} name={"password"}></Input>
                        <Input label={"Confirm password"} id={"confirmPassword"} type={"password"} name={"confirmPassword"}></Input>
                        <Button className={"mt-3"}>Submit</Button>
                    </form>
                    :
                    <p>Using an unprotected username</p>
                }
            </section>
        </>
    )
}