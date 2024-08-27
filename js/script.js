document.addEventListener('DOMContentLoaded', () => {

    // Handle Registration Form Submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                password_confirmation: document.getElementById('confirm-password').value
            };

            fetch('http://localhost/mosndlaravel/mosndserver/public/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Registration successful!');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message);
                }
            });
        });
    }

    // Handle Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            fetch('http://localhost/mosndlaravel/mosndserver/public/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login successful!');
                    window.location.href = 'profile.html';
                } else {
                    alert('Login failed!');
                }
            });
        });
    }

    // Handle Profile Update
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value
            };

            fetch('http://localhost/mosndlaravel/mosndserver/public/api/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert ('Profile updated successfully!');
                } else {
                    alert('Failed to update profile!');
                }
            });
        });
    }

    // Handle Password Change
    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                current_password: document.getElementById('current-password').value,
                new_password: document.getElementById('new-password').value,
                new_password_confirmation: document.getElementById('confirm-new-password').value
            };

            fetch('http://localhost/mosndlaravel/mosndserver/public/api/profile/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Password changed successfully!');
                } else {
                    alert('Failed to change password!');
                }
            });
        });
    }

    // Handle Admin: Fetch and Display Users
    const userList = document.getElementById('user-list');
    if (userList) {
        fetch('http://localhost/mosndlaravel/mosndserver/public/api/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userList.innerHTML = data.users.map(user => `
                    <div class="user-item">
                        <p>${user.name} (${user.email}) - Role: ${user.role}</p>
                        <button class="btn btn-sm btn-primary" onclick="editUser(${user.id})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                    </div>
                `).join('');
            } else {
                alert('Failed to fetch users!');
            }
        });
    }

    // Handle Admin: Fetch and Display Activity Logs
    const activityLogList = document.getElementById('activity-log-list');
    if (activityLogList) {
        fetch('http://localhost/mosndlaravel/mosndserver/public/api/admin/activity-logs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                activityLogList.innerHTML = data.logs.map(log => `
                    <div class="log-item">
                        <p>${log.activity} - ${log.created_at}</p>
                    </div>
                `).join('');
            } else {
                alert('Failed to fetch activity logs!');
            }
        });
    }

});

// Admin: Edit User
function editUser(userId) {
    // Logic to open a modal with user details to edit
    alert('Edit user: ' + userId);
}

// Admin: Delete User
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`http://localhost/mosndlaravel/mosndserver/public/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User deleted successfully!');
                location.reload(); // Reload the page to reflect the changes
            } else {
                alert('Failed to delete user!');
            }
        });
    }
}

