<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!isset($_FILES['project'])) {
    http_response_code(400);
    echo 'No se ha seleccionado ningún archivo';
    return;
  }

  $file = $_FILES['project'];
  $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
  if (!in_array($ext, ['qgs', 'cfg', 'png'])) {
    http_response_code(400);
    echo 'Tipo de archivo no permitido';
    return;
  }
  $target_dir = __DIR__ . '/server/upload/';
  $target_file = $target_dir . basename($file['name']);
  
  if (!move_uploaded_file($file['tmp_name'], $target_file)) {
    http_response_code(500);
    echo 'Error al subir el archivo';
    return;
  }

  http_response_code(200);
  echo $file['name'].' Archivo subido correctamente';
}