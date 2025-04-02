document.getElementById('add-restaurant-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const googleMap = document.getElementById('googleMap').value;
    const cuisine = document.getElementById('cuisine').value;
    const coverPage = document.getElementById('coverPage').files[0];
    const restoPhotos = document.getElementById('restoPhotos').files;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('contact', contact);
    formData.append('googleMap', googleMap);
    formData.append('cuisine', cuisine);
    formData.append('coverPage', coverPage);
    
    for (let i = 0; i < restoPhotos.length; i++) {
        formData.append('restoPhotos', restoPhotos[i]);
    }

    try {
        const response = await fetch('/add', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const result = await response.json();

        if (response.ok) {
            alert('Restaurant added successfully!');
            window.location.href = '/eateries';
        } else {
            alert(`Error: ${result.error || 'Something went wrong'}`);
        }
    } catch (error) {
        console.error("Error adding restaurant:", error);
        alert("An error occurred while adding the restaurant.");
    }
});
