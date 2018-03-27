// Highcharts 4.1.10, Issue #4667: Column Satcked chart - Bar's color opacity not comes to 1 after drillup
QUnit.test('Drilling up left one column semi-opaque (#4667)', function (assert) {

    var drilldownCfg = [
        {
            name: 'Oranges',
            color: '#009900',
            data: [{ name: '1', y: 5 }, { name: '2', y: 2 }, { name: '3', y: 4 }]
        }, {
            name: 'Apples',
            color: '#FE9900',
            data: [{ name: '1', y: 1 }, { name: '2', y: 5 }, { name: '3', y: 2 }]
        }, {
            name: 'Bananas',
            color: '#FE0000',
            data: [{ name: '1', y: 1 }, { name: '2', y: 5 }, { name: '3', y: 2 }]
        }
    ];

    var series = [
        {
            name: 'Oranges',
            color: '#009900',
            data: [{ name: '2014', y: 5, drilldown: 'to' }, { name: '2015', y: 2, drilldown: 'to' }, { name: '2016', y: 4, drilldown: 'to' }]
        }, {
            name: 'Apples',
            color: '#FE9900',
            data: [{ name: '2014', y: 1, drilldown: 'to' }, { name: '2015', y: 5, drilldown: 'to' }, { name: '2016', y: 2, drilldown: 'to' }]
        }
    ];

    var chartConfig = {
        chart: {
            height: 300,
            type: 'column',
            renderTo: 'container',
            events: {
                drilldown: function (event) {
                    // do not drilldown for categories
                    if (typeof event.category === 'number') {
                        return;
                    }

                    drilldownCfg.forEach(function (item) {
                        this.addSingleSeriesAsDrilldown(event.point, item);
                    }, this);

                    this.applyDrilldown();
                }
            }
        },
        drilldown: {
            animation: {
                duration: 500
            },
            series: []
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: false
        },
        title: false,
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                animation: false,
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                },
                stacking: 'normal'
            }
        },
        series: series
    };

    var clock;

    try {

        clock = lolexInstall();

        var chart = new Highcharts.Chart(chartConfig);

        var done = assert.async();

        setTimeout(function () {
            assert.strictEqual(
                chart.series[0].points[0].graphic.attr('opacity'),
                1,
                'First point should be fully opaque'
            );
            done();
        }, 800);

        // Drill down and up in quick succession sparked the bug
        chart.series[0].points[1].doDrilldown();
        chart.drillUp();

        lolexRunAndUninstall(clock);

    } finally {

        lolexUninstall(clock);

    }

});