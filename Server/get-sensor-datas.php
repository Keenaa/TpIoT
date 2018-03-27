<?php
header("Content-type: text/json");


try {
    $bdd = new PDO('mysql:host=localhost;dbname=SecuIot;charset=utf8', 'root', 'root');
} catch (PDOException $e){
    print_r("ERROR : " . $e);
    die();
}
$result = $bdd->query("SELECT time, value FROM sensor_datas", PDO::FETCH_ASSOC);
$result->setFetchMode(PDO::FETCH_OBJ);

$datas = [];

while ($data =  $result->fetch()){
    $date = date('Y, n, j', strtotime($data->time));
    $data->time = $date;
    array_push($datas, $data);
}

echo json_encode($datas);