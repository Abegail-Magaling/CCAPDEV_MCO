document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector(".custom-navbar");

    
    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;
        if (currentScrollY > 0) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }
    });
});

// Open individual image modal
function openModal(imageId) {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("modalImg").src = document.querySelector(`[onclick="openModal('${imageId}')"]`).src;
}

// Close image modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Open gallery modal
function openGallery() {
    document.getElementById("galleryModal").style.display = "block";
}

// Close gallery modal
function closeGallery() {
    document.getElementById("galleryModal").style.display = "none";
}

function filterEateries() {
    let searchQuery = document.getElementById("searchInput").value.toLowerCase();
    let selectedCuisine = document.getElementById("filterCuisine").value;
    let selectedPrice = document.getElementById("filterPrice").value;

    let eateries = document.querySelectorAll(".eateries-container .col-md-3");

    eateries.forEach(eatery => {
        let eateryName = eatery.querySelector(".card-title").textContent.toLowerCase();
        let eateryCuisine = eatery.getAttribute("data-cuisine");
        let eateryPrice = eatery.getAttribute("data-price");

        let matchesSearch = searchQuery === "" || eateryName.includes(searchQuery);
        let matchesCuisine = selectedCuisine === "" || eateryCuisine === selectedCuisine;
        let matchesPrice = selectedPrice === "" || eateryPrice === selectedPrice;

        if (matchesSearch && matchesCuisine && matchesPrice) {
            eatery.style.display = "block";  // Show matching eateries
        } else {
            eatery.style.display = "none";  // Hide non-matching eateries
        }
    });
}


// function filterReviews() {
//     let selectedFilter = document.getElementById("filterReviews").value;
//     let reviews = Array.from(document.querySelectorAll(".review-card"));

//     if (selectedFilter === "recent") {
//         reviews.sort((a, b) => Math.random() - 0.5); 
//     } else if (selectedFilter === "helpful") {
//         reviews.sort((a, b) => Number(b.dataset.helpful) - Number(a.dataset.helpful));
//     } else if (selectedFilter === "rating") {
//         reviews.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
//     }

//     let reviewsList = document.getElementById("reviewsList");
//     reviewsList.innerHTML = ""; 
//     reviews.forEach(review => reviewsList.appendChild(review)); 
// }


// function markHelpful(button) {
//     let currentCount = parseInt(button.dataset.helpful) || 0;
//     currentCount++;
//     button.dataset.helpful = currentCount; 
//     button.innerHTML = `👍 Helpful (${currentCount})`;
// }


// function submitReview() {
//     let title = document.getElementById("reviewTitle").value.trim();
//     let content = document.getElementById("reviewContent").value.trim();
//     let rating = document.getElementById("reviewRating").value;

//     if (title === "" || content === "") {
//         alert("Please fill out all fields!");
//         return;
//     }

//     let newReview = document.createElement("div");
//     newReview.classList.add("col-md-6", "review-card");
//     newReview.setAttribute("data-rating", rating);
//     newReview.setAttribute("data-helpful", "0");

//     newReview.innerHTML = `
//         <div class="card">
//             <div class="card-body">
//                 <h5 class="card-title">${title} - ⭐ ${rating}</h5>
//                 <p class="card-text"><strong>@newUser</strong>: "${content}"</p>
//                 <button class="btn btn-outline-primary btn-sm" data-helpful="0" onclick="markHelpful(this)">👍 Helpful (0)</button>
//             </div>
//         </div>
//     `;

//     document.getElementById("reviewsList").appendChild(newReview); 
//     document.getElementById("reviewForm").reset(); 
// }

// // Function to edit profile
// function editProfile() {
//     let newUsername = prompt("Enter your new username:", document.getElementById("username").textContent);
//     if (newUsername !== null && newUsername.trim() !== "") {
//         document.getElementById("username").textContent = newUsername;
//     }

//     let newBio = prompt("Enter your new bio:", document.getElementById("bio").textContent);
//     if (newBio !== null && newBio.trim() !== "") {
//         document.getElementById("bio").textContent = `"${newBio}"`;
//     }
// }

// // Function to update profile picture
// function updateProfilePic(event) {
//     let reader = new FileReader();
//     reader.onload = function() {
//         document.getElementById("profilePic").src = reader.result;
//     };
//     reader.readAsDataURL(event.target.files[0]);
// }

// // Function to trigger file input
// document.getElementById("profilePic").addEventListener("click", function() {
//     document.getElementById("uploadPic").click();
// });
// // Check if user is logged in
// document.addEventListener("DOMContentLoaded", function() {
//     if (window.location.pathname.includes("profile.html")) {
//         let loggedInUser = localStorage.getItem("loggedInUser");
//         if (!loggedInUser) {
//             window.location.href = "login.html"; // Redirect if not logged in
//         } else {
//             document.getElementById("username").textContent = `@${loggedInUser}`;
//         }
//     }
// });

// // Function to log in a user
// function loginUser() {
//     let username = document.getElementById("loginUsername").value.trim();
//     let password = document.getElementById("loginPassword").value.trim();

//     if (!username || !password) {
//         alert("Please enter username and password.");
//         return;
//     }

//     let storedPassword = localStorage.getItem(`user_${username}`);
//     if (storedPassword === password) {
//         localStorage.setItem("loggedInUser", username);
//         window.location.href = "profile.html";
//     } else {
//         alert("Invalid username or password.");
//     }
// }

// // Function to register a new user
// function registerUser() {
//     let username = document.getElementById("registerUsername").value.trim();
//     let password = document.getElementById("registerPassword").value.trim();

//     if (!username || !password) {
//         alert("Please enter a username and password.");
//         return;
//     }

//     if (localStorage.getItem(`user_${username}`)) {
//         alert("Username already taken.");
//         return;
//     }

//     localStorage.setItem(`user_${username}`, password);
//     alert("Registration successful! You can now log in.");
//     window.location.href = "login.html";
// }

// // Function to log out user
// // function logoutUser() {
// //     localStorage.removeItem("loggedInUser");
// //     window.location.href = "login.html";
// // }

