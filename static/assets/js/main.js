var margin = {top: 20, right: 20, bottom: 30, left: 40},
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
       $("#projs").text(data.mined_proj+' github projects mined = '+data.commits+ ' commits');
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

d3.json("/benchmark/year", function(err,data){
              if(err) console.log("error fetching data");
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
              }
            // data holds the file content


            });

d3.json("/benchmark/lang", function(err,data){
              if(err) console.log("error fetching data");
              else{

                x.domain(data.benchbylang.map(function(d) { return d.lang; }));
                y.domain([0, d3.max(data.benchbylang, function(d) { return d.no; })]);

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
                    .attr("y", function(d) { return y(d.no); })
                    .attr("height", function(d) { return height - y(d.no); });
              }
            // data holds the file content


            });


d3.json("/benchmark/class", function(err,data){
  if(err) console.log("error fetching data");
  else{

    x.domain(data.benchmark.map(function(d) { return d.class; }));
    y.domain([0, d3.max(data.benchmark, function(d) { return d.no; })]);

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
        .attr("y", function(d) { return y(d.no); })
        .attr("height", function(d) { return height - y(d.no); });
  }
// data holds the file content


});
