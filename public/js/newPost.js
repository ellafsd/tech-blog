
const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (title && content) {
        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post due to a network error.');
        }
    } else {
        alert('Please fill out the title and content fields.');
    }
};

document.getElementById('new-post-form').addEventListener('submit', newPostHandler);
