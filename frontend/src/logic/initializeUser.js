export default async function initializeUser(setUser){
    let token = localStorage.getItem("credentials");
    if(!token) return;
    let response = await fetch(`http://${import.meta.env.VITE_BACKENDURL}/users/login`,{
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