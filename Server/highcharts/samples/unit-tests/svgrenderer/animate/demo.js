QUnit.test('Animation x-y', function (assert) {

    // Hijack animation
    var clock = lolexInstall();

    var div = document.createElement('div');
    document.body.appendChild(div);

    var ren = new Highcharts.Renderer(
        div,
        600,
        400
    );

    var circ = ren.circle(10, 10, 3)
        .attr({
            fill: 'red'
        })
        .add();

    circ.animate({
        x: 300,
        y: 300
    }, {
        duration: 2000
    });

    setTimeout(function () {
        circ.animate({
            y: 10
        });
    }, 1000);

    setTimeout(function () {
        assert.strictEqual(
            circ.attr('x'),
            300,
            'X went to first destination'
        );
        assert.strictEqual(
            circ.attr('y'),
            10,
            'Y interrupted by second destination'
        );
        document.body.removeChild(div);
    }, 2500);

    // Reset animation
    lolexRunAndUninstall(clock);
});

QUnit.test('Path animation', function (assert) {

    // Hijack animation
    var clock = lolexInstall();

    var div = document.createElement('div');
    document.body.appendChild(div);

    var ren = new Highcharts.Renderer(
        div,
        600,
        400
    );

    var path = ren.path(['M', 10, 30, 'L', 10, 100])
        .attr({
            'stroke-width': 2,
            'stroke': 'blue'
        })
        .add();

    path.animate({
        d: ['M', 300, 330, 'L', 300, 400]
    }, {
        duration: 2000
    });

    setTimeout(function () {
        path.animate({
            d: ['M', 300, 30, 'L', 300, 400]
        }, {
            duration: 100
        });
    }, 1100);

    setTimeout(function () {
        assert.strictEqual(
            path.attr('d'),
            'M 300 30 L 300 400',
            'First animation aborted by shorter second animation'
        );
        document.body.removeChild(div);
    }, 1500);

    // Reset animation
    lolexRunAndUninstall(clock);

});

QUnit.test('Symbol animation', function (assert) {

    // Hijack animation
    var clock = lolexInstall();

    var div = document.createElement('div');
    document.body.appendChild(div);

    var ren = new Highcharts.Renderer(
        div,
        600,
        400
    );

    var symbol = ren.symbol('diamond', 30, 20, 5, 5)
        .attr({
            fill: 'green'
        })
        .add();

    symbol.animate({
        x: 330,
        y: 330
    }, {
        duration: 2000
    });

    setTimeout(function () {
        symbol.animate({
            width: 100,
            height: 100
        });
    }, 1000);

    setTimeout(function () {
        assert.strictEqual(
            symbol.attr('x'),
            330,
            'Final X'
        );
        assert.strictEqual(
            symbol.attr('y'),
            330,
            'Final Y'
        );
        assert.strictEqual(
            symbol.attr('width'),
            100,
            'Final width'
        );
        assert.strictEqual(
            symbol.attr('height'),
            100,
            'Final height'
        );
        document.body.removeChild(div);
    }, 2500);

    // Reset animation
    lolexRunAndUninstall(clock);

});

QUnit.test('Animation x-y, stopped by .attr()', function (assert) {

    // Hijack animation
    var clock = lolexInstall();

    var div = document.createElement('div');
    document.body.appendChild(div);

    var ren = new Highcharts.Renderer(
        div,
        600,
        400
    );

    var circ = ren.circle(10, 10, 3)
        .attr({
            fill: 'red'
        })
        .add();

    circ.animate({
        x: 300,
        y: 300
    }, {
        duration: 1000
    });

    setTimeout(function () {
        circ.attr({
            y: 10
        });
    }, 100);

    setTimeout(function () {
        assert.strictEqual(
            circ.attr('x'),
            300,
            'X went to destination'
        );
        assert.strictEqual(
            circ.attr('y'),
            10,
            'Y interrupted by attr'
        );

        document.body.removeChild(div);
    }, 1500);

    // Reset animation
    lolexRunAndUninstall(clock);
});

