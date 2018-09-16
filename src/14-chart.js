import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic

  var margin = { top: 20, right: 20, bottom: 20, left: 60 }

  var width = 600 - margin.left - margin.right

  var height = 400 - margin.top - margin.bottom

  // You'll probably need to edit this one
  var svg = d3
    .select('#chart14')
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
    // Add and style your marks here
    var names = datapoints.map(function(d) {
      return d.name
    })

    var animals = datapoints.map(function(d) {
      return d.animal
    })

    var xPositionScale = d3
      .scaleBand()
      .domain(names)
      .range([0, width - margin.bottom])
      .padding(0.3)

    var heightScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, height])

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
      .attr('height', function(d) {
        return heightScale(d.hamburgers)
      })
      .attr('width', 50)
      .attr('x', function(d) {
        return xPositionScale(d.name)
      })
      .attr('y', function(d) {
        return height - heightScale(d.hamburgers)
      })

      .attr('fill', function(d) {
        return colorScale(d.animal)
      })

    var yAxis = d3.axisLeft(heightScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(xPositionScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
