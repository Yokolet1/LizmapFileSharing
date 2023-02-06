// Event listener for form submit
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get the file and description from the form
    var file = document.getElementById("projectFile").files[0];
    var description = document.getElementById("description").value;
    // Perform some validation on the file and description
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    if (!description) {
      alert("Please provide a description for the project.");
      return;
    }
    
    // Use the FormData API to send the file and description to the server
    var formData = new FormData();
    formData.append("projectFile", file);
    formData.append("description", description);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/LIZMAP-SERVER-DATA/upload.php", true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Upload successful, show success message
        alert("Project uploaded successfully!");
      }
    };
    
    xhr.send(formData);
  });