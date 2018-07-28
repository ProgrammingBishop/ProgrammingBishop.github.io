// ==================================================
// GLOBALS
// ==================================================

// Genre Array
var genreArray = ["Action", "Adventure", "Fighting", "Misc", 
				  "Platform", "Puzzle", "Racing", "Role-Playing", 
				  "Shooter", "Simulation", "Sports", "Strategy" ];

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

	$("#run").on("click", function() {
		if ( tick < (2016 - 1980) ) {
			var interval = d3.interval(function() {
				update(df[String(year + tick)]);
				tick += 1; 
		
				if ( tick >= (2016 - 1980) ) {
					tick -= 1;
					interval.stop(); 
				}        
			}, 100);
		}
	});

	$("#reset").on("click", function() {
		tick = 0; 
		update(df[String(year + tick)]);
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
		}
	});

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