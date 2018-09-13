;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic

  /* global d3 */
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }

  var width = 400 - margin.left - margin.right

  var height = 400 - margin.top - margin.bottom

  // You'll probably need to edit this one
  var svg = d3
    .select('#chart10')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  const xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  const yPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height, 0])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    console.log('Data is', datapoints)
    // Add and style your marks here

    svg
      .selectAll('circle')
      .data(datapoints)
      .enter()
      .append('circle')
      .attr('r', 7)
      .attr('cx', d => {
        return xPositionScale(d.hamburgers)
      })
      .attr('cy', d => {
        return yPositionScale(d.hotdogs)
      })
      .attr('fill', '#FCC7BB')

    var yAxis = d3.axisLeft(yPositionScale)
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
