function createFoodMap(divId, usMap, foods, fips) {
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

    var fipsCodes = d3.map();
    fips.forEach(function(d) { fipsCodes.set(d.STATE, +d.FIPS); })
    console.log(fipsCodes);

    var foodData = d3.map();
    foods.forEach(function(d) { foodData.set(fipsCodes.get(d.State.toUpperCase()), d.Food);})
    console.log(foodData);

    var foodDomain = _.uniq(foods.map(function(d) { return d.Food; }))
    var foodColor = d3.scale.category20().domain(foodDomain);
    console.log(foodColor("Barbeque"))
    console.log(foodColor("Mexican Food"))

    // what about Other category?
    var legend = svg.selectAll(".legend")
	.data(foodDomain)
	.enter().append("g")
	.attr("class", "legend")
	.attr("transform", function(d,i) { return "translate(0," + (height - 20 - 20*i) + ")";});

    legend.append("rect")
	.attr("x", width-20)
	.attr("width", 16)
	.attr("height", 16)
	.style("fill", foodColor)

    legend.append("text")
	.attr("x", width-24)
	.attr("y", 13)
	.attr("text-anchor", "end")
	.text(function(d) { return d;})
    
    svg.append("g")
	.selectAll("path")
	.data(topojson.feature(usMap, usMap.objects.states).features)
	.enter().append("path")
	.attr("d", path)
	.attr("fill", function(d) { return foodColor(foodData.get(d.id)); })
	.attr("class", "state-boundary")
}

function processData(errors, usMap, foods, fips) {
    createFoodMap("#food", usMap, foods, fips);
}

queue()
    .defer(d3.json, "http://www.cis.umassd.edu/~dkoop/cis467/us-states.json")
    .defer(d3.tsv, "state-food.tsv")
    .defer(d3.tsv, "fips-state.tsv")
    .await(processData);// JavaScript Document