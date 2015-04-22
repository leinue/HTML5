// JavaScript Document// tabulate from: http://www.d3noob.org/2013/02/add-html-table-to-your-d3js-graph.html
// DAK: added column classes to tds
function tabulate(divId, data, columns) {
    var table = d3.select(divId).append("table")
        .attr("style", "margin-left: 20px");
    
    var thead = table.append("thead");
    var tbody = table.append("tbody");
    
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });
    
    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td.value")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
	.attr("class", function(d) { return "value " + d.column; })
        .html(function(d) { return d.value; });
    
    return table;
}

function processSchools(divId, mapData, locData) {
    var w = 600,
	h = 650;

    var svg = d3.select(divId).append("svg")
	.attr("width", w)
	.attr("height", h);
    
    var projection = d3.geo.conicConformal()
	.parallels([41 + 43/60, 42 + 41/60])
	.rotate([71 + 1/2, -41])
	.translate([w/2,h/2 + 300])
	.scale(4000)
    
    var path = d3.geo.path()
	.projection(projection)

    lookup = {}
    locData.forEach(function(d) { lookup[d["name"]] = [d["lng"], d["lat"]]; })
    
    svg.selectAll(".state")
	.data(mapData.features)
	.enter().append("path")
	.attr("d", path)
	.style("stroke", "black")
	.style("fill", "none")

    svg.selectAll(".school")
	.data(locData)
	.enter().append("circle")
	.attr("class", "school")
	.attr("cx", function(d) { return projection([d["lng"], d["lat"]])[0]; })
	.attr("cy", function(d) { return projection([d["lng"], d["lat"]])[1]; })
	.attr("r", 5)
	.classed("highlight", false);

    return projection;
}

function processGameList(divId, mapData, locData, gameData) {
    gameData.forEach(function(d) {
	d["Score"] = d["HomeScore"] + "-" + d["AwayScore"];
    });
    table = tabulate(divId, gameData, ["Date", "Home", "Away", "Score"])

    function rowMouseEnter() {
	var row = d3.select(this);
	var homeSchool = row.select("td.value.Home").datum().Home;
	var awaySchool = row.select("td.value.Away").datum().Away;
	console.log("ENTER:", homeSchool, awaySchool)
	row.classed("highlight", true);

	var b = d3.select("#map").selectAll(".school")
	    .filter(function(d) { return (d.name == homeSchool || d.name == awaySchool); })
	    .classed("highlight", true);
	d3.select("#map").selectAll(".school").sort(function(a,b) {
	    return ((a.name == homeSchool || a.name == awaySchool ? 1 : 0) -
		    (b.name == homeSchool || b.name == awaySchool ? 1 : 0));});
    }

    function rowMouseLeave() {
	var row = d3.select(this);
	row.classed("highlight", false)

	d3.select("#map").selectAll(".school")
	    .classed("highlight", false);
    }
    
    table.selectAll("tr")
    	.on("mouseover", rowMouseEnter)
	.on("mouseout", rowMouseLeave)

}

function processMapData(errors, mapData, locData, gameData) {
    processSchools("#map", mapData, locData);
    processGameList("#games", mapData, locData, gameData);
}

queue()
    .defer(d3.json, "http://www.cis.umassd.edu/~dkoop/cis467/new-england.geojson")
    .defer(d3.json, "http://www.cis.umassd.edu/~dkoop/cis467/school-locations.json")
    .defer(d3.csv, "http://www.cis.umassd.edu/~dkoop/cis467/little-east-wbball-2014.csv")
    .await(processMapData);