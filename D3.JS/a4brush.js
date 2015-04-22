function createBrushedVis(divId, usMap, vehicleTheftData) {
    var width = 600,
	height = 400;

    var svg = d3.select(divId).append("svg")
	.attr("width", width)
	.attr("height", height);

    var projection = d3.geo.albersUsa()
	.scale(700)
	.translate([width / 2, height / 2]);

    var path = d3.geo.path()
	.projection(projection);

    svg.append("g")
	.selectAll("path")
	.data(topojson.feature(usMap, usMap.objects.usStates).features)
	.enter().append("path")
	.attr("d", path)
	.attr("class", "state-boundary")

    var bWidth = 400,
	bHeight = 400;

    var barSvg = d3.select(divId).append("svg")
	.attr("width", bWidth)
	.attr("height", bHeight)

    var inTopTen = d3.map()
    vehicleTheftData.forEach(function(d) {
	d.rankings.forEach(function(dd) {
	    if (inTopTen.get(dd.model)) {
		inTopTen.set(dd.model, inTopTen.get(dd.model) + 1);
	    } else {
		inTopTen.set(dd.model, 1);
	    }
	})
    })

    var topTen = inTopTen.entries();
    topTen = _.sortByOrder(topTen, ['value'], false)

    var bars = barSvg.selectAll(".bar").data(topTen.slice(0,20))
	.enter().append("g")
	.attr("class", "bar")

    bars.append("rect")
	.attr("x", function(d,i) {return 120 - 2*d.value; })
	.attr("y", function(d, i) { return 30 + i * 16;})
	.attr("width", function(d) { return 2*d.value; })
	.attr("height", 16)

    bars.append("text")
	.attr("x", function(d,i) {return 124; })
	.attr("y", function(d, i) { return (i+1) * 16 + 27; })
	.style("text-anchor", "start")
	.text(function(d) { return d.key; })
}

function processData(errors, usMap, vehicleTheftData) {
    console.log("Errors", errors)
    createBrushedVis("#brushing", usMap, vehicleTheftData);
}

queue()
    .defer(d3.json, "http://www.cis.umassd.edu/~dkoop/cis467/us-states.json")
    .defer(d3.json, "http://www.cis.umassd.edu/~dkoop/cis467/vehicle-theft.json")
    .await(processData);