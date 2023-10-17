import {calculateHours, calculateMinutesAgo} from "../js/components/Timefunctions.js";
import countReactions from "../js/components/countReactions.js"
const url = "https://api.noroff.dev/api/v1/social/posts?_reactions=true";
const row = document.querySelector(".row2");
var likeBtn = document.querySelectorAll('.like')
const API_BASE_URL = 'https://api.noroff.dev';



function createDiv(obj, newTime,reactionAmount){
  const postDiv = document.createElement("div");
  postDiv.classList.add(
  "col-lg-5",
  "col-10",
  "mx-auto",
  "feedcard",
  "my-2",
  "d-flex",
  "justify-content-center",
  "align-items-center",
  "shadow",
  "p-3",
  "rounded"
);
postDiv.innerHTML += `
  <p class="fw-lighter">${newTime}</p>
  <a href="../specific/index.html?id=${obj.id}"><img class="card-img-top object-fit-fill rounded" src="${obj.media}" id="displayImg"><a/>
  <div class="card-body w-100">
    <h5 class="card-title">${obj.title}</h5>
    <p class="card-text">${obj.body}</p>
    <hr>
    <div class="d-flex gap-2 my-2">
      <p>Comments: ${obj._count.comments}<p/>
      <p>Reactions: ${reactionAmount} <p/> 
      </div>
      </div>
      `

row.appendChild(postDiv);
}

async function getPosts(url) {
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`, 
		},
	});
	const data = await res.json();
	console.log(data);
  


  for (let i = 0; i < data.length; i++) {
    
    const newTime = calculateHours(data[i])
    const reactionAmount = countReactions(data[i])
    if(!data[i].media){
      continue
    } 
      createDiv(data[i],newTime,reactionAmount)
  
    
    let likeBtn = document.querySelectorAll('.like')
    likeBtn.forEach(function(btn) {
  
      btn.addEventListener('click', function() {
        btn.style.backgroundColor = "red";
      })
    })
    
  }
  
}
getPosts(url)




const postBtn = document.querySelector("#postbtn");
const titleInput = document.querySelector("#titleinput");
const bodyInput = document.querySelector("#bodyinput");
const tagsInput = document.querySelector("#tagsinput")
const mediaInput = document.querySelector("#mediainput");




async function newPost(url,info) {
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`, // what we use for authentication
		}, body: JSON.stringify(info),
	});
	const data = await res.json();
	console.log(data);
  location.reload()
}
postBtn.addEventListener("click", ()=>{ 
  
 const arr = tagsInput.value.split(" ")
 console.log(arr);
  const postInfo = {
      title: `${titleInput.value}`,
      body: `${bodyInput.value}`,
      tags: arr,
      media: `${mediaInput.value}`,
  }
  console.log(postInfo);
  newPost(`${API_BASE_URL}/api/v1/social/posts`, postInfo);
  

  
  
});
const searchBtn = document.querySelector("#searchbtn");
const searchInput = document.querySelector("#search");
searchBtn.addEventListener("click", ()=> {
  const searchparams = searchInput.value.trim();
    
  getTags(searchparams)
});
async function getTags(searchparams) {
  const tagsUrl = `https://api.noroff.dev/api/v1/social/posts?_tag=${searchparams}`
  console.log(tagsUrl)
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(tagsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, 
    },
  });
  const data = await res.json();
  console.log(data)
  row.innerHTML = ""
  data.forEach((obj)=> {
    render(obj)
  })
function render(obj){
 
    
    const newTime = calculateHours(obj)
    createDiv(obj,newTime)
    if(obj.media === ""){
      
    }
};
}
const newest = document.querySelector("#newest");
const oldest = document.querySelector("#oldest");

newest.addEventListener("click", ()=>{
  row.innerHTML = "";
  getPosts(url)

});
const oldestUrl = url + "&sortOrder=asc"

oldest.addEventListener("click", ()=>{
  row.innerHTML="";
  getPosts(oldestUrl);

})