QUnit.test('Animation x-y, stopped by .stop()', function (assert) {
    // Hijack animation
    var clock = lolexInstall();

    var div = document.createElement('div');
    document.body.appendChild(div);

    var ren = new Highcharts.Renderer(
        div,
        600,
        400
    );

    var circ = ren.circle(10, 10, 3)
        .attr({
            fill: 'red'
        })
        .add();

    circ.animate({
        x: 300,
        y: 300
    }, {
        duration: 1000
    });

    setTimeout(function () {
        Highcharts.stop(circ, 'y');
    }, 100);

    setTimeout(function () {
        assert.strictEqual(
            circ.attr('x'),
            300,
            'X went to destination'
        );
        assert.notEqual(
            circ.attr('y'),
            300,
            'Y stopped'
        );

        document.body.removeChild(div);
    }, 1500);

    // Reset animation
    lolexRunAndUninstall(clock);
});

QUnit.test('Fill and stroke animation', function (assert) {

    // Hijack animation
    var clock = lolexInstall();

    var div = document.createElement('div');
    document.body.appendChild(div);

    var ren = new Highcharts.Renderer(
        div,
        600,
        400
    );
    var rgbRegex = /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/;

    var circ = ren.circle(200, 200, 100)
        .attr({
            fill: 'rgba(255,255,255,1)',
            stroke: 'rgba(255,255,255,1)',
            'stroke-width': '10px'
        })
        .add();

    circ.animate({
        fill: 'rgba(255,0,0,1)',
        stroke: 'rgba(0,0,255,1)'
    }, {
        duration: 1000
    });

    setTimeout(function () {

        // Fill
        assert.notEqual(
            circ.attr('fill'),
            'rgba(255,255,255,1)',
            'Fill unlike start'
        );
        assert.notEqual(
            circ.attr('fill'),
            'rgba(255,0,0,1)',
            'Fill unlike end'
        );
        assert.ok(
            rgbRegex.test(circ.attr('fill')),
            'Fill is color'
        );

        // Stroke
        assert.notEqual(
            circ.attr('stroke'),
            'rgba(255,255,255,1)',
            'Stroke unlike start'
        );
        assert.notEqual(
            circ.attr('stroke'),
            'rgba(0,0,255,1)',
            'Stroke unlike end'
        );
        assert.ok(
            rgbRegex.test(circ.attr('stroke')),
            'Stroke is color'
        );

        Highcharts.stop(circ);

        document.body.removeChild(div);
    }, 500);

    // Reset animation
    lolexRunAndUninstall(clock);
});

QUnit.test('Fill and stroke animation for series points (#6776)', function (assert) {

    // Hijack animation
    var clock = lolexInstall();


    var div = document.createElement('div');
    div.style.width = '600px';
    document.body.appendChild(div);


    var chart = Highcharts.chart(div, {
            chart: {
                animation: true
            },
            series: [{
                type: 'column',
                data: [1, 2],
                pointPadding: 0,
                groupPAdding: 0,

                borderColor: 'rgb(255,0,0)',
                color: 'rgb(255,255,255)',
                states: {
                    hover: {
                        borderColor: 'rgb(255,255,255)',
                        color: 'rgb(255,0,0)'
                    }
                }
            }]
        }),
        point = chart.series[0].points[0].graphic;

    // hover over the point
    chart.series[0].points[0].setState('hover');

    setTimeout(function () {
        assert.notEqual(
            point.attr('fill'),
            'rgb(255,255,255)',
            'Fill unlike start'
        );
        assert.notEqual(
            point.attr('fill'),
            'rgb(255,0,0)',
            'Fill unlike end'
        );
        assert.notEqual(
            point.attr('stroke'),
            'rgb(255,255,255)',
            'Stroke unlike end'
        );
        assert.notEqual(
            point.attr('stroke'),
            'rgb(255,0,0)',
            'Stroke unlike start'
        );

        setTimeout(function () {
            chart.series[0].points[0].setState('');

            setTimeout(function () {
                assert.notEqual(
                    point.attr('fill'),
                    'rgb(255,255,255)',
                    'Fill unlike end'
                );
                assert.notEqual(
                    point.attr('fill'),
                    'rgb(255,0,0)',
                    'Fill unlike start'
                );
                assert.notEqual(
                    point.attr('stroke'),
                    'rgb(255,255,255)',
                    'Stroke unlike start'
                );
                assert.notEqual(
                    point.attr('stroke'),
                    'rgb(255,0,0)',
                    'Stroke unlike end'
                );
            }, 250);
        }, 500);
    }, 250);

    // Reset animation
    lolexRunAndUninstall(clock);
});


