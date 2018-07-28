// ==================================================
// GLOBALS
// ==================================================

// Genre Array
var genreArray = ["Action",   "Adventure",  "Fighting", "Misc", 
				  "Platform", "Puzzle",     "Racing",   "Role-Playing", 
				  "Shooter",  "Simulation", "Sports",   "Strategy" ];


// Define Canvas Dimensions
var margin = { top: 50, bottom: 50, left: 100, right: 100 };
var height = 500 - margin.top  - margin.bottom;
var width  = $(".container").width() - margin.left - margin.right;


// Define the Visualization Area
var canvas = d3.select("#visualization")
	.append("svg")
		.attr("width",  width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

var visual = canvas.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


// Setup Scales
var x = d3.scaleLinear()
	.range([0, width])
	.domain([0, 70]);

var y = d3.scaleLinear()
	.range([height, 0])
	.domain([0, 140]);


// Setup Axis
var xAxisCall = d3.axisBottom(x)
	.ticks(10);
	
visual.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxisCall);

var yAxisCall = d3.axisLeft(y)
	.ticks(10);
	
visual.append("g")
    .attr("class", "y axis")
	.call(yAxisCall);
	

// Setup Color Palette
var genreColor = d3.scaleOrdinal(d3.schemeSet3);


// Setup Labels
var xLabel = visual.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
	.text("Number of Publishers");
	
var yLabel = visual.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Global Sales (Millions)");
	
var timeLabel = visual.append("text")
    .attr("y", height -10)
    .attr("x", width - 40)
    .attr("font-size", "60px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
	.text("1980");
	

// Add Tooltip
var tooltip = d3.select("#visualization")
	.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);


// Add Annotations
var annotation1980 = [{
	type: d3.annotationCalloutCircle,
	note: {
	  title: "Not until 1992 when publishers emerged and profit was made.",
	  label: "Click this annotation to skip over the quiet years",
	  wrap: 250
	},
	subject: { radius: 20 },
	x: x(1), y: y(7.07), dy: -20, dx: 20
}];

var annotation1992 = [{
	type: d3.annotationCalloutCircle,
	note: {
	  title: "1992 - 2002 is Exciting!",
	  label: "Video game popularity begin to take form as more publishers enter the industry and more profit globally is being made.",
	  wrap: 250
	},
	subject: { radius: 20 },
	x: x(5), y: y(15.25), dy: -20, dx: 20
}];

var annotation2002 = [{
	type: d3.annotationCalloutCircle,
	note: {
	  title: "Success for Some",
	  label: "In this year genres begin to stand out from each other. Some performed very well like Shooter, Action, and Racing. Others were not too popular like Role-Playing, Strategy, and Platform.",
	  wrap: 250
	},
	subject: { radius: 20 },
	x: x(35), y: y(86.77), dy: -20, dx: 20
}];

var annotation2006 = [{
	type: d3.annotationCalloutCircle,
	note: {
	  title: "Action Games in 2006",
	  label: "With global sales (millions) at $136.16 and 22 publishers, Action game sales skyrocketed.",
	  wrap: 250
	},
	subject: { radius: 20 },
	x: x(22), y: y(136.16), dy: 20, dx: 20
}];

var annotation2008 = [{
	type: d3.annotationCalloutCircle,
	note: {
	  title: "Shooter Games in 2008",
	  label: "With global sales (millions) at $136.39 and 43 publishers, this genre begins its dominance for years to come.",
	  wrap: 250
	},
	subject: { radius: 20 }, 
	x: x(43), y: y(136.39), dy: 20, dx: 20
}];

var annotation2012 = [{
	type: d3.annotationCalloutCircle,
	note: {
		title: "Effects of Recession",
		label: "While all genres take a hit in this year as global sales and participating publishers decline, Shooter games continue their success.",
		wrap: 250
	},
	subject: { radius: 20 }, 
	x: x(59), y: y(122.04), dy: 20, dx: -50
}];

var annotation2013 = [{
	type: d3.annotationCalloutCircle,
	note: {
		title: "Publisher Dropout",
		label: "But the next year many publishers dropped out of the Shooter genre.",
		wrap: 250
	},
	subject: { radius: 20 }, 
	x: x(30), y: y(125.22), dy: 20, dx: -50
}];

