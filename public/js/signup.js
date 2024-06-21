const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      try {
        const response = await fetch('/api/user/signup', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard'); // Redirect to dashboard on success
        } else {
          // Improved error handling
          const result = await response.json();
          alert(`Signup failed: ${result.message || response.statusText}`);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed due to a network error.');
      }
    } else {
      alert('Please enter a valid username and password.');
    }
  };
  
  // Attach event listener to the form
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  