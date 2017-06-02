var margin = {top: 20, right: 20, bottom: 40, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format("d");

var x = d3.scaleBand()
    .range([0, width], .1, 1);


var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y)
        .tickFormat(formatPercent);

function create_svg(selector){
  var svg = d3.select(selector).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  return svg;
}

svg0 = create_svg("#chart0")
svg1 = create_svg("#chart1")
svg2 = create_svg("#chart2")
svg3 = create_svg("#chart3")

$.getJSON('/benchmark/mined', function(data) {
       $("#projs").text(data.mined_proj+' github projects totally mined = '+data.commits+ ' commits');
     });

$.getJSON('/benchmark/vulns', function(data) {
      $("#vulns").text(data.no_vulns+' vulns accepted');
});


d3.json("/benchmark/vulnsmined", function(err,data){
  if(err) console.log("error fetching data");
  else{

    x.domain(data.mined.map(function(d) { return d.class; }));
    y.domain([0, d3.max(data.mined, function(d) { return d.no; })]);

    svg0.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg0.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    svg0.selectAll(".bar")
        .data(data.mined)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.class); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.no); })
        .attr("height", function(d) { return height - y(d.no); });


  }
// data holds the file content


});

d3.json("/benchmark/languages", function(err,data){
  if(err) console.log("error fetching data");
  else{

    var data = {
  labels: [
    'resilience', 'maintainability', 'accessibility',
    'uptime', 'functionality', 'impact'
  ],
  series: [

    {
      label: '2014',
      values: [31, 28, 14, 8, 15, 21]
    },]
};

var chartWidth       = 300,
    barHeight        = 20,
    gapBetweenGroups = 10,
    spaceForLabels   = 150,
    spaceForLegend   = 150;


// Color scale
var chartHeight = barHeight + gapBetweenGroups;

var x = d3.scaleLinear()
        .range([0, chartWidth])

var y =
    d3.scaleLinear()
            .range([chartHeight, 0])

var yAxis = d3.axisLeft(y)
            .tickFormat(' ');

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
/*var bar = chart.selectAll("g")
    .data(data.languages)
    .enter().append("g")
    .attr("transform", function(d) {
      return "translate(" + spaceForLabels + "," + (d* barHeight + gapBetweenGroups * (0.5 + Math.floor(d/data.series.length))) + ")";
    });*/


// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return ""});

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);

// Draw legend
var legendRectSize = 18,
    legendSpacing  = 4;

var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return color(i); })
    .style('stroke', function (d, i) { return color(i); });

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });

  }
// data holds the file content


});

d3.json("/benchmark/year", function(err,data){

  if(err) console.log("error fetching data");
  else{
  x.domain(data.benchbyyear.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data.benchbyyear, function(d) { return d.per; })]);

  svg3.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg3.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

  svg3.selectAll(".bar")
      .data(data.benchbyyear)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.per); })
      .attr("height", function(d) { return height - y(d.per); });

      var yTextPadding = 2;
  svg3.selectAll(".bartext")
  .data(data.benchbyyear)
  .enter()
  .append("text")
  .attr("class", "bartext")
  .attr("text-anchor", "middle")
  .attr("fill", "#5a5a5a")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .attr("x", function(d) {
      return x(d.year)+x.bandwidth()/2;
  })
  //.attr("width", x.bandwidth()/2)
  .attr("y", function(d) { return y(d.per)-yTextPadding; })
  .text(function(d){
       return d.per+'%';
  });

  var padding = -60;
  var padding1 = -75;
  svg3.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("% of vulns");

      svg3.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("transform", "translate("+ (width/2) +","+(height-(padding1/2))+")")  // centre below axis
          .text("Years");
        }


            /*  if(err) console.log("error fetching data");
              else{

                x.domain(data.benchbyyear.map(function(d) { return d.year; }));
                y.domain([0, d3.max(data.benchbyyear, function(d) { return d.no; })]);

                svg3.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

                svg3.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                  .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end");

                svg3.selectAll(".bar")
                    .data(data.benchbyyear)
                  .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d.year); })
                    .attr("width", x.bandwidth())
                    .attr("y", function(d) { return y(d.no); })
                    .attr("height", function(d) { return height - y(d.no); });
              }*/
            // data holds the file content


            });

d3.json("/benchmark/lang", function(err,data){
  if(err) console.log("error fetching data");
  else{
  console.log(data.benchbylang)
  x.domain(data.benchbylang.map(function(d) { return d.lang; }));
  y.domain([0, d3.max(data.benchbylang, function(d) { return d.per; })]);

  svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

  svg2.selectAll(".bar")
      .data(data.benchbylang)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.lang); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.per); })
      .attr("height", function(d) { return height - y(d.per); });

      var yTextPadding = 2;
  svg2.selectAll(".bartext")
  .data(data.benchbylang)
  .enter()
  .append("text")
  .attr("class", "bartext")
  .attr("text-anchor", "middle")
  .attr("fill", "#5a5a5a")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .attr("x", function(d) {
      return x(d.lang)+x.bandwidth()/2;
  })
  //.attr("width", x.bandwidth()/2)
  .attr("y", function(d) { return y(d.per)-yTextPadding; })
  .text(function(d){
       return d.per+'%';
  });

  var padding = -60;
  var padding1 = -75;
  svg2.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("% of vulns");

      svg2.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("transform", "translate("+ (width/2) +","+(height-(padding1/2))+")")  // centre below axis
          .text("Languages");
        }

            });


d3.json("/benchmark/class", function(err,data){
  if(err) console.log("error fetching data");
  else{

    console.log(data.benchmark)
    x.domain(data.benchmark.map(function(d) { return d.class; }));
    y.domain([0, d3.max(data.benchmark, function(d) { return d.per; })]);

    svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    svg1.selectAll(".bar")
        .data(data.benchmark)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.class); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.per); })
        .attr("height", function(d) { return height - y(d.per); });

        var yTextPadding = 2;
    svg1.selectAll(".bartext")
    .data(data.benchmark)
    .enter()
    .append("text")
    .attr("class", "bartext")
    .attr("text-anchor", "middle")
    .attr("fill", "#5a5a5a")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("x", function(d) {
        return x(d.class)+x.bandwidth()/2;
    })
    //.attr("width", x.bandwidth()/2)
    .attr("y", function(d) { return y(d.per)-yTextPadding; })
    .text(function(d){
         return d.per+'%';
    });

    var padding = -60;
    var padding1 = -75;
    svg1.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("% of vulns");

        svg1.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("transform", "translate("+ (width/2) +","+(height-(padding1/2))+")")  // centre below axis
            .text("Patterns");

  }
// data holds the file content


});
