<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!isset($_FILES['project'])) {
   http_response_code(400);
   echo 'Ez da fitxategirik aurkitu';
   return;
  }

  if ($_POST['kokalekua']=="") {
    //$dir = "world/";
    $dir = "/server/";
  }else {
    $dir =__DIR__ . '/server/'.$_POST['kokalekua'];
    if(!is_dir($dir)){
      mkdir($dir);
    }
    //mkdir ("/home/urtzi/Dokumentuak/projects/world/".$_POST['kokalekua'],0755);
    //$dir = "world/".$_POST['kokalekua'].'/';
    $dir = "/server/".$_POST['kokalekua'].'/';
  }
  $file = $_FILES['project'];
  $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
  if (!in_array($ext, ['qgs', 'cfg', 'png'])) {
   http_response_code(400);
   echo 'Fitxategi mota ez baimendua';
   return;
  }
  $target_dir = __DIR__ . $dir;
  // $target_dir = '/home/urtzi/Dokumentuak/projects/$dir';
  $target_file = $target_dir . basename($file['name']);
  if (!move_uploaded_file($file['tmp_name'], $target_file)) {
   http_response_code(500);
   echo 'Error: Fitxategia igotzerakoan';
   return;
  }

  http_response_code(200);
  echo $target_file.' Karpetan fitxategia egoki igo da';
}