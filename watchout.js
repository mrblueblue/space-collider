// start slingin' some d3 here.
var createEnemies = function(num) {
  var enemies = [];
  for (var i = 0; i <= num; i++){
    enemies.push({
      id: i,
      x: Math.random() * 1000,
      y: Math.random() * 750
    });
  }
  return enemies;
};

var width = 1000,
  height = 750;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .style('background-color', 'black');

var enemies =  createEnemies(30);

var img = svg.selectAll("image").data(enemies);

var asteroid = img.enter()
  .append("svg:image")
  .attr("xlink:href",'asteroid.png')
  .attr("width", '25')
  .attr("height", '25')
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y});

var updatePosition = function(){
  asteroid.transition().duration(1500)
    .attr("x",function(d){return Math.random() * 1000})
    .attr("y",function(d){return Math.random() * 1000});
};

setInterval(function(){
  updatePosition()}, 2000);


// var enemies = svg.selectAll('enemies').data([1,2,3]);

// enemies.enter().append('div')
