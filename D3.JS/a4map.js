
color=["rgb(254,230,206)","rgb(253,174,107)","rgb(230,85,13)","rgb(222,235,247)","rgb(158,202,225)","rgb(49,130,189)","rgb(254,237,222)","rgb(178,24,43)","rgb(214,96,77)","rgb(244,165,130)","rgb(253,219,199)","rgb(209,229,240)","rgb(146,197,222)","rgb(67,147,195)","rgb(33,102,172)","rgb(253,190,133)","rgb(253,141,60)","rgb(217,71,1)","rgb(254,237,222)","rgb(253,190,133)","rgb(253,141,60)","rgb(230,85,13)","rgb(166,54,3)","rgb(254,237,222)","rgb(253,208,162)","rgb(253,174,107)","rgb(253,141,60)","rgb(230,85,13)","rgb(166,54,3)","rgb(254,237,222)","rgb(253,208,162)","rgb(253,174,107)","rgb(253,141,60)","rgb(241,105,19)","rgb(217,72,1)","rgb(140,45,4)","rgb(255,245,235)","rgb(254,230,206)","rgb(253,208,162)","rgb(253,174,107)","rgb(253,141,60)","rgb(241,105,19)","rgb(217,72,1)","rgb(140,45,4)","rgb(255,245,235)","rgb(254,230,206)","rgb(253,208,162)","rgb(253,174,107)","rgb(253,141,60)","rgb(241,105,19)","rgb(217,72,1)","rgb(166,54,3)","rgb(127,39,4)"];
colorChange=["rgb(229,245,224)"	,"rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(35,139,69)","rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)","rgb(237,248,233)","rgb(199,233,192)","rgb(161,217,155)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)","rgb(237,248,233)","rgb(199,233,192)","rgb(161,217,155)","rgb(116,196,118)","rgb(65,171,93)","rgb(35,139,69)","rgb(0,90,50)","rgb(247,252,245)","rgb(229,245,224)","rgb(199,233,192)","rgb(161,217,155)","rgb(116,196,118)","rgb(65,171,93)","rgb(35,139,69)","rgb(0,90,50)","rgb(247,252,245)","rgb(229,245,224)","rgb(199,233,192)","rgb(161,217,155)","rgb(116,196,118)","rgb(65,171,93)","rgb(35,139,69)","rgb(0,109,44)","rgb(0,68,27)","rgb(64,0,75)","rgb(118,42,131)","rgb(153,112,171)","rgb(194,165,207)","rgb(231,212,232)","rgb(247,247,247)","rgb(217,240,211)","rgb(166,219,160)","rgb(90,174,97)","rgb(27,120,55)","rgb(0,68,27)"];
colorChangeRect=["rgb(229,245,224)"	,"rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(35,139,69)"];

function createMostStolenMap(divId, usMap, vehicleTheftData) {
    var width = 1196,
	height = 500;

    var svg = d3.select(divId).append("svg")
	.attr("width", width)
	.attr("height", height);

    var projection = d3.geo.albersUsa()
	.scale(1000)
	.translate([width / 2, height / 2]);

    var path = d3.geo.path()
	.projection(projection);
    
	var topList=new Array();
	var stateList=new Array();

    svg.append("g")
	.selectAll("path")
	.data(topojson.feature(usMap, usMap.objects.usStates).features)
	.enter().append("path")
	.attr("d", path)
	.attr("class", "state-boundary")
	.attr("stroke","rgb(255,255,255)")
	.attr("stroke-width",1)
	.attr("fill", function(d,i){
		for (var j = 0; j < vehicleTheftData.length; j++) {
			topList[j]=vehicleTheftData[j]['rankings'][0]['model'];
			stateList[j]=vehicleTheftData[j]['state'];
		};
		var result=[],hash = {};
    	for (var k = 0, elem; (elem = topList[k]) != null; k++) {
        	if (!hash[elem]) {
           		result.push(elem);
            	hash[elem] = true;
        	}
    	}
		sessionStorage.resultList=JSON.stringify(result);
		for (var k = 0; k < stateList.length; k++) {
			if(stateList[k]==d['properties']['NAME']){
				break;
			}
		};
		var rgbcolor=color[k];
		return rgbcolor;
	})
	/*.on("mouseover",function(d,i){
        d3.select(this)
        .attr("fill","red");
    })
    .on("mouseout",function(d,i){
        d3.select(this)
        .attr("fill",color[k]);
    })*/;
//var dataset = [ 30 , 20 , 45 , 12 , 21 ];
	svg.selectAll('rect')
           .data(JSON.parse(sessionStorage.resultList))
           .enter()
           .append('rect')
           .attr('x',980)
           .attr('y',function(d,i){
                return i * 22;
           })
           .attr('width',20)
           .attr('height',20)
           .attr('fill',function(d,i){
           		return color[i];
           });

    svg.selectAll("text")
	.data(JSON.parse(sessionStorage.resultList))
	.enter()
	.append("text")
	.attr("x",1004)
	.attr("y",function(d,i){
        return i * 22;
    })
	.attr("dx",0)
	.attr("dy",15)
	.text(function(d,i){
		return d;
	});
}

function create2013ChangeMap(divId, usMap, vehicleTheftData) {
    var width = 1196,
	height = 500;

    var svg = d3.select(divId).append("svg")
	.attr("width", width)
	.attr("height", height);

    var projection = d3.geo.albersUsa()
	.scale(1000)
	.translate([width / 2, height / 2]);

    var path = d3.geo.path()
	.projection(projection);
	
	//console.log(vehicleTheftData[0]['change']);

    svg.append("g")
	.selectAll("path")
	.data(topojson.feature(usMap, usMap.objects.usStates).features)
	.enter().append("path")
	.attr("d", path)
	.attr("class", "state-boundary-b")
	.attr('id',function(d,i){
		return d['properties']['NAME']+'-'+i;
	})
	.attr("stroke","#000")
			.attr("stroke-width",1)
			.attr("fill", function(d,i){
				if(i<=49){
					var rate=vehicleTheftData[i]['change'].toString();
						if(rate>=0){
							return colorChange[parseInt(rate.slice(2,4))+14];
						}else{
						if(rate.slice(3,5)<10){
							return colorChange[parseInt(rate.slice(3,5).slice(1,2))+2];
						}
						return colorChange[parseInt(rate.slice(3,5))+4];
					}
				}else{

				}
			})
	/*.on("mouseover",function(d,i){
        d3.select(this)
        .attr("fill",'red');
    })
    .on("mouseout",function(d,i){
        d3.select(this)
        .attr("fill",'red');
    })*/;

	svg.selectAll('rect')
           .data(colorChangeRect)
           .enter()
           .append('rect')
           .attr('x',980)
           .attr('y',function(d,i){
                return i * 22;
           })
           .attr('width',20)
           .attr('height',20)
           .attr('fill',function(d,i){
           		return colorChangeRect[i];
           });

    var changeFlag=["Change"," in","Motor","Vehicle","Theft"];
   	svg.selectAll("text")
	.data(changeFlag)
	.enter()
	.append("text")
	.attr("x",1004)
	.attr("y",function(d,i){
        return i * 22;
    })
	.attr("dx",0)
	.attr("dy",15)
	.text(function(d,i){
		return d;
	});
}



function processData(errors, usMap, vehicleTheftData) {
    console.log("Errors", errors);
    createMostStolenMap("#most-stolen", usMap, vehicleTheftData);
    create2013ChangeMap("#change", usMap, vehicleTheftData);
}

queue()
    .defer(d3.json, "us-states.json")
    .defer(d3.json, "vehicle-theft.json")
    .await(processData);