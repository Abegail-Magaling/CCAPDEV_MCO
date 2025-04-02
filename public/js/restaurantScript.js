document.addEventListener("DOMContentLoaded", async () => {
    try {
        const restaurantId = new URLSearchParams(window.location.search).get("id"); // Get restaurant ID from URL

        if (restaurantId) {
            fetchSingleRestaurant(restaurantId); // Fetch a single restaurant if ID exists
        } else {
            fetchAllRestaurants(); // Otherwise, fetch all restaurants
        }
    } catch (error) {
        console.error("❌ Error initializing script:", error);
    }
});

// ✅ Fetch & display a single restaurant
async function fetchSingleRestaurant(restaurantId) {
    try {
        const response = await fetch(`/restaurants/${restaurantId}`); // Updated endpoint
        if (!response.ok) throw new Error("Failed to fetch restaurant data");

        const restaurant = await response.json();

        document.getElementById("restaurant-name").textContent = restaurant.name;
        document.getElementById("restaurant-description").textContent = restaurant.description;
        document.getElementById("restaurant-address").textContent = restaurant.address;
        document.getElementById("restaurant-contact").textContent = restaurant.contact;
        document.getElementById("restaurant-image").src = restaurant.imageUrl;
        document.getElementById("restaurant-google-map").src = restaurant.googleMap;
    } catch (error) {
        console.error("❌ Error loading restaurant:", error);
    }
}

// ✅ Fetch & display all restaurants
async function fetchAllRestaurants() {
    try {
        const response = await fetch("/eateries"); // Updated endpoint
        if (!response.ok) throw new Error("Failed to fetch restaurants");

        const restaurants = await response.json();
        const container = document.getElementById("restaurant-list");

        if (!container) {
            console.error("❌ Element #restaurant-list not found in HTML.");
            return;
        }

        container.innerHTML = "";

        restaurants.forEach(restaurant => {
            const item = document.createElement("div");
            item.classList.add("restaurant-card");
            item.innerHTML = `
                <h2>${restaurant.name}</h2>
                <p><strong>Location:</strong> ${restaurant.address}</p>
                <p><strong>Description:</strong> ${restaurant.description}</p>
                <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
                <img src="${restaurant.imageUrl}" alt="${restaurant.name}" width="200">
                <p><a href="restaurant.html?id=${restaurant._id}" class="btn btn-primary">View Details</a></p>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error("❌ Error loading restaurants:", error);
    }
}
