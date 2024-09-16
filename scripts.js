$(document).ready(function() {
   
    $('#createAccount').click(function(event) {
        event.preventDefault(); 

        let user = {
            firstName: $('#inputFirstName').val(),
            lastName: $('#inputLastName').val(),
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val(),
        };

        // AJAX call to register a user
        $.ajax({
            url: '/api/users/register',
            type: 'POST',
            contentType: 'application/json', 
            data: JSON.stringify(user),
            success: function(response) {
                alert(response.message); 
                if (response.statusCode === 201) {
                  
                    console.log('User registered successfully');
                }
            },
            error: function(xhr, status, error) {
                console.error('Registration failed: ' + error);
            }
        });
    });

    
});

$(document).ready(function() {
    $('#signIn').click(function(event) {
        event.preventDefault();

        let userCredentials = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val(),
        };

        $.ajax({
            url: '/api/users/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userCredentials),
            success: function(response) {
                    // Redirect to dashboard.html on successful login
                    window.location.href = 'dashboard.html';
                
            },
            error: function(xhr, status, error) {
                console.error('Login failed: ' + error);
                alert('Login failed: Please check your credentials.'); // Provide feedback to the user
            }
        });
    });
});

$(document).ready(function() {
   
    $('#createAccount').click(function(event) {
        event.preventDefault(); 

        let user = {
            firstName: $('#inputFirstName').val(),
            lastName: $('#inputLastName').val(),
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val(),
        };

        // AJAX call to register a user
        $.ajax({
            url: '/api/users/register',
            type: 'POST',
            contentType: 'application/json', 
            data: JSON.stringify(user),
            success: function(response) {
                alert(response.message); 
                if (response.statusCode === 201) {
                  
                    console.log('User registered successfully');
                }
            },
            error: function(xhr, status, error) {
                console.error('Registration failed: ' + error);
            }
        });
    });

    
});

$(document).ready(function() {
    $('#signIn').click(function(event) {
        event.preventDefault();

        let userCredentials = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val(),
        };

        $.ajax({
            url: '/api/users/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userCredentials),
            success: function(response) {
                    // Redirect to dashboard.html on successful login
                    window.location.href = 'dashboard.html';
                
            },
            error: function(xhr, status, error) {
                console.error('Login failed: ' + error);
                alert('Login failed: Please check your credentials.'); // Provide feedback to the user
            }
        });
    });
});

// Add Event
$(document).ready(function() {
    $('#addEventButton').click(function(event) {
        event.preventDefault();

        let eventData = {
            eventName: $('#eventName').val(),
            eventDate: $('#eventDate').val(),
            eventTime: $('#eventTime').val(),
            venue: $('#venue').val(),
            aboutEvent: $('#aboutEvent').val(),
            specialNotes: $('#specialNotes').val(),
            type: $('input[name="eventType"]:checked').val(),
            eventPhoto: $('#eventPhoto').val() 
        };

        $.ajax({
            url: '/api/users/addEvent',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(eventData),
            success: function(response) {
                alert(response.message);
                // Optionally redirect or clear the form
                $('#addEventForm')[0].reset();
            },
            error: function(xhr, status, error) {
                console.error('Add event failed: ' + error);
                alert('Failed to add event: ' + xhr.responseJSON.message);
            }
        });
    });
});
