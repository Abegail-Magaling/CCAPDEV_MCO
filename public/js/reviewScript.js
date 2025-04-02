document.addEventListener("DOMContentLoaded", async () => {
  try {

    const restaurantId = window.location.pathname.split('/')[2]; 

    const userResponse = await fetch("/api/profile", { credentials: "include" });
        let currentUser = null;
        
        if (userResponse.ok) {
            const userData = await userResponse.json();
            currentUser = userData._id;
        }

        console.log("Current logged-in user:", currentUser);

    const response = await fetch(`/api/reviews/${restaurantId}`);
    if (!response.ok) throw new Error("Failed to fetch reviews");

    const reviews = await response.json();
    reviews.forEach(review => displayNewReview(review, currentUser))
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
});

async function submitReview() {
  console.log("Submit review function triggered");

  const title = document.getElementById("reviewTitle").value.trim();
  const content = document.getElementById("reviewContent").value.trim();
  const rating = document.getElementById("reviewRating").value;
  
  const restaurantId = window.location.pathname.split('/')[2];
  console.log("Extracted restaurantId:", restaurantId);

  if (!title || !content) {
    alert("Please fill out all fields!");
    return;
  }

  const reviewData = { title, content, rating, restaurantId };

  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(reviewData),
    });

    console.log("Fetch Response:", response);

    if (!response.ok) {
      throw new Error("Failed to post review");
    }

    const data = await response.json();

    const userResponse = await fetch("/api/profile", { credentials: "include" });
    let currentUser = null;
    if (userResponse.ok) {
      const userData = await userResponse.json();
      currentUser = userData._id;
    }

    displayNewReview(data.review, currentUser);
    document.getElementById("reviewForm").reset();
  } catch (error) {
    console.error("Error submitting review!", error);
  }
}

async function displayNewReview(review, currentUser) {
    console.log("DisplayNewReview func triggered");

    const reviewsList = document.getElementById("reviewlist");
    if (!reviewsList) {
        console.warn("No reviews list found on this page.");
        return;
    }

    const formattedDate = review.createdAt
        ? new Date(review.createdAt).toLocaleDateString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Unknown Date";

    const ratingStars = "⭐".repeat(review.rating) + "☆".repeat(5 - review.rating);

    const newReview = document.createElement("div");
    newReview.classList.add("review-box");

    console.log("Current User:", currentUser);
    console.log("Review User ID:", review.user?._id);

    const isOwner = currentUser === review.user?._id;

    newReview.innerHTML = `
        <div class="box-top">
            <div class="profile">
                <div class="name-user">
                    <strong>${review.user.name}</strong> <!-- Changed from review.userName -->
                </div>
                <div class="date">${formattedDate}</div>
            </div>
            ${
                isOwner
                    ? `<div class="review-actions">
                        <button class="btn btn-custom me-1" onclick="editReview(this, '${review._id}')">
                            <i class="fa-solid fa-pen"></i> Edit
                        </button>
                        <button class="btn btn-custom" onclick="deleteReview(this, '${review._id}')">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>`
                    : ""
            }
        </div>
        <div class="box-bottom">
            <div class="reviews">
                <div class="rating">${ratingStars}</div>
            </div>
            <div class="customer-comment-title">
                <strong>${review.title}</strong>
            </div>
            <div class="customer-comment-p">
                <p>${review.content}</p>
            </div>
        </div>
    `;

    reviewsList.prepend(newReview);
}

async function deleteReview(button, reviewId) {
    if (!confirm("Are you sure you want to delete this review?")) {
        return;
    }

    try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to delete review");
        }

        const reviewBox = button.closest(".review-box");
        if (reviewBox) {
            reviewBox.remove();
        }

        alert("Review deleted successfully!");
    } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review.");
    }
}

async function editReview(button, reviewId) {
    const reviewBox = button.closest(".review-box");
    
    // Get current review values
    const titleElem = reviewBox.querySelector(".customer-comment-title strong");
    const contentElem = reviewBox.querySelector(".customer-comment-p p");
    const ratingElem = reviewBox.querySelector(".rating");

    const currentTitle = titleElem.textContent;
    const currentContent = contentElem.textContent;
    const currentRating = ratingElem.textContent.split("⭐").length - 1; 

    // Replace content with editable input fields
    reviewBox.innerHTML = `
        <div class="box-top">
            <div class="profile">
                <div class="name-user">
                    <strong>Editing Review</strong>
                </div>
            </div>
        </div>
        <div class="box-bottom">
            <div class="reviews">
                <label for="editRating">Rating:</label>
                <input type="number" id="editRating" class="form-control" min="1" max="5" value="${currentRating}">
            </div>
            <div class="customer-comment-title">
                <label for="editTitle">Title:</label>
                <input type="text" id="editTitle" class="form-control" value="${currentTitle}">
            </div>
            <div class="customer-comment-p">
                <label for="editContent">Content:</label>
                <textarea id="editContent" class="form-control">${currentContent}</textarea>
            </div>
            <div class="review-actions mt-2">
                <button class="btn btn-success me-1" onclick="saveEditedReview('${reviewId}', this)">Save</button>
                <button class="btn btn-secondary" onclick="cancelEditReview('${reviewId}', this, '${currentTitle}', '${currentContent}', '${currentRating}')">Cancel</button>
            </div>
        </div>
    `;
}

async function saveEditedReview(reviewId, button) {
    const reviewBox = button.closest(".review-box");

    // Get updated values
    const updatedTitle = document.getElementById("editTitle").value.trim();
    const updatedContent = document.getElementById("editContent").value.trim();
    const updatedRating = document.getElementById("editRating").value;

    if (!updatedTitle || !updatedContent) {
        alert("Please fill out all fields!");
        return;
    }

    const updatedData = {
        title: updatedTitle,
        content: updatedContent,
        rating: updatedRating,
    };

    try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("Failed to update review");
        }

        // Fetch updated data from the server
        const updatedReview = await response.json();

        // Refresh review display
        displayNewReview(updatedReview.review, updatedReview.review.user._id);
    } catch (error) {
        console.error("Error updating review:", error);
        alert("Failed to update review.");
    }
}

function cancelEditReview(reviewId, button, oldTitle, oldContent, oldRating) {
    const reviewBox = button.closest(".review-box");

    reviewBox.innerHTML = `
        <div class="box-top">
            <div class="profile">
                <div class="name-user">
                    <strong>Review</strong>
                </div>
            </div>
        </div>
        <div class="box-bottom">
            <div class="reviews">
                <div class="rating">${"⭐".repeat(oldRating)}${"☆".repeat(5 - oldRating)}</div>
            </div>
            <div class="customer-comment-title">
                <strong>${oldTitle}</strong>
            </div>
            <div class="customer-comment-p">
                <p>${oldContent}</p>
            </div>
            <div class="review-actions mt-2">
                <button class="btn btn-custom me-1" onclick="editReview(this, '${reviewId}')"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn btn-custom" onclick="deleteReview(this, '${reviewId}')"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
        </div>
    `;
}
