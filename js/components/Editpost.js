export default async function editPosts(postId, updatedPostData) {
  const accessToken = localStorage.getItem("accessToken");
  
  try {
    const editPostUrl = "https://api.noroff.dev/api/v1/social/posts/" + postId;
    const response = await fetch(editPostUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedPostData),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      console.log("Post updated:", updatedPost);
      
    } else {
      console.error("Failed to update the post.");
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}
