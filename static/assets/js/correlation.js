var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// add the graph canvas to the body of the webpage
var svg = d3.select("#chart0").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    var svg2 = d3.select("#chart1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// load data
d3.json("/correlation/size", function(err,data) {

  if(err) console.log("error fetching data");
  else{
    console.log(data.corr1);
    var xValue = function(d) { return d.all;}, // data -> value
        xScale = d3.scaleLinear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.axisBottom(xScale);

    // setup y
    var yValue = function(d) { return d.vulns;},
        yScale = d3.scaleLinear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.axisLeft(yScale);

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([0, d3.max(data.corr1, function(d) { return d.all; })]);
    yScale.domain([0, d3.max(data.corr1, function(d) { return d.vulns; })]);

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("# commits");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("# mined");

    // draw dots
    svg.selectAll(".dot")
        .data(data.corr1)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", 'blue')
        .on("mouseover", function(d) {
            tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            tooltip.html(d.id + "<br/> (" + xValue(d)
            + ", " + yValue(d) + ")")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });
}

});


d3.json("/correlation/time", function(err,data) {

  if(err) console.log("error fetching data");
  else{
    console.log(data.corr2);
    var xValue = function(d) { return d.time;}, // data -> value
        xScale = d3.scaleLinear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.axisBottom(xScale);

    // setup y
    var yValue = function(d) { return d.all;},
        yScale = d3.scaleLinear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.axisLeft(yScale);

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([0, d3.max(data.corr2, function(d) { return d.time; })]);
    yScale.domain([0, d3.max(data.corr2, function(d) { return d.all; })]);

    // x-axis
    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("# commits");

    // y-axis
    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("# mined");

    // draw dots
    svg2.selectAll(".dot")
        .data(data.corr2)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", 'blue')
        .on("mouseover", function(d) {
            tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            tooltip.html(d.id + "<br/> (" + xValue(d)
            + ", " + yValue(d) + ")")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });
}

});