QUnit.test('Fill and stroke animation for series points in 3D (#6776)', function (assert) {

    // Hijack animation
    var clock = lolexInstall();

    var div = document.createElement('div');
    div.style.width = '600px';
    document.body.appendChild(div);


    var chart = Highcharts.chart(div, {
            chart: {
                animation: true,
                options3d: {
                    enabled: true
                }
            },
            series: [{
                type: 'column',
                data: [1, 2],
                pointPadding: 0,
                groupPAdding: 0,

                borderColor: 'rgb(255,0,0)',
                color: 'rgb(255,255,255)',
                states: {
                    hover: {
                        borderColor: 'rgb(255,255,255)',
                        color: 'rgb(255,0,0)'
                    }
                }
            }]
        }),
        point = chart.series[0].points[0].graphic;

    // hover over the point
    chart.series[0].points[0].setState('hover');

    setTimeout(function () {
        assert.notEqual(
            point.attr('fill'),
            'rgb(255,255,255)',
            'Fill unlike start'
        );
        assert.notEqual(
            point.attr('fill'),
            'rgb(255,0,0)',
            'Fill unlike end'
        );

        setTimeout(function () {
            //controller.trigger('mouseover', 450, 250);
            chart.series[0].points[0].setState('');

            setTimeout(function () {
                assert.notEqual(
                    point.attr('fill'),
                    'rgb(255,255,255)',
                    'Fill unlike end'
                );
                assert.notEqual(
                    point.attr('fill'),
                    'rgb(255,0,0)',
                    'Fill unlike start'
                );
            }, 250);
        }, 500);
    }, 250);

    // Reset animation
    lolexRunAndUninstall(clock);
});

QUnit.test('Complete callback', function (assert) {

    var clock = lolexInstall();

    var ren = new Highcharts.Renderer(
        document.getElementById('container'),
        600,
        400
    );

    var circle = ren.circle(10, 100, 10)
        .attr({
            fill: 'blue'
        })
        .add()
        .animate({
            x: 500
        }, {
            complete: function () {
                circle.animate(
                    { y: 300 },
                    { duration: 50 }
                );

                assert.strictEqual(
                    this,
                    circle,
                    'The SVGElement should be the context of complete'
                );
            },
            duration: 50
        });

    setTimeout(function () {
        assert.strictEqual(
            circle.element.getAttribute('cy'),
            '300',
            'Chained animation has run (#7363)'
        );


        circle.animate({
            y: 300
        }, {
            complete: function () {
                assert.strictEqual(
                    this,
                    circle,
                    'The SVGElement should be the context of complete when ' +
                        'skipping animation to equal values (#7146)'
                );
            }
        });
    }, 150);

    // Run and reset animation
    lolexRunAndUninstall(clock);

});

QUnit.test('Animation and text alignment', function (assert) {
    var clock = lolexInstall();

    var btn;
    var ren = new Highcharts.Renderer(
        document.getElementById('container'),
        400,
        400
    );

    var box = {
        x: 10,
        y: 10,
        width: 300,
        height: 380
    };

    ren.rect(box)
        .attr({
            'stroke': 'silver',
            'stroke-width': 1
        })
        .add();

    function setTextAndAlign() {
        btn.attr({
            text: 'Longer text'
        }).align(null, false, box);
    }

    btn = ren.button('Click me')
        .attr({
            align: 'right'
        })
        .add()
        .align({
            align: 'right',
            x: 0,
            y: 0
        }, false, box);

    var initialRight = btn.translateX + btn.getBBox().width;
    setTextAndAlign();

    assert.close(
        btn.translateX + btn.getBBox().width,
        initialRight,
        1,
        'The button should still be right aligned (#7898)'
    );


    // Run and reset animation
    lolexRunAndUninstall(clock);
});
