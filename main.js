const fileInput = document.querySelector('input[type="file"]');
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const files = fileInput.files;
  const allowedExtensions = ['.qgs', '.cfg', '.png'];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileExtension = file.name.substr(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      alert(`Tipo de archivo no permitido: ${file.name}`);
      continue;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('project', file);
    // HTTP POST bidalketa
    xhr.open("POST", "upload.php", true);
    
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Erantzuna
        alert(this.responseText);
      }
    };
  
    xhr.send(formData);
  }
});
