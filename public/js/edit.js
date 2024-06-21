const editButtons = document.querySelectorAll('.edit-btn');
const editForms = document.querySelectorAll('.edit-form');

// Attach click event listeners to each edit button
editButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Toggle display of the edit form
        editForms[index].style.display = 'block';
        // Hide the post content
        editButtons[index].parentNode.querySelector('.post-content').style.display = 'none';
    });
});

// Handle form submission
editForms.forEach((form, index) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get the edited content
        const editedContent = form.querySelector('.edit-textarea').value;
        // Update the post content
        editButtons[index].parentNode.querySelector('.post-content').textContent = editedContent;
        // Hide the edit form and show the updated post content
        form.style.display = 'none';
        editButtons[index].parentNode.querySelector('.post-content').style.display = 'block';
    });
});