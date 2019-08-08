var cols = 5;
var rows = 5;
var WIDTH = 400;
var HEIGHT = 400;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start;
var end;
var w, h;


function Spot(i,j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighors = [];

	this.previous = undefined;

	this.show = function(color) {
      fill(color);
      noStroke(0);
	  rect(this.i*w, this.j*h, w-1, h-1);
	}
}
function setup() {
     createCanvas(400,400)
  
     w = WIDTH / cols;
     h = HEIGHT / rows;
     
 ///Making a 2d array
 for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
}		

for (var i = 0; i < cols; i++) {
  
  for(var j = 0; j < rows; j++) {

      grid[i][j] = new Spot(i, j);
  }
}

    start = grid[0][0];
    end   = grid[cols-1][rows-1];

    openSet.push(start);

}

function draw() {
	if(openSet.length > 0){
		//we can keep going
	} else {
		//no solution 
    }
    
    background(0);

    for (var i = 0; i < cols; i++) {
        for ( var j = 0; j < rows; j++ ) {
 
            grid[i][j].show(color(255));
        }
    }

    for (var i =0; i< closedSet.length; i++) {

        closedSet[i].show(color(255, 0, 0));
    }
 
    for (var i =0; i< openSet.length; i++) {
 
        openSet[i].show(color(0, 255, 0))
    }


}