var annotation2015 = [{
	type: d3.annotationCalloutCircle,
	note: {
	  title: "Outlook of Video Games",
	  label: "Going forward it seems that game genres are pulling back further with number of publishers and global sales, but Shooter games continue to be profitable with global sales (millions) at $70.70 and number of publishers at 47.",
	  wrap: 250
	},
	subject: { radius: 20}, 
	x: x(47), y: y(70.70), dy: -20, dx: -50
}];

var make1980 = d3.annotation().annotations(annotation1980);
var make1992 = d3.annotation().annotations(annotation1992);
var make2002 = d3.annotation().annotations(annotation2002);
var make2006 = d3.annotation().annotations(annotation2006);
var make2008 = d3.annotation().annotations(annotation2008);
var make2012 = d3.annotation().annotations(annotation2012);
var make2013 = d3.annotation().annotations(annotation2013);
var make2015 = d3.annotation().annotations(annotation2015);


// Annotation Display Rules
visual.append("g").attr("class", "make1980").attr("display", "none").call(make1980);
visual.append("g").attr("class", "make1992").attr("display", "none").call(make1992);
visual.append("g").attr("class", "make2002").attr("display", "none").call(make2002);
visual.append("g").attr("class", "make2006").attr("display", "none").call(make2006);
visual.append("g").attr("class", "make2008").attr("display", "none").call(make2008);
visual.append("g").attr("class", "make2012").attr("display", "none").call(make2012);
visual.append("g").attr("class", "make2013").attr("display", "none").call(make2013);
visual.append("g").attr("class", "make2015").attr("display", "none").call(make2015);


// Add Application Tick
var tick = 0;


// ==================================================
// FUNCTIONS
// ==================================================

// Coerce Numeric Variables
function coercion(data) {
	return data.forEach(function(d) {
		d["Year"]                    = parseInt(d["Year"]);
		d["Global_Sales (Millions)"] = parseFloat(d["Global_Sales (Millions)"]);
	});
}


// Create Data Frame
function createData(data) {
	var genre = {};
	var df    = {};

	// Populate df
	$.each(data, function(i, obs) {
		// Populate genre Array
		if ( $.inArray(obs["Genre"], genre) == -1 ) {
			genre[obs["Genre"]] = { "gl_sales" : 0, "pubs" : [] };
		}
		
		// Populate df Object with Years & Add Genre Object
		if ( $.inArray(obs["Year"], df) == -1 ) {
			df[obs["Year"]] = $.extend(true, {}, genre);
		}
	});

	return df;
}


// Add Values to Genre Array
function addValues(df, data) {
	var year      = null;
	var publisher = null;
	var genre     = null;

	return $.each(data, function(i, obs) {
		year  = obs["Year"];
		pub   = obs["Publisher"];
		genre = obs["Genre"];

		// Increment gl_sales for Publisher for Year
		df[year][genre]["gl_sales"] += obs["Global_Sales (Millions)"];

		// Increment Number of Unique pubs for Year
		if( $.inArray(pub, df[year][genre]["pubs"]) == -1 ) {
			df[year][genre]["pubs"].push(pub);
		}
	});
}


// Count pubs
function countpubs(df, data) {
	return $.each(df, function(i, year) {
		$.each(df[i], function(j, genre) {
			df[i][j]["pubs"] = genre["pubs"].length;
		});
	});
}


// Add Annotations
function displayAnnotations(curYear, targetAnnotation) {
	if ( tick == (curYear - 1980) ) { d3.select(targetAnnotation).attr("display", "block"); }
	if ( tick != (curYear - 1980) ) { d3.select(targetAnnotation).attr("display", "none" ); }
}


