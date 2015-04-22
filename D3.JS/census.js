function createCensusMap(divId, usMap, censusData) {
    var width = 960,
	height = 500;

    var svg = d3.select(divId).append("svg")
	.attr("width", width)
	.attr("height", height);

    var projection = d3.geo.albersUsa()
	.scale(1000)
	.translate([width / 2, height / 2]);

    var path = d3.geo.path()
	.projection(projection);

    var columnData = d3.map()
    // % Population with Bachelor's Degree (25+)
    censusData.forEach(function(d) { if (d.fips.slice(2,5) == "000") {
	columnData.set(+d.fips.slice(0,2), +d.EDU685213); } });
    console.log(columnData)

    var colExtent = d3.extent(columnData.values());

    var color;

    // change this variable to switch between continuous and segmented
    var continuous = false;
    if (continuous) {
	// -- continuous colormap --
	color = d3.scale.linear()
    	    .domain(colExtent)
    	    .range(["rgb(255,255,204)", "rgb(0,104,55)"])
    	    .interpolate(d3.interpolateHcl);
    } else {
	// -- segmented colormap --
	var color = d3.scale.quantize()
	    .domain(colExtent)
	    .range(d3.range(5).map(function(i) { return "q" + i + "-5"; }));
    }

    var states = svg.append("g")
	.attr("class", "YlGn")
	.selectAll("path")
	.data(topojson.feature(usMap, usMap.objects.states).features)
	.enter().append("path")
	.attr("d", path)

    if (continuous) {
	states.attr("class", "state-boundary")
	    .style("fill", function(d) { return color(columnData.get(d.id)); })
    } else {
	states.attr("class", function(d) {
	    return "state-boundary " + color(columnData.get(d.id));})
    }

    var legendSize = 150;
    var numLevels;
    if (continuous) {
	numLevels = 150;
    } else {
	numLevels = 5;
    }
    var legend = svg.append("g").attr("class", "YlGn");
    var levels = legend.selectAll("levels")
    	.data(d3.range(numLevels))
    	.enter().append("rect")
    	.attr("x", function(d) { return width - legendSize - 20 +
    				 d*legendSize/numLevels;})
    	.attr("y", height-20)
    	.attr("width", legendSize/numLevels)
    	.attr("height", 16)
    	.style("stroke", "none");

    if (continuous) {
    	levels.style("fill", function(d) {
    	    return color(colExtent[0] * (legendSize-d)/legendSize +
        		 colExtent[1] * d/legendSize); })
    } else {
	levels.attr("class", function(d) { return "q" + d + "-" + numLevels; })
    }

    legend.append("text")
    	.attr("x", width - legendSize - 20)
    	.attr("y", height - 24)
    	.attr("text-anchor", "middle")
    	.text(colExtent[0])

    legend.append("text")
    	.attr("x", width - 20)
    	.attr("y", height - 24)
    	.attr("text-anchor", "middle")
    	.text(colExtent[1])

    legend.append("text")
    	.attr("x", width - legendSize/2 - 20)
    	.attr("y", height - 40)
    	.attr("text-anchor", "middle")
    	.text("% with Bachelor's Degree")
    
}

function processData(errors, censusData, usMap) {
    createCensusMap("#census", usMap, censusData);
}

queue()
    .defer(d3.csv, "census-states.csv")
    .defer(d3.json, "http://www.cis.umassd.edu/~dkoop/cis467/us-states.json")
    .await(processData);