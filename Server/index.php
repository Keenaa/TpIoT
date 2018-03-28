<?php

try {
    $bdd = new PDO('mysql:host=localhost;dbname=SecuIot;charset=utf8', 'root', 'root');
} catch (PDOException $e){
    print_r("ERROR : " . $e);
    die();
}
$result = $bdd->query("SELECT * FROM sensor_datas", PDO::FETCH_ASSOC);
$result->setFetchMode(PDO::FETCH_OBJ);

require_once("header.php");

?>


<main role="main" class="container with-nav">
    <?php

    if($result->rowCount() != 0) {
        ?>
        <div class="starter-template">
            <h1>Table</h1>
            <br/>
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Time</th>
                    <th scope="col">Value</th>
                </tr>
                </thead>
                <tbody>
                <?php

                while ($datas = $result->fetch()){

                    ?>
                    <tr>
                        <th scope="row"><?php echo $datas->id;?></th>
                        <td><?php echo $datas->sensor_name;?></td>
                        <td><?php echo $datas->time;?></td>
                        <td><?php echo $datas->value;?></td>
                    </tr>
                <?php
                }
                ?>
                </tbody>
            </table>
        </div>
        <?php
    } else {
        ?>

    <h1 class="display-4 text-center">No datas</h1>
        <?php
    }
    ?>

</main>
<script src="jquery-3.3.1.min.js"></script>

<script src="https://code.highcharts.com/highcharts.js"></script>
</body>
</html>