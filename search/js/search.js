const form = document.querySelector("#search_form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchvalue = document
        .querySelector("#search_input")
        .value.toLowerCase();
    document.querySelector(".container").innerHTML = "";
    searchUsers(searchvalue);
});
async function searchUsers(searchvalue) {
    console.log("function running:", searchvalue);
    let i = 0;
    let end = true;
    const results = [];
    while (end) {
        const data = await getUsers(i * 100);
        results.push(...data);
        if (data.length < 100) {
            end = false;
            console.log("found end: ", i);
            console.log(results);
        }
        i++;
    }
    for (const user of results) {
        if (user.name.toLowerCase().includes(searchvalue)) {
            renderUser(user);
        }
    }
}
async function getUsers(offset) {
    console.log("offset is: ", offset);
    const token = localStorage.getItem("accessToken");
    const res = await fetch(
        "https://api.noroff.dev/api/v1/social/profiles?offset=" + offset,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await res.json();
    return data;
}
function renderUser(user) {
    const container = document.querySelector(".container");
    container.innerHTML += `
    <h2>${user.name}</h2>
    `;
}