// login.js
const API_BASE_URL = "https://api.noroff.dev"
const form = document.querySelector("#login");
const usernameInput = document.getElementById("uname");
const passwordInput = document.getElementById("password-input");



    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        const userLogin = {
            email: username,
            password: password,
        };

        try {
            console.log("success");
            const data = await loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, userLogin);
            console.log(data);
            console.log(data.name);
            localStorage.setItem('accessToken', data.accessToken);

            localStorage.setItem('username', data.name);

            localStorage.setItem("user", JSON.stringify(data))



            window.location.href = "../profile/index.html";

        } catch (error) {
            console.error(error);
        }
    });


    //JSON docs for the loginUser function
    /**
     * 
     * @async
     * @function
     * @param {string} url 
     * @param {Object} data 
     * @throws {Error} //If the fetch fails
     * @returns {Promise<Object>}
     */

async function loginUser(url, data) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)

        };

        const response = await fetch(url, postData);
        const json = await response.json();
        console.log(response);
        if (response.status === 200) {
            return json; 
            
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        throw error;
    }
}

