const form = document.querySelector("#search_form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchvalue = document
        .querySelector("#search_input")
        .value.toLowerCase();
    document.querySelector(".container").innerHTML = "";
    searchPosts(searchvalue);
});
async function searchPosts(searchvalue) {
    console.log("function running:", searchvalue);
    let i = 0;
    let end = true;
    const results = [];
    while (end) {
        const data = await getPosts(i * 100);
        results.push(...data);
        if (data.length < 100) {
            end = false;
            console.log("found end: ", i);
            console.log(results);
        }
        i++;
    }
    for (const post of results) {
        if (post.title.toLowerCase().includes(searchvalue)) {
            renderPosts(post);
        }
    }
}
async function getPosts(offset) {
    console.log("offset is: ", offset);
    const token = localStorage.getItem("accessToken");
    const res = await fetch(
        "https://api.noroff.dev/api/v1/social/posts?offset=" + offset,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await res.json();
    return data;
}
function renderPosts(post) {
    const container = document.querySelector(".container");
    container.classList.add("container",
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "flex-column"

    )
    container.innerHTML += `<div class="d-flex flex-column justify-content-center align-items-center">
    <h2>${post.title}</h2>
    <p>${post.body}<p/>
    <img class="w-50" src="${post.media}"><img/>
    <div/>
    `;
}