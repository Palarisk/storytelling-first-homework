;(function() {
  /* global d3 */
  // Here is your data
  var countries = [
    {
      name: 'Blahstia',
      continent: 'North America',
      gdp: 40
    },
    {
      name: 'Bleers',
      continent: 'Europe',
      gdp: 12
    },
    {
      name: 'Blolo',
      continent: 'Antarctica',
      gdp: 35
    },
    {
      name: 'Blurben',
      continent: 'North America',
      gdp: 90
    }
  ]

  var widthScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 400])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['North America', 'Europe', 'Antarctica'])
    .range(['#e5f5f9', '#99d8c9', '#2ca25f'])

  // Get the svg with the id of 'chart2'
  var svg = d3
    .select('#chart2')
    .attr('width', 400)
    .attr('height', 200)

  // Get the rectangles inside of it
  svg
    .selectAll('rect')
    .data(countries)
    .attr('height', 50)
    .attr('width', function(d) {
      return widthScale(d.gdp)
    })
    .attr('fill', function(d) {
      return colorScale(d.continent)
    })
})()