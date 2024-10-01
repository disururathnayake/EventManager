$(document).ready(function () {
    // Fetch all feedback and display them
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((feedbacks) => {
        const tableBody = $("#feedbackTableBody");
        tableBody.empty(); // Clear existing rows
  
        if (feedbacks.length === 0) {
          tableBody.append("<tr><td colspan='6'>No feedback found</td></tr>");
        } else {
          feedbacks.forEach((feedback) => {
            const row = `
              <tr>
                <td>${feedback.name}</td>
                <td>${feedback.email}</td>
                <td>${feedback.phone}</td>
                <td>${feedback.query}</td>
                <td>${new Date(feedback.createdAt).toLocaleDateString()}</td>
                <td>
                  <button class="btn btn-primary btn-sm edit-feedback" data-id="${feedback._id}">Edit</button>
                  <button class="btn btn-danger btn-sm delete-feedback" data-id="${feedback._id}">Delete</button>
                </td>
              </tr>`;
            tableBody.append(row);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        $("#feedbackTableBody").html('<tr><td colspan="6">Error loading feedback.</td></tr>');
      });
  
    // Handle feedback deletion
    $(document).on("click", ".delete-feedback", function () {
      const feedbackId = $(this).data("id");
  
      if (confirm("Are you sure you want to delete this feedback?")) {
        fetch(`/api/feedback/${feedbackId}`, { method: "DELETE" })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            location.reload(); // Reload the page after deletion
          })
          .catch((error) => {
            console.error("Error deleting feedback:", error);
            alert("Failed to delete feedback");
          });
      }
    });
  
    // Handle Edit Feedback button click
    $(document).on("click", ".edit-feedback", function () {
      const feedbackId = $(this).data("id");
      const feedbackRow = $(this).closest("tr");
      const name = feedbackRow.find("td:eq(0)").text();
      const email = feedbackRow.find("td:eq(1)").text();
      const phone = feedbackRow.find("td:eq(2)").text();
      const query = feedbackRow.find("td:eq(3)").text();
  
      // Populate modal fields with current feedback data
      $("#editFeedbackId").val(feedbackId);
      $("#editName").val(name);
      $("#editEmail").val(email);
      $("#editPhone").val(phone);
      $("#editQuery").val(query);
  
      // Show the edit modal
      $("#editFeedbackModal").modal("show");
    });
  
    // Handle Feedback Edit form submission
    $("#editFeedbackForm").submit(function (event) {
      event.preventDefault();
  
      const feedbackId = $("#editFeedbackId").val();
      const updatedFeedback = {
        name: $("#editName").val(),
        email: $("#editEmail").val(),
        phone: $("#editPhone").val(),
        query: $("#editQuery").val(),
      };
  
      // AJAX call to update feedback
      $.ajax({
        url: `/api/feedback/${feedbackId}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedFeedback),
        success: function (response) {
          alert("Feedback updated successfully!");
          $("#editFeedbackModal").modal("hide");
          location.reload(); // Optionally refresh the page to show updated feedback
        },
        error: function (xhr, status, error) {
          console.error("Error updating feedback:", error);
          alert("Failed to update feedback");
        },
      });
    });
  });
  