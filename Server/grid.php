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
            dateTimeLabelFormats: {
                day:"%B %e, %Y, %H:%M:%S",
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
                    let year = date.substring(0,4);
                    console.log("YEAR " +  year);
                    let month = date.substring(6,7);
                    console.log("MONTH " +  month);
                    let day = date.substring(9,11);
                    console.log("DAY " +  day);
                    let hour = date.substring(13,15);
                    console.log("HOUR " + hour );
                    let minute = date.substring(17,19);
                    console.log("MINUTE " + minute);
                    date = Date.UTC(year, month, day, hour, minute);
                    console.log(date);

                    var value = parseInt(point[i]["value"]);
                    var data = [date,value];
                    console.log(data);
                    datas.push(data);
                }

                options.series[0].data = datas;
                var chart = new Highcharts.Chart(options);

                console.log(point);
                //setTimeout(requestData, 1000);
            },
            cache: false
        });
    }


</script>

</body>
</html>
