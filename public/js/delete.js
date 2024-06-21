
document.addEventListener("DOMContentLoaded", function() {
    const deleteButtons = document.querySelectorAll("#delete-btn");

    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener("click", async (event) => {
                event.preventDefault(); 
                
                // Gets the ID of the element to be deleted
                const parentElement = event.target.closest('.post'); 
                const postId = parentElement.dataset.postId; 
                console.log(postId);

                try {
                    // Sends a DELETE request to the controller
                    const response = await fetch(`/dashboard/${postId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        // Forces a page reload
                        document.location.replace('/dashboard');
                        console.log(response);
                    } else {
                        console.error('Failed to delete post', response);
                    }
                } catch (error) {
                    console.error('Error deleting post', error);
                }
            });
        });
    }
});