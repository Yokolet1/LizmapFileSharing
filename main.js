// constante donde esta el elemento de drag and drop
const dropArea = document.querySelector(".dash");
const fileSelector = document.querySelector(".input");
const button = document.querySelector(".btn");
const allowedExtensions = ['.qgs', '.cfg', '.png'];
let files;

button.onclick = ()=>{
    fileSelector.click();
}
// Whe the data is change in input[type=file] is goingo to save the data and call the function
fileSelector.addEventListener("change", function () {
    document.getElementById("eran").innerHTML="";
    files = this.files;
    let dir = document.querySelector(".dirname").value;
    uploadFiles(files,dir);
});
//Drag Over
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
});
//Drag Leave
dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
});
// Drop the data
dropArea.addEventListener("drop", (e)=>{
    e.preventDefault();
    //Files array
    document.getElementById("eran").innerHTML="";
    files = e.dataTransfer.files;
    let dir = document.querySelector(".dirname").value;
    console.log(files);
    uploadFiles(files,dir);
});
function uploadFiles(file,dir) {
    for (let i = 0; i < file.length; i++) {
        const element = file[i];
        const fileExtension = element.name.substr(element.name.lastIndexOf('.')).toLowerCase();
        // Extensiones permitidas
        if (!allowedExtensions.includes(fileExtension)) {
            alert(`Tipo de archivo no permitido: ${element.name}`);
            // salta al siguiente valor del for
            continue;
        }
        // La extension de los datos es correcto
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('project', element);
        formData.append('kokalekua',dir);
        console.log(formData);
        // HTTP POST bidalketa
        xhr.open("POST", "upload.php", true);
        
        xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Erantzuna
            //alert(this.responseText);
            document.getElementById("eran").innerHTML+=this.responseText+"<br>";
        }
        };

        xhr.send(formData);
    }
}
