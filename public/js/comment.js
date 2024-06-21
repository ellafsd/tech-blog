const commentButtons = document.querySelectorAll('.commentPost-btn');
const commentForms = document.querySelectorAll('.commentPost-form');

// Attach click event listeners to each new button
commentButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Toggle display of the edit form
        newForms[index].style.display = 'block';
        // Hide the post content
        commentButtons[index].parentNode.querySelector('.commentPost-content').style.display = 'none';
    });
});

// Handle new form submission
editForms.forEach((form, index) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get the edited content
        const newContent = form.querySelector('.comment-textarea').value;
        // Update the post content
        commentButtons[index].parentNode.querySelector('.commentPost-content').textContent = newContent;
        // Hide the edit form and show the updated post content
        form.style.display = 'none';
        commentButtons[index].parentNode.querySelector('.commentPost-content').style.display = 'block';
    });
});