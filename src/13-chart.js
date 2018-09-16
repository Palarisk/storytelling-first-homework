import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic

  var margin = { top: 20, right: 20, bottom: 20, left: 60 }

  var width = 400 - margin.left - margin.right

  var height = 600 - margin.top - margin.bottom

  // You'll probably need to edit this one
  var svg = d3
    .select('#chart13')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    var names = datapoints.map(function(d) {
      return d.name
    })

    var animals = datapoints.map(function(d) {
      return d.animal
    })

    var yPositionScale = d3
      .scaleBand()
      .domain(names)
      .range([0, height - margin.bottom])
      .padding(0.3)

    var widthScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, width])

    var colorScale = d3
      .scaleOrdinal()
      .domain(animals)
      .range(['#e5f5f9', '#99d8c9', '#2ca25f'])

    // Add and style your marks here

    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('width', function(d) {
        return widthScale(d.hamburgers)
      })
      .attr('height', 50)
      .attr('y', function(d) {
        return yPositionScale(d.name)
      })
      .attr('x', 0)
      .attr('fill', '#FCC7BB')
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })

    var yAxis = d3.axisLeft(yPositionScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(widthScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
