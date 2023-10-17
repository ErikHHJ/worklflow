import { calculateHours, calculateMinutesAgo } from "../js/components/Timefunctions.js";
import editPost from "../js/components/Editpost.js";
import deletePost from "../js/components/Delete.js";


const API_BASE_URL = "https://api.noroff.dev";
const url = "https://api.noroff.dev/api/v1/social/profiles/";
let accessToken;
const displayedName = localStorage.getItem("username");
accessToken = localStorage.getItem("accessToken");
let newAvatarImageUrl = "";
const url2 = url + `${displayedName + "/posts"}`;
const editProfileUrl = url + `${displayedName}` +"/media"
const localStorageAvatar = JSON.parse(localStorage.getItem("user"));


async function fetchUserProfile() {
  try {
    const response = await fetch(url + displayedName, {
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

    updateProfile(userData);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

/* Code for displaying profile card  */
function updateProfile(userData) {
  const profileDiv = document.createElement("div");
  const obj = userData
  let profileImg = "";
    function displayImg(){ 
    if(!obj.avatar){
        profileImg = "../media/unknown_picture.jpg"
    } else {
        profileImg = obj.avatar
    }
    }
    displayImg()
  profileDiv.innerHTML = `

    <section class="h-100 gradient-custom-2">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-lg-9 col-xl-7">
            <div class="card">
              <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height: 220px">
                <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
                  <img src="${profileImg}" alt="" class="img-fluid img-thumbnail mt-4 mb-2" style="width: 150px; z-index: 1" />
                  <button type="button" id="editProfileButton" class="btn btn-outline-dark" data-mdb-ripple-color="dark" style="z-index: 1">
                    Edit profile
                  </button>
                </div>
                <div class="ms-3" style="margin-top: 130px">
                  <h5>${userData.name}</h5>
                </div>
              </div>
              <div class="p-4 text-black" style="background-color: #f8f9fa">
                <div class="d-flex justify-content-end text-center py-1">
                  <div>
                    <p class="mb-1 h5">${userData._count.posts}</p>
                    <p class="small mb-0">Posts</p>
                  </div>
                  <div class="px-3">
                    <p class="mb-1 h5">${userData._count.followers}</p>
                    <p class="small mb-0">Followers</p>
                  </div>
                  <div>
                    <p class="mb-1 h5">${userData._count.following}</p>
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

    <div id="profilePostsContainer" class="container d-flex flex-column min-vh-100"></div>

    <div id="editProfileModal" class="modal">
      <div class="modal-content">
        <span id="closeModal" class="close">&times;</span>
        <h2>Edit Profile</h2>
        <label for="avatarImageInput">New Avatar Image URL:</label>
        <input type="text" id="avatarImageInput" name="avatarImageInput" placeholder="Enter new avatar image URL">
        <button id="saveAvatarButton">Save Avatar Image</button>
        <img id="avatarImage" src="${newAvatarImageUrl}" alt="Avatar Image">
      </div>
    </div>


    <div id="editPostModal" class="modal">

  <div class="modal-content">
    <span id="closeEditPostButton" class="close">&times;</span>
    <h2>Edit Post</h2>
    <label for="editTitleInput">Title:</label>
    <input type="text" id="editTitleInput" name="editTitleInput" placeholder="Edit post title">
    <label for="editBodyInput">Body:</label>
    <textarea id="editBodyInput" name="editBodyInput" placeholder="Edit post body"></textarea>
    <label for="editTagsInput">Tags:</label>
    <input type="text" id="editTagsInput" name="editTagsInput" placeholder="Edit tags separated by spaces">
    <label for="editMediaInput">Media URL:</label>
    <input type="text" id="editMediaInput" name="editMediaInput" placeholder="Edit media URL">
    <button id="saveEditPostButton">Save Post</button>
  </div>
</div>;
  `;

  document.body.appendChild(profileDiv);


  /* Edit Profile code */
  const editProfileButton = document.querySelector("#editProfileButton");
  const editProfileModal = document.querySelector("#editProfileModal");
  const avatarImageInput = document.querySelector("#avatarImageInput");
  const saveAvatarButton = document.querySelector("#saveAvatarButton");
  const avatarImage = document.querySelector("#avatarImage");
  const closeModalButton = document.querySelector("#closeModal");
  const newAvatar = document.querySelector("#newavatar");
  
  saveAvatarButton.addEventListener("click", async () => {
    const newAvatarImageUrl = avatarImageInput.value;
  

    try {
      console.log("Updating avatar with URL:", newAvatarImageUrl);
  
      const response = await fetch(editProfileUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ avatar: newAvatarImageUrl }),
      });
  
      if (response.ok) {
        avatarImage.src = `${newAvatarImageUrl}?timestamp=${new Date().getTime()}`;
        editProfileModal.style.display = "none";
        console.log("Avatar updated successfully");

        const localStorageUser = JSON.parse(localStorage.getItem("user"));
      localStorageUser.avatar = newAvatarImageUrl;
      localStorage.setItem("user", JSON.stringify(localStorageUser));
      } else {
        console.error("Failed to update avatar image");
      }
    } catch (error) {
      console.error("Error updating avatar image:", error);
    }
  });

  
  editProfileButton.addEventListener("click", () => {
    editProfileModal.style.display = "block";
  });
  
  closeModalButton.addEventListener("click", () => {
    editProfileModal.style.display = "none";
  });
  

  /* Follow button code */


  fetchProfilePosts(displayedName);
}

/* Code for displaying posts by the author */
async function fetchProfilePosts() {
  const profilePostsContainer = document.querySelector("#profilePostsContainer");

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

    profilePostsData.forEach((post) => {
      const displayImg = document.createElement("img")
      const newTime = calculateHours(post);
      if (!post.media) {
        displayImg.innerHTML = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
      }
      createProfilePostDiv(post, newTime, profilePostsContainer);
    });
  } catch (error) {
    console.error("Error fetching and displaying profile posts:", error);
  }
}

