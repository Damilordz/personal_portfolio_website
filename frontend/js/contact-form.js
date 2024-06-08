// Add event listener to the contact form submission
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(this);
  const formProps = Object.fromEntries(formData);

  // Send form data to the server
  fetch("https://personal-portfolio-website-api.vercel.app/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formProps),
  })
    .then((response) => response.json()) // Parse response as JSON
    .then((data) => {
      showPopupMessage(data.message, data.status); // Display response message in a popup
      resetFormFields(); // Call the function to reset form fields
    })
    .catch((error) => {
      console.error("Error:", error); // Log any errors
      showPopupMessage("Error sending email, please try again later.", "error"); // Display error message in a popup
    });
});

// Function to show popup message
function showPopupMessage(message, status) {
  const popup = document.getElementById("popupMessage");
  popup.textContent = message;
  popup.className = status === "success" ? "show" : "show error";

  // Hide the popup after 3 seconds
  setTimeout(() => {
    popup.className = "hidden";
  }, 3000);
}

// Function to reset form fields
function resetFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
}
