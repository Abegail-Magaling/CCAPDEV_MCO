document.addEventListener("DOMContentLoaded", async() => {    
    try{
        
        const response = await fetch("/api/profile");
        if(!response.ok){
            throw new Error("Failed to fetch user data");
        }

        const user = await response.json();
        console.log("Fetched User Data:", user);

        const userNameElement = document.getElementById("user-name");

        //get profile picture preview
        const profilePictureElement = document.getElementById("profile-img");
        if (profilePictureElement && user.profilePicture) {
            profilePictureElement.src = user.profilePicture;
        }

        //for admin checks
        console.log("User type of user: ", user.userType);
        if(user.userType !== "admin"){
            document.getElementById("addRestaurantLink").style.display = "none";
        }

        if (userNameElement && user.name) {
            userNameElement.textContent = user.name;
        } 
        else {
            console.warn("User name element not found or user name is missing.");
        }

        const nameInput = document.getElementById("user-name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (nameInput && emailInput) {
            nameInput.value = user.name;
            emailInput.value = user.email;
        }
    }
    catch(error) {
        console.error("Error fetching user profile!", error);
    }

    //updating profile
    const editProfileForm = document.getElementById("edit-profile-form");
    if (editProfileForm) {
        editProfileForm.addEventListener("submit", async (event) => {
            event.preventDefault();


            //changing
            // const formData = {
            //     name: document.getElementById("user-name").value,
            //     email: document.getElementById("email").value,
            //     password: document.getElementById("password").value
            // };

            const formData = new FormData();
            formData.append("name", document.getElementById("user-name").value);
            formData.append("email", document.getElementById("email").value);
            formData.append("password", document.getElementById("password").value);

            const profilePicture = document.getElementById("profilePicture").files[0];
            if(profilePicture){
                formData.append("profilePicture", profilePicture);
            }

            const response = await fetch("/api/update", {
                method: "PUT",
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update profile");
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);

                //update profile picture
                if (data.profilePicture) {
                    const profileImg = document.querySelector(".profile-img");
                }

                window.location.href = "/profile";
            })
            .catch(error => {
                console.error("Error updating profile!", error);
            });
    });
    }
});


function logout(){
    fetch("/api/logout", {method : "POST" })
    .then(response => {
        if(response.ok){
            window.location.href = "/login";
        }
        else{
            alert("error logging out!");
        }
    })
    .catch(error => {
        console.error(error);
    });
}

function editProfile() {
    window.location.href = "editprofile.html";
}