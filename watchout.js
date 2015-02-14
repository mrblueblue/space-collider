
// Parameters
var scoreboard = {
  high: 0,
  current: 0,
  health: 50
};

var width = 1000;
var height = 750;


var space = {
  img: "spaceship.gif",
  x: 500,
  y: 300,
  class: 'spaceship'
};

var donut = {
  img: "donut.gif",
  x: 400,
  y: 300,
  class: 'donut'
};

var monolith = {
  img: "monolith.gif",
  x: 800,
  y: 500,
  class: 'monolith'
}

//Helper functions

var updateCollisions = function() {
  scoreboard.health--;
  d3.selectAll('.health').data([scoreboard.health])
  .text(function(d){return d});
};

var addPoints = function () {
  scoreboard.current++;
  d3.selectAll('.current').data([scoreboard.current])
  .text(function(d){return d});
};

var resetPoints = function(){
  scoreboard.current = 0;
  d3.selectAll('.current').data([scoreboard.current])
  .text(function(d){return d});
};

var updateHighScore = function(){

  if (scoreboard.current > scoreboard.high){
    scoreboard.high = scoreboard.current;
  }

  d3.selectAll('.high').data([scoreboard.high])
  .text(function(d){return d});
};

var resetHealth = function(){

  scoreboard.health = 50;
  d3.selectAll('.health').data([scoreboard.health])
  .text(function(d){return d});
}

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

var createAliens = function(num){
  var aliens = [];

  for (var i = 0; i <= num; i++){
    aliens.push({
      id:i,
      x: Math.random() * 1000,
      y: Math.random() * 750
    });
  }

  return aliens;
};

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .style({'background-image': 'url(space.gif)', 'margin': '30px auto', 'display': 'block', 'border-radius': '20px'});

// d3.selectAll('.high').data([scoreboard.high])
//   .text(function(d){return d});

// d3.selectAll('.current').data([scoreboard.current])
//   .text(function(d){return d});

// d3.selectAll('.health').data([scoreboard.health])
//   .text(function(d){return d});


var players = svg.selectAll("image").data([space,donut, monolith]);

players
  .enter()
  .append("svg:image")
  .attr("xlink:href", function(d){return d.img})
  .attr("width", "35")
  .attr("height", "35")
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y})
  .attr('class', function(d){return d.class});

var spaceship = d3.select('.spaceship');

var drag = d3.behavior.drag().on('drag', function(){
  d3.select('.spaceship').attr('x', d3.event.x)
           .attr('y', d3.event.y);});

d3.selectAll(".spaceship").call(drag);

var enemies =  createEnemies(45);
var aliens = createAliens(5);

var img = svg.selectAll("image").data(enemies);


var imgAlien = svg.selectAll("image").data(aliens)
  .enter()
  .append("svg:image")
  .attr("xlink:href",'alien.png')
  .attr("width", '30')
  .attr("height", '30')
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y})
  .classed('aliens',true)

var asteroids = img.enter()
  .append("svg:image")
  .attr("xlink:href",'asteroid.png')
  .attr("width", '20')
  .attr("height", '20')
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y});

var checkCollision = function(enemy, callback){

    var radiusSum = parseFloat(enemy.attr('width')/2) + parseFloat(spaceship.attr('width')/2);
    var xDiff = parseFloat( enemy.attr('x') ) - parseFloat( spaceship.attr('x') );
    var yDiff = parseFloat( enemy.attr('y') ) - parseFloat( spaceship.attr('y') );
    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

    var collision =  separation < radiusSum;

    if (collision){
      return callback(spaceship, enemy);
    }
  };

var onCollision = function(){
  updateCollisions();
};

var updatePosition = function(){
  asteroids.transition().duration(1500)
    .attr("x",function(d){return Math.random() * 1000})
    .attr("y",function(d){return Math.random() * 1000})
    .tween('custom', function(enemyData){

      var enemy = d3.select(this);

      var startPosition = {
        x: parseFloat(enemy.attr('x')),
        y: parseFloat(enemy.attr('y'))
      };

      var endPosition = {
        x: enemyData.x,
        y: enemyData.y
      };
      return function(t){

        checkCollision(enemy, onCollision);
      };
    });

  imgAlien.transition().duration(1000)
    .attr("x",function(d){return Math.random() * 1000})
    .attr("y",function(d){return Math.random() * 1000})
};

// Enemy Behavior
setInterval(function(){
  updatePosition()}, 2000);

// Monolith behavior
setInterval(function(){
  d3.select('.monolith')
    .attr("x",function(d){return Math.random() * 2000})
    .attr("y",function(d){return Math.random() * 2000})
  }, 500);

//Donut Behavior
setInterval(function(){
  d3.select('.donut').transition().duration(1000)
    .attr("x",function(d){return Math.random() * 1000})
    .attr("y",function(d){return Math.random() * 1000})
  }, 500);

// Point Adder
setInterval(function(){
  addPoints();

  if (scoreboard.health <= 0){
    updateHighScore();
    resetPoints();
    resetHealth();
  }
}, 50)

