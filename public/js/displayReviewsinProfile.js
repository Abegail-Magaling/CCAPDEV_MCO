document.addEventListener("DOMContentLoaded", async () => {
    try {
      const userResponse = await fetch("/api/profile", { credentials: "include" });
      let currentUser = null;
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        currentUser = userData._id;
      }
  
      console.log("Current logged-in user:", currentUser);
  
      const response = await fetch("/api/reviews");
      if (!response.ok) throw new Error("Failed to fetch reviews");
  
      const reviews = await response.json();
      const userReviews = reviews.filter(review => review.user?._id === currentUser);
  
      const reviewsContainer = document.getElementById("userReviewsContainer");
      reviewsContainer.innerHTML = "";
  
      if (userReviews.length === 0) {
        reviewsContainer.innerHTML = "<p>No reviews yet.</p>";
        return;
      }
  
      userReviews.forEach(review => displayNewReview(review, currentUser));
  
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  });

  async function displayNewReview(review, currentUser) {
    console.log("DisplayNewReview func triggered");

    const reviewsList = document.getElementById("userReviewsContainer"); // Ensure this ID exists in your HTML
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

    newReview.innerHTML = `
        <div class="box-top">
            <div class="profile">
                <div class="name-user">
                    <strong>${review.user?.name || "Anonymous"}</strong> <!-- Handles undefined names -->
                </div>
                <div class="date">${formattedDate}</div>
            </div>
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
  