<?php
/**
 * Created by PhpStorm.
 * User: meryl
 * Date: 26/03/2018
 * Time: 17:02
 */

require_once("header.php");


?>
    <div id="container" class="with-nav" style="width:100%; height:400px;"></div>
<script src="jquery-3.3.1.min.js"></script>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="highcharts/js/themes/dark-unica.js"></script>

<script>
    var chart;
    var options = {
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'line',
            events: {
                load: requestData()
            }
        },
        title: {
            text: 'Sensor Datas'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e of %b'
            }
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%e. %b', this.x) +': '+ this.y;
            }
        },
        series: [{
            name: 'Value over time',
            data: []
        }]
    };

    function requestData() {

        $.ajax({
            url: 'get-sensor-datas.php',
            success: function(point) {
                var datas = [];

                for(let i = 0; i<point.length; i++){
                    console.log(point[i]['time'])
                    var date = point[i]['time'];

                    var value = parseInt(point[i]["value"]);
                    var data = [date,value];
                    console.log(data);
                    datas.push(data);
                }

                options.series[0].data = datas;
                var chart = new Highcharts.Chart(options);
                console.log(point);
            },
            cache: false
        });
    }


</script>

</body>
</html>
