import * as d3 from 'd3'
;(function() {
  // Don't edit any of this
  var height = 50
  var width = 400

  var svg = d3
    .select('#chart8')
    .select('svg')
    .attr('height', height + 50)
    .attr('width', width)
    .select('g')
    .attr('transform', 'translate(50, 0)')

  var data = [
    { name: 'Panda', weight: 150 },
    { name: 'Cat', weight: 8 },
    { name: 'Horse', weight: 840 },
    { name: 'Pig', weight: 100 }
  ]

  // Build your scales here

  var radiusScale = d3
    .scaleSqrt()
    .domain([0, 1000])
    .range([0, 50])

  var pointScale = d3
    .scalePoint()
    .domain([0, 1, 2, 3])
    .range([0, width - 100])

  // Set your attributes here
  svg
    .selectAll('circle')
    .data(data)
    .attr('cx', function(d, i) {
      return pointScale(i)
    })
    .attr('cy', (height + 50) / 2)
    .attr('r', function(d) {
      return radiusScale(d.weight)
    })
})()
