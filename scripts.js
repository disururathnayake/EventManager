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


$(document).ready(function () {
  // Fetch available events and populate the dropdown
  $.ajax({
    url: "/events/all", // The endpoint to fetch all events
    type: "GET",
    success: function (events) {
      const eventSelect = $("#event");
      eventSelect.empty(); // Clear any previous options
      eventSelect.append('<option value="">Select an event...</option>'); // Default option

      events.forEach(function (event) {
        eventSelect.append(`<option value="${event.eventId}">${event.eventName}</option>`);
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to fetch events: " + error);
    },
  });
});

$(document).ready(function () {
  $("#bookEventButton").click(function (event) {
    event.preventDefault();

    let bookingData = {
      name: $("#name").val(),
      email: $("#email").val(),
      eventId: $("#event").val(),
      eventName: $("#event option:selected").text(), // Get the event name from dropdown
      tickets: $("#tickets").val(),
      message: $("#message").val(),
    };

    // AJAX call to submit booking data
    $.ajax({
      url: "/events/book", // Ensure this matches your route in `eventsRouter.js`
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(bookingData),
      success: function (response) {
        alert("Booking created successfully! A confirmation email has been sent.");
        // Optionally reset the form after successful booking
        $("#bookingForm")[0].reset();
      },
      error: function (xhr, status, error) {
        console.error("Booking failed: " + error);
        alert("Booking failed: " + xhr.responseJSON.message);
      },
    });
  });
});

$(document).ready(function () {
  // Fetch all bookings and display them
  fetch("/events/bookings")
    .then((response) => response.json())
    .then((bookings) => {
      const tableBody = $("#bookingsTableBody");
      tableBody.empty(); // Clear existing rows

      if (bookings.length === 0) {
        tableBody.append("<tr><td colspan='6'>No bookings found</td></tr>");
      } else {
        bookings.forEach((booking) => {
          const row = `
            <tr>
              <td>${booking.name}</td>
              <td>${booking.email}</td>
              <td>${booking.eventName}</td>
              <td>${booking.tickets}</td>
              <td>${new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>
                <button class="btn btn-primary btn-sm edit-booking" data-id="${booking.bookingId}">Edit</button>
                <button class="btn btn-danger btn-sm delete-booking" data-id="${booking.bookingId}">Delete</button>
              </td>
            </tr>`;
          tableBody.append(row);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching bookings:", error);
      $("#bookingsTableBody").html('<tr><td colspan="6">Error loading bookings.</td></tr>');
    });

  // Handle booking deletion
  $(document).on("click", ".delete-booking", function () {
    const bookingId = $(this).data("id");

    if (confirm("Are you sure you want to delete this booking?")) {
      fetch(`/events/delete/${bookingId}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          location.reload(); // Reload the page after deletion
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
          alert("Failed to delete booking");
        });
    }
  });

  // Handle Edit Booking button click
  $(document).on("click", ".edit-booking", function () {
    const bookingId = $(this).data("id");
    const bookingRow = $(this).closest("tr");
    const name = bookingRow.find("td:eq(0)").text();
    const email = bookingRow.find("td:eq(1)").text();
    const tickets = bookingRow.find("td:eq(3)").text();

    // Populate modal fields with current booking data
    $("#editBookingId").val(bookingId);
    $("#editName").val(name);
    $("#editEmail").val(email);
    $("#editTickets").val(tickets);

    // Show the edit modal
    $("#editBookingModal").modal("show");
  });

  // Handle Booking Edit form submission
  $("#editBookingForm").submit(function (event) {
    event.preventDefault();

    const bookingId = $("#editBookingId").val();
    const updatedBooking = {
      name: $("#editName").val(),
      email: $("#editEmail").val(),
      tickets: $("#editTickets").val(),
    };

    // AJAX call to update booking
    $.ajax({
      url: `/events/update/${bookingId}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(updatedBooking),
      success: function (response) {
        alert("Booking updated successfully!");
        $("#editBookingModal").modal("hide");
        location.reload(); // Optionally refresh the page to show updated booking
      },
      error: function (xhr, status, error) {
        console.error("Error updating booking:", error);
        alert("Failed to update booking");
      },
    });
  });
});

$(document).ready(function () {
  // Fetch all bookings and display them
  fetch("/events/bookings")
    .then((response) => response.json())
    .then((bookings) => {
      const tableBody = $("#bookingsTableBody");
      tableBody.empty(); // Clear existing rows

      if (bookings.length === 0) {
        tableBody.append("<tr><td colspan='6'>No bookings found</td></tr>");
      } else {
        bookings.forEach((booking) => {
          const row = `
            <tr>
              <td>${booking.name}</td>
              <td>${booking.email}</td>
              <td>${booking.eventName}</td>
              <td>${booking.tickets}</td>
              <td>${new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>
                <button class="btn btn-primary btn-sm edit-booking" data-id="${booking.bookingId}">Edit</button>
                <button class="btn btn-danger btn-sm delete-booking" data-id="${booking.bookingId}">Delete</button>
              </td>
            </tr>`;
          tableBody.append(row);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching bookings:", error);
      $("#bookingsTableBody").html('<tr><td colspan="6">Error loading bookings.</td></tr>');
    });

  // Handle booking deletion
  $(document).on("click", ".delete-booking", function () {
    const bookingId = $(this).data("id");

    if (confirm("Are you sure you want to delete this booking?")) {
      fetch(`/events/delete/${bookingId}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          location.reload(); // Reload the page after deletion
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
          alert("Failed to delete booking");
        });
    }
  });
});

$(document).ready(function () {
  // Function to validate inputs
  function validateInput(inputId, errorMsgId, regex, errorMessage) {
      const inputValue = $("#" + inputId).val();
      const isValid = regex.test(inputValue);
      if (!isValid) {
          $("#" + errorMsgId).text(errorMessage);
      } else {
          $("#" + errorMsgId).text("");
      }
      return isValid;
  }

  // Function to validate the entire form
  function validateForm() {
      const isNameValid = validateInput("name", "nameMsg", /^[a-zA-Z\s]+$/, "Please enter a valid full name");
      const isEmailValid = validateInput("email", "emailMsg", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address");
      const isPhoneValid = validateInput("phone", "phoneMsg", /^\d{10}$/, "Phone number must be exactly 10 digits");
      const isQueryValid = validateInput("query", "queryMsg", /^(?!\s*$).+/, "Please enter your query/feedback");

      return isNameValid && isEmailValid && isPhoneValid && isQueryValid;
  }

  // Handling form submission
  $("#queryForm").on("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting normally

      if (validateForm()) {
          // Gather form data
          const formData = {
              name: $("#name").val(),
              email: $("#email").val(),
              phone: $("#phone").val(),
              query: $("#query").val(),
          };

          // Submit the form data via AJAX
          $.ajax({
              url: "/api/feedback", // Update with your backend API URL
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify(formData),
              success: function (response) {
                  // Handle success - you can display a message or redirect the user
                  alert("Your feedback has been submitted successfully!");
                  $("#queryForm")[0].reset(); // Reset the form
              },
              error: function (xhr, status, error) {
                  // Handle error - display the error message
                  $("#errorMessage").text("Failed to submit the feedback. Please try again.");
                  console.error("Error submitting feedback:", error);
              },
          });
      } else {
          $("#errorMessage").text("Please correct the errors and try again.");
      }
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


