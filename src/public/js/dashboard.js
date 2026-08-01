import getProfile  from "./profile.api.js";

window.addEventListener("DOMContentLoaded", async () => {
    const user = await getProfile();

    document.getElementById("nameUser").textContent = user.name;
})