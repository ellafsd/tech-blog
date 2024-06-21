const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // Clear the session or token
    localStorage.removeItem('user');
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

document.getElementById('logout').addEventListener('click', logout);
