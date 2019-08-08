//custom function to remove item from array
function removeFromArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if(arr[i] === elt) {
			arr.splice(i,1);
		}
	}
}

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

    this.addNeighbors = function(grid) {
		var i = this.i;
		var j = this.j;

		if (i < cols -1 ) {
        this.neighors.push(grid[i + 1][j]);
        }
        if (i > 0) {
        this.neighors.push(grid[i - 1][j]);
        }
        if(j < rows -1){
        this.neighors.push(grid[i][j + 1]);
        }
        
        if( j > 0) {
        this.neighors.push(grid[i][j - 1]);
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

            var current = openSet[winner]; //node with lowest found here

            if(openSet[winner] === end){ //if current is the end node we are done
                console.log("DONE!");
            }

            //Other wise is it is not
            //openSet.remove(current); but no function in js to do this :(
            removeFromArray(openSet, current);
            closedSet.push(current);
            
            //After adding all neighbours to respective nodes, find those specific to current node
            var neighbors = current.neighbors; 

            for (var i =0; i<neighbors.length; i++) { //check every neighbor
                   var neighbor = neighbors[i];
                   if(!closedSet.includes(neighbor)){
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
                   }
                   //As you visit each neighbor increase g by 1
                   neighbor.g = current.g + 1;
            }

        }
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