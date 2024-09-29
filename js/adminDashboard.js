// adminDashboard.js

$(document).ready(function() {
    // Fetch users and populate the table
    fetch('/admin/users')
        .then(response => response.json())
        .then(data => {
            let usersTableBody = $('#usersTableBody');
            usersTableBody.empty();
            data.forEach(user => {
                let role = user.role || 'user';  // Default to 'user' if role is not specified
                let userRow = `
                    <tr>
                        <td>${user.userId}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${role}</td>
                        <td>
                            <button class="btn btn-danger btn-sm deleteUser" data-id="${user._id}">Delete</button>
                        </td>
                    </tr>`;
                usersTableBody.append(userRow);
            });

            // Add delete user functionality
            $('.deleteUser').click(function() {
                let userId = $(this).data('id');
                if (confirm('Are you sure you want to delete this user?')) {
                    $.ajax({
                        url: `/admin/users/${userId}`,
                        type: 'DELETE',
                        success: function(result) {
                            alert('User deleted successfully!');
                            location.reload();  // Reload the page to update the users table
                        },
                        error: function(err) {
                            alert('Error deleting user.');
                        }
                    });
                }
            });
        });

    // Logout functionality
    $('#logoutButton').click(function(event) {
        event.preventDefault();  // Prevent form submission
        $.post('/api/users/logout', function(response) {
            window.location.href = '/';  // Redirect to login page after logout
        });
    });
});
