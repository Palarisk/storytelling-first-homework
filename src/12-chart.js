import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic

  var margin = { top: 20, right: 20, bottom: 20, left: 20 }

  var width = 400 - margin.left - margin.right

  var height = 200 - margin.top - margin.bottom

  // You'll probably need to edit this one
  var svg = d3
    .select('#chart12')
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
    var xPositionScale = d3
      .scaleLinear()
      .domain([0, 11])
      .range([0, width])

    var radiusScale = d3
      .scaleSqrt()
      .domain([0, 10])
      .range([0, 50])

    var colorScale = d3
      .scaleOrdinal()
      .domain(['dog', 'cat', 'cow'])
      .range(['#e5f5f9', '#99d8c9', '#FCC7BB'])

    // Add and style your marks here

    svg
      .selectAll('circle')
      .data(datapoints)
      .enter()
      .append('circle')
      .attr('r', d => {
        return radiusScale(d.hotdogs)
      })
      .attr('cx', d => {
        return xPositionScale(d.hamburgers)
      })
      .attr('cy', height / 2)
      .attr('fill', d => {
        return colorScale(d.animal)
      })
      .attr('opacity', '0.5')

    var xAxis = d3.axisBottom(xPositionScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
