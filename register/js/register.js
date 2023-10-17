const userName = document.querySelector("#uname");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password-input");
const submit = document.querySelector("#submit");
const form = document.querySelector("#form");

const API_BASE_URL = 'https://api.noroff.dev';

async function registerUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      // Store the user's name or username in localStorage
      localStorage.setItem('username', userName.value);

    }

    return json;
  } catch (error) {
    console.log(error);
  }
  window.location.href = "../index.html";
}

form.addEventListener("submit", (e)=>{
    e.preventDefault(); 
    console.log(userPassword.value)
    const user = {
        name: `${userName.value}`,
        email: `${userEmail.value}`,
        password: `${userPassword.value}` 
    }
    registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
    
});






