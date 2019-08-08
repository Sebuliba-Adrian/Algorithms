//custom function to remove item from array
function removeFromArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if(arr[i] === elt) {
			arr.splice(i,1);
		}
	}
}

function heuristic(Point, Goal) {

	//return Math.sqrt(Math.pow(Point.x - Goal.x, 2) + Math.pow(Point.y - Goal.y, 2));
	return Math.abs(Point.i - Goal.i) + Math.abs(Point.j - Goal.j);
}


var cols = 50;
var rows = 50;
var WIDTH = 400;
var HEIGHT = 400;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start;
var end;
var w, h;
var path = [];

function Spot(i,j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if(random(1) < 0.3) {
        this.wall = true
    }

	this.show = function(color) {
      fill(color);
      if(this.wall){
          fill(0);
      }
      noStroke(0);
	  rect(this.i*w, this.j*h, w-1, h-1);
    }

    this.addNeighbors = function(grid) {
		var i = this.i;
		var j = this.j;

		if (i < cols -1 ) {
        this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
        }
        if(j < rows -1){
        this.neighbors.push(grid[i][j + 1]);
        }
        
        if( j > 0) {
        this.neighbors.push(grid[i][j - 1]);
        }

        if(i > 0 && j > 0){
            this.neighbors.push(grid[i - 1][j - 1]); //left and up
        }

        if(i < cols-1 && j > 0){
            this.neighbors.push(grid[i + 1][j - 1]); //to the right and up
        }

        if(i < 0 && j < rows-1){
            this.neighbors.push(grid[i - 1][j + 1]); //to the left and down
        }

        if(i < cols-1 && j < rows-1){
            this.neighbors.push(grid[i + 1][j + 1]); //to the left and down
        }

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

for (var i = 0; i < cols; i++) {
  
    for(var j = 0; j < rows; j++) {
  
        grid[i][j].addNeighbors(grid);
    }
  }

    start = grid[0][0];
    end   = grid[cols-1][rows-1];
    
    start.wall = false;
    end.wall = false;
    openSet.push(start);

}

function draw() {
	if(openSet.length > 0){
        //we can keep going
        var winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if(openSet[i].f < openSet[winner].f) {
                winner = i;
            } 
        } 

            var current = openSet[winner]; //node with lowest found here

            if(openSet[winner] === end){ //if current is the end node we are done
                noLoop();
                console.log("DONE!");
            }

            //Other wise is it is not
            //openSet.remove(current); but no function in js to do this :(
            removeFromArray(openSet, current);
            closedSet.push(current);
            
            //After adding all neighbours to respective nodes, find those specific to current node
            var neighbors = current.neighbors; 
            console.log(neighbors, "itsnssj");

            for (var i =0; i<neighbors.length; i++) { //check every neighbor
                   var neighbor = neighbors[i];
                   if(!closedSet.includes(neighbor) && !neighbor.wall) {
                       var tempG = current.g + 1;
                       //check in open set and ensure that the neighbor has a lesser value of g
                       if(openSet.includes(neighbor)) {
                           if(tempG < neighbor.g) {
                               neighbor.g = tempG;
                           } 
                       } else {
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                    }

                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                   }            
            }

	} else {
        //no solution 
        console.log("no solution");
        noLoop();
        return;

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
    path = [];
    var temp = current;
    path.push(temp);

    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
    for (let i = 0; i < path.length; i++) {
        path[i].show(color(0, 0, 255));
        
    }
}