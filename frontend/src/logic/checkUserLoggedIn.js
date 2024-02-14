export default async function checkUserLoggedIn(){
    try {
        let response = await fetch("http://localhost:3000/users/login", {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("credentials"),
            }
        });
        response = await response.json();
        if(!response.error) return true;
    } catch (error) {
        return false;
    }
}