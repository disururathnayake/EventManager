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

// $(document).ready(function () {
//   $("#signIn").click(function (event) {
//     event.preventDefault();

//     let userCredentials = {
//       email: $("#inputEmail").val(),
//       password: $("#inputPassword").val(),
//     };

//     $.ajax({
//       url: "/api/users/login",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(userCredentials),
//       success: function (response) {
//         // Redirect to dashboard.html on successful login
//         window.location.href = "dashboard.html";
//       },
//       error: function (xhr, status, error) {
//         console.error("Login failed: " + error);
//         alert("Login failed: Please check your credentials."); // Provide feedback to the user
//       },
//     });
//   });
// });

// $(document).ready(function () {
//   $("#createAccount").click(function (event) {
//     event.preventDefault();

//     let user = {
//       firstName: $("#inputFirstName").val(),
//       lastName: $("#inputLastName").val(),
//       email: $("#inputEmail").val(),
//       password: $("#inputPassword").val(),
//     };

//     // AJAX call to register a user
//     $.ajax({
//       url: "/api/users/register",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(user),
//       success: function (response) {
//         alert(response.message);
//         if (response.statusCode === 201) {
//           console.log("User registered successfully");
//         }
//       },
//       error: function (xhr, status, error) {
//         console.error("Registration failed: " + error);
//       },
//     });
//   });
// });

// $(document).ready(function () {
//   $("#signIn").click(function (event) {
//     event.preventDefault();

//     let userCredentials = {
//       email: $("#inputEmail").val(),
//       password: $("#inputPassword").val(),
//     };

//     $.ajax({
//       url: "/api/users/login",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(userCredentials),
//       success: function (response) {
//         // Redirect to dashboard.html on successful login
//         window.location.href = "dashboard.html";
//       },
//       error: function (xhr, status, error) {
//         console.error("Login failed: " + error);
//         alert("Login failed: Please check your credentials."); // Provide feedback to the user
//       },
//     });
//   });
// });

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
        // Redirect based on the user's role
        if (response.role === "admin") {
          window.location.href = "adminDashboard.html";
        } else if (response.role === "user") {
          window.location.href = "dashboard.html";
        } else {
          alert("Invalid role or access.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Login failed: " + error);
        alert("Login failed: Please check your credentials.");
      },
    });
  });
});


//logout
$(document).ready(function() {
  $('#logoutButton').click(function() {
      $.ajax({
          url: '/api/users/logout',  // Adjust the URL if necessary
          type: 'POST',
          success: function(response) {
              alert(response.message); // Show logout success message
              window.location.href = '/'; // Redirect to login page
          },
          error: function(xhr, status, error) {
              alert('Error logging out');
          }
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
  // Fetch and display events
  fetch("/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("eventsTableBody");
      tableBody.innerHTML = "";

      if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No events found.</td></tr>';
      } else {
        data.forEach((event) => {
          const row = document.createElement("tr");

          // Create a dropdown for event types
          const typeDropdown = `
            <select class="eventTypeDropdown" disabled>
              <option value="Free for All" ${event.type === "Free for All" ? "selected" : ""}>Free for All</option>
              <option value="Paid - Tickets" ${event.type === "Paid - Tickets" ? "selected" : ""}>Paid - Tickets</option>
            </select>
          `;

          row.innerHTML = `
            <td contenteditable="false">${event.eventName}</td>
            <td contenteditable="false">${new Date(event.eventDate).toLocaleDateString()}</td>
            <td contenteditable="false">${event.eventTime}</td>
            <td contenteditable="false">${event.venue}</td>
            <td contenteditable="false">${event.aboutEvent}</td>
            <td contenteditable="false">${event.specialNotes}</td>
            <td>${typeDropdown}</td>
            <td><img src="${event.eventPhoto}" alt="Event Photo" style="max-width: 100px;"></td>
            <td>
                <button class="btn btn-primary btn-sm editBtn">Edit</button>
                <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
            </td>
          `;

          // Append the row to the table body
          tableBody.appendChild(row);

          // Add event listener to the Edit button
          const editBtn = row.querySelector(".editBtn");
          const typeDropdownElement = row.querySelector(".eventTypeDropdown");
          editBtn.addEventListener("click", function () {
            if (editBtn.textContent === "Edit") {
              // Make the row editable
              const cells = row.querySelectorAll("td[contenteditable]");
              cells.forEach((cell) => cell.setAttribute("contenteditable", "true"));

              // Enable the dropdown
              typeDropdownElement.removeAttribute("disabled");

              editBtn.textContent = "Save";
            } else {
              // Save the updated data
              const updatedEvent = {
                eventName: row.children[0].textContent,
                eventDate: new Date(row.children[1].textContent).toISOString(),
                eventTime: row.children[2].textContent,
                venue: row.children[3].textContent,
                aboutEvent: row.children[4].textContent,
                specialNotes: row.children[5].textContent,
                type: typeDropdownElement.value, // Get the selected value from the dropdown
              };

              // Make an AJAX request to save the changes
              fetch(`/events/${event._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEvent),
              })
                .then((response) => {
                  if (response.ok) {
                    alert("Event updated successfully");
                  } else {
                    alert("Failed to update event");
                  }
                })
                .catch((error) => {
                  console.error("Error updating event:", error);
                });

              // Make the row uneditable
              const cells = row.querySelectorAll("td[contenteditable]");
              cells.forEach((cell) => cell.setAttribute("contenteditable", "false"));

              // Disable the dropdown
              typeDropdownElement.setAttribute("disabled", "true");

              editBtn.textContent = "Edit";
            }
          });

          // Add event listener to the Delete button
          const deleteBtn = row.querySelector(".deleteBtn");
          deleteBtn.addEventListener("click", function () {
            const confirmed = confirm("Are you sure you want to delete this event?");
            if (confirmed) {
              // Make an AJAX request to delete the event
              fetch(`/events/${event._id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  if (response.ok) {
                    // Remove the row from the table
                    row.remove();
                    alert("Event deleted successfully");
                  } else {
                    alert("Failed to delete event");
                  }
                })
                .catch((error) => {
                  console.error("Error deleting event:", error);
                });
            }
          });
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      document.getElementById("eventsTableBody").innerHTML =
        '<tr><td colspan="4">Error loading events.</td></tr>';
    });
});

const addEventCards = (events) => {
  events.forEach(event => {
    let cardHTML = `
      <div class="col s4">
        <div class="card medium">
          
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${event.eventName}</span>
            
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Date : ${event.eventDate} Time : ${event.eventTime}</span>
            <p>${event.aboutEvent}</p>
          </div>
        </div>
      </div>
      
    `;
    $("#eventsCardContainer").append(cardHTML);
  });
}

function fetchEvents() {
  $.get("/reviewevents", (result) => {
    if (result.length > 0) {
      addEventCards(result);
    } else {
      $("#eventsCardContainer").html('<div class="col s12"><p class="center-align">No events found.</p></div>');
    }
  }).fail(() => {
    $("#eventsCardContainer").html('<div class="col s12"><p class="center-align">Error loading events.</p></div>');
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchEvents();
});
