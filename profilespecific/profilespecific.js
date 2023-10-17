import {calculateHours, calculateMinutesAgo} from "../js/components/Timefunctions.js";
const API_BASE_URL = "https://api.noroff.dev";
const url = "https://api.noroff.dev/api/v1/social/profiles/";


const accessToken = localStorage.getItem("accessToken");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("name");
const url2 = url + `${id + "?_followers=true&_following=true&_posts=true"}`;




async function fetchProfilePosts() {
  
    try {
      const response = await fetch(url2, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch profile posts");
      }
      
      
      const profilePostsData = await response.json();
      console.log(profilePostsData)
      updateProfile(profilePostsData)
  
      profilePostsData.posts.forEach((post) => {
        const newTime = calculateHours(post);
        createProfilePostDiv(post, newTime, profilePostsContainer);
      });
    } catch (error) {
      console.error("Error fetching and displaying profile posts:", error);
    }
  }
  fetchProfilePosts()
/*async function fetchUserProfile() {

  try {
    const response = await fetch(url + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const userData = await response.json();

    
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}*/


function updateProfile(profilePostsData) {
    const obj = profilePostsData
    let profileImg = "";
    function displayImg(){ 
    if(!obj.avatar){
        profileImg = "../media/unknown_picture.jpg"
    } else {
        profileImg = obj.avatar
    }
    }
    displayImg()
    
  const profileDiv = document.createElement("div");
  profileDiv.innerHTML = `
  <section class="h-100 gradient-custom-2">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-9 col-xl-7">
          <div class="card">
            <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height: 220px">
              <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
                <img src="${profileImg}" alt="unknown profile" class="img-fluid img-thumbnail mt-4 mb-2" style="width: 150px; z-index: 1" />
                
              </div>
              <div class="ms-3" style="margin-top: 130px">
                <h5>${obj.name}</h5>
              </div>
            </div>
            <div class="p-4 text-black" style="background-color: #f8f9fa">
              <div class="follow-container">
                <button id="followButton" class="btn btn-primary">
                  Follow/Unfollow
                </button>
              </div>
              <div class="d-flex justify-content-end text-center py-1">
                <div>
                  <p class="mb-1 h5">${obj._count.posts}</p>
                  <p class="small mb-0">Posts</p>
                </div>
                <div class="px-3">
                  <p class="mb-1 h5">${obj._count.followers}</p>
                  <p class="small mb-0">Followers</p>
                </div>
                <div>
                  <p class="mb-1 h5">${obj._count.following}</p>
                  <p class="small mb-0">Following</p>
                </div>
              </div>
            </div>
            <div class="card-body p-4 text-black">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div id="profilePostsContainer" class="container d-flex flex-column min-vh-100">
  
  </div>

  


`;

  document.body.appendChild(profileDiv);


/*   Edit Profile code  */

  
 
  const bannerImage = document.getElementById("bannerImage");
  
  
  
  
  
  


    /* Follow button code  */

    const followButton = document.getElementById("followButton");
    followButton.addEventListener("click",  () => {
    followPut(profilePostsData)
  });
}
async function followPut(profilePostsData){
    console.log(profilePostsData)
	try {
        const unfollowUrl = `${API_BASE_URL}/api/v1/social/profiles/${profilePostsData.name}/unfollow`
		const followUrl = `${API_BASE_URL}/api/v1/social/profiles/${profilePostsData.name}/follow`;
		const uname = localStorage.getItem("username");
        const followers = profilePostsData.followers
        const followerArr = []
        const followContainer = document.querySelector(".follow-container");
        console.log(followers);
        followers.forEach((follower)=> {
            followerArr.push(follower.name);
        });
        
        
        
        function endpoint(){
            console.log(followerArr)
            if(followerArr.includes(uname)){ 
                console.log("Uname exists in array, unfollowing."); 
                followContainer.innerHTML += `<p>You just unfollowed this profile!<p/>`
                  
                return unfollowUrl
            } else {
                console.log("Uname does not exist in array, following.");
                followContainer.innerHTML += `<p>You just followed this profile!<p/>`
                return followUrl
            }
        }
        
         var myHeaders = new Headers();
         myHeaders.append("Authorization", `Bearer ${accessToken}`);
         
         var requestOptions = {
           method: 'PUT',
           headers: myHeaders,
           redirect: 'follow'
         };
         
         fetch(endpoint(), requestOptions)
           .then(response => response.text())
           .then(result => console.log(result))
           .catch(error => console.log('error', error));
      
    } catch (error) {
      console.error("Error following/unfollowing profile:", error);
    }
    
}

/* Profilespecific page posts code */
 

function createProfilePostDiv(post, newTime) {

    const profilePostsContainer = document.getElementById("profilePostsContainer");
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
  "rounded");

  postDiv.innerHTML = `
    <p class="fw-lighter">${newTime}</p>
    <a href="../specific/index.html?id=${post.id}">
      <img class="card-img-top object-fit-fill rounded" src="${post.media}" alt="${post.title}">
    </a>
    <div class="card-body w-100">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.body}</p>
      <p class="card-text">Tags: ${post.tags.join(', ')}</p>
    </div>
  `;
  profilePostsContainer.appendChild(postDiv);
}






