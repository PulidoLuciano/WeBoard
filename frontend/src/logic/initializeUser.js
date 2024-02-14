export default async function initializeUser(setUser){
    console.log("test")
    let token = localStorage.getItem("credentials");
    if(!token) return;
    let response = await fetch(`http://localhost:3000/users/login`,{
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("credentials"),
        }
    });
    if(!response.ok){
        localStorage.removeItem("credentials");
        setUser(null);
        return;
    }
    response = await response.json();
    setUser(response);
}