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
                        <button class="btn btn-sm btn-outline-primary me-2" onclick="editReview(this, '${review._id}')">
                            <i class="fa-solid fa-pen"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteReview(this, '${review._id}')">
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