/* how the posts look */
function createProfilePostDiv(post, newTime, profilePostsContainer) {
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

  postDiv.innerHTML = `
    <div>
      <button id="editpost" data-post-id="${post.id}" class="btn btn-info">Edit post</button>
      <button id="deletepost" data-post-id="${post.id}" class="btn btn-danger">Delete post</button>
    </div>
    <p class="fw-lighter">${newTime}</p>
    <a href="../specific/index.html?id=${post.id}">
      <img class="card-img-top object-fit-fill rounded" id="test" src="${post.media}" alt="${post.title}">
    </a>
    <div class="card-body w-100">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.body}</p>
      <p class="card-text">Tags: ${post.tags.join(', ')}</p>
    </div>
  `;

  profilePostsContainer.appendChild(postDiv);

    /* code for edit post button  */
    postDiv.querySelector('#editpost').addEventListener('click', (e) => {
      const editPostModal = document.querySelector("#editPostModal");
      const postId = e.target.getAttribute("data-post-id");
      editPostModal.dataset.postId = postId;
      editPostModal.style.display = 'block';
      });
        /* code for delete post */
      postDiv.querySelector('#deletepost').addEventListener('click', (e) => {
        const postId = e.target.getAttribute("data-post-id");
        deletePost(postId, accessToken);
    
        postDiv.remove();
      });
    

    document.querySelector("#closeEditPostButton").addEventListener('click', () => {
      const editPostModal = document.querySelector("#editPostModal");
      editPostModal.style.display = 'none';
    });
    
    document.querySelector("#saveEditPostButton").addEventListener('click', () => {
      const editPostModal = document.querySelector("#editPostModal");
      const postId = editPostModal.dataset.postId;
    
      const updatedPostData = {
        title: document.querySelector("#editTitleInput").value,
        body: document.querySelector("#editBodyInput").value,
        tags: document.querySelector("#editTagsInput").value.split(' '),
        media: document.querySelector("#editMediaInput").value,
      };
    
      editPost(postId, updatedPostData);
    
      editPostModal.style.display = 'none';
    });

}

fetchUserProfile();