// Join Data with Elements
function update(data) {
	// Coerce to D3 Friendly
	var df = []

	$.each(data, function(i, genre) {
		df.push(genre);
	})

	// Transition Time
    var trans = d3.transition()
        .duration(100);

    // JOIN
	var observations = visual.selectAll("circle")
		.data(df);

	// EXIT
    observations.exit()
        .attr("class", "exit")
		.remove();
		
	// ENTER 
	observations.enter()
		.append("circle")
			.attr("class", "enter")
			.attr("fill", function(d, i) { 
				return genreColor(i);
			})
			.attr("r", 15)
			.on("mouseover", function(d, i) {
				tooltip.transition()
					.duration(200)
					.style("opacity", 0.9);
				tooltip.html("<h4>" + genreArray[i] + "</h4>" + 
				             "Global Sales (Millions): $" + (d["gl_sales"]).toFixed(2) + "<br />" + 
							 "Number of Publishers: " + d["pubs"])
					.style("left", (d3.event.pageX +  5) + "px")
					.style("top",  (d3.event.pageY - 28) + "px");
			})
			.on("mouseout", function() {
				tooltip.transition()
					.duration(500)
					.style("opacity", 0);
			})
			.merge(observations)
			.transition(trans)
				.attr("cy", function(d) {
					return y(d.gl_sales);
				})
				.attr("cx", function(d) {
					return x(d.pubs);
				});

	// Add Legend
	var legend = visual.selectAll(".legend")
		.data(genreColor.domain())
		.enter()
			.append("g")
				.attr("class", "legend")
				.attr("transform", function(d, i) {
					return "translate(0, " + i * 20 + ")";
				});

	legend.append("rect")
		.attr("x", width + 50)
		.attr("width",  "1.5rem")
		.attr("height", "1.5rem")
		.style("fill", genreColor);

	legend.append("text")
		.attr("x", width + 50 - 12)
		.attr("y", 6)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d, i) {
			return genreArray[i];
		})
		
	// Update Year
	timeLabel.text( +(tick + 1980) );
}


// ==================================================
// APPLICATION
// ==================================================

// Import Data
d3.csv("./data/output.csv").then(function(data) {
	// Generate Data Frame
	coercion(data);
	df = createData(data);
	addValues(df, data);
	countpubs(df, data);

	// Update Year to be Array
	var year = 1980;

	displayAnnotations(1980, "g.make1980");

	$("#run").on("click", function() {
		if ( tick < (2016 - 1980) ) {
			var interval = d3.interval(function() {
				displayAnnotations(1980, "g.make1980");
				displayAnnotations(1992, "g.make1992");
				update(df[String(year + tick)]);
				tick += 1; 
				

				if ( tick >= (2016 - 1980) ) {
					tick -= 1;
					interval.stop(); 
					displayAnnotations(2015, "g.make2015");
				}       
			}, 100);
		}
	});

	$("#reset").on("click", function() {
		tick = 0; 
		update(df[String(year + tick)]);
		d3.select("g.make1980").attr("display", "block" ); 
		d3.select("g.make1992").attr("display", "none" ); 
		d3.select("g.make2002").attr("display", "none" ); 
		d3.select("g.make2006").attr("display", "none" ); 
		d3.select("g.make2008").attr("display", "none" ); 
		d3.select("g.make2012").attr("display", "none" ); 
		d3.select("g.make2013").attr("display", "none" );
		d3.select("g.make2015").attr("display", "none" );
	});

	$("#back").on("click", function() {
		if ( tick > 0 ) {
			tick -= 1; 
			update(df[String(year + tick)]);
		}
	});

	$("#forward").on("click", function() {
		if ( tick < (2015 - 1980) ) {
			tick += 1; 
			update(df[String(year + tick)]);

			if ( tick == (2009 - 1980) ) {
				d3.select("g.make2008")
					.attr("display", "none");
			}
		}
	});

	$(".make1980").on("click", function() {
		tick = (1992 - 1980);
		update(df[String(year + tick)]);
		displayAnnotations(1980, "g.make1980");
		displayAnnotations(1992, "g.make1992");
	})

	$("#forward, #back").on("click", function() {
		displayAnnotations(1980, "g.make1980");
		displayAnnotations(1992, "g.make1992");
		displayAnnotations(2002, "g.make2002");
		displayAnnotations(2006, "g.make2006");
		displayAnnotations(2008, "g.make2008");
		displayAnnotations(2012, "g.make2012");	
		displayAnnotations(2013, "g.make2013");	
		displayAnnotations(2015, "g.make2015");			
	})

	var $about = $("#about__data");
	var $game  = $("#game__data");

	$("#about").on("click", function() {
		$about.toggleClass("hidden");
		$game.toggleClass("hidden");

		if ( $("#about").text() == "About the Visualization" ) {
			$("#about").text("Return to Visualization")
		} else {
			$("#about").text("About the Visualization")
		}
	});

	update(df[String(year)]);

}).catch(function(error) {
	console.log(error);
});