$(document).ready(function () {
  $("#createAccount").click(function (event) {
    event.preventDefault();

    let user = {
      firstName: $("#inputFirstName").val(),
      lastName: $("#inputLastName").val(),
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
    };

    // AJAX call to register a user
    $.ajax({
      url: "/api/users/register",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(user),
      success: function (response) {
        alert(response.message);
        if (response.statusCode === 201) {
          console.log("User registered successfully");
        }
      },
      error: function (xhr, status, error) {
        console.error("Registration failed: " + error);
      },
    });
  });
});

$(document).ready(function () {
  $("#signIn").click(function (event) {
    event.preventDefault();

    let userCredentials = {
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
    };

    $.ajax({
      url: "/api/users/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(userCredentials),
      success: function (response) {
        // Redirect to dashboard.html on successful login
        window.location.href = "dashboard.html";
      },
      error: function (xhr, status, error) {
        console.error("Login failed: " + error);
        alert("Login failed: Please check your credentials."); // Provide feedback to the user
      },
    });
  });
});

$(document).ready(function () {
  $("#createAccount").click(function (event) {
    event.preventDefault();

    let user = {
      firstName: $("#inputFirstName").val(),
      lastName: $("#inputLastName").val(),
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
    };

    // AJAX call to register a user
    $.ajax({
      url: "/api/users/register",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(user),
      success: function (response) {
        alert(response.message);
        if (response.statusCode === 201) {
          console.log("User registered successfully");
        }
      },
      error: function (xhr, status, error) {
        console.error("Registration failed: " + error);
      },
    });
  });
});

$(document).ready(function () {
  $("#signIn").click(function (event) {
    event.preventDefault();

    let userCredentials = {
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
    };

    $.ajax({
      url: "/api/users/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(userCredentials),
      success: function (response) {
        // Redirect to dashboard.html on successful login
        window.location.href = "dashboard.html";
      },
      error: function (xhr, status, error) {
        console.error("Login failed: " + error);
        alert("Login failed: Please check your credentials."); // Provide feedback to the user
      },
    });
  });
});

// Add Event
$(document).ready(function () {
  $("#addEventButton").click(function (event) {
    event.preventDefault();

    let eventData = {
      eventName: $("#eventName").val(),
      eventDate: $("#eventDate").val(),
      eventTime: $("#eventTime").val(),
      venue: $("#venue").val(),
      aboutEvent: $("#aboutEvent").val(),
      specialNotes: $("#specialNotes").val(),
      type: $('input[name="eventType"]:checked').val(),
      eventPhoto: $("#eventPhoto").val(),
    };

    $.ajax({
      url: "/api/users/addEvent",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(eventData),
      success: function (response) {
        alert(response.message);
        // Optionally redirect or clear the form
        $("#addEventForm")[0].reset();
      },
      error: function (xhr, status, error) {
        console.error("Add event failed: " + error);
        alert("Failed to add event: " + xhr.responseJSON.message);
      },
    });
  });
});

//Manage events
document.addEventListener("DOMContentLoaded", function () {
  fetch("/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const tableBody = document.getElementById("eventsTableBody");
      tableBody.innerHTML = ""; // Clear existing rows

      if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No events found.</td></tr>';
      } else {
        data.forEach((event) => {
          let formattedDate = "N/A"; // Default if date is not valid
          if (event.eventDate) {
            const date = new Date(event.eventDate);
            if (!isNaN(date)) {
              // Check if the date is valid
              formattedDate = date.toLocaleDateString(); // Format the date
            }
          }
          const row = `<tr>
                            <td>${event.eventName}</td>
                            <td>${formattedDate}</td>
                            <td>${event.eventTime}</td>
                            <td>${event.venue}</td>
                            <td>${event.aboutEvent}</td>
                            <td>${event.specialNotes}</td>
                            <td>${event.type}</td>
                            <td><img src="${event.eventPhoto}" alt="Event Photo" style="max-width: 100px;"></td>

                            <td>
                                <button class="btn btn-primary btn-sm">Edit</button>
                                <button class="btn btn-danger btn-sm">Delete</button>
                            </td>
                         </tr>`;
          tableBody.innerHTML += row; // Append new row for each event
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      document.getElementById("eventsTableBody").innerHTML =
        '<tr><td colspan="4">Error loading events.</td></tr>';
    });
});
