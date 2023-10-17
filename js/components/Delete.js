/**
 * 
 * @param {String} postId 
 * @param {String} accessToken 
 * 
 * @throws {Error} //If something fails
 */
export default async function deletePost(postId, accessToken) {
  try {
    const editPostUrl = "https://api.noroff.dev/api/v1/social/posts/" + postId;
    const response = await fetch(editPostUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      console.log("Post deleted successfully");
    } else {
      console.error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}


