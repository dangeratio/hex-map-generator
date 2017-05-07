
/****************************/
/*  Default Details
/****************************/

var canvas = oCanvas.create({
	canvas: "#canvas"
});

var canvas_array=[];
var map_type = "random";
var iterations = 3;

/****************************/
/*  Map Pieces
/****************************/

function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

var Hex = makeStruct("x y type obj");

function add_hex(in_x, in_y, type) {

	console.log("Adding Hex: ["+in_x+", "+in_y+"]");

  if(in_x == ""){in_x = canvas.width / 2;}
  if(in_y == ""){in_y = canvas.height / 2;}
  if(type==""){
    type = "image(img/grass.jpg)";
  } else if( type=="random" ){
    type_id = getRandomBiome();
    type = getColor(type_id);
  }

  var hex_obj = canvas.display.polygon({
  	x: in_x,
  	y: in_y,
  	sides: 6,
  	radius: 60,
    rotation: 30,
  	fill: type
  });

	// create obj to send to canvas_array
	var hex = new Hex(in_x, in_y, type, hex_obj);

  add_to_array(hex);

  canvas.addChild(hex_obj);

}

function add_to_array(hex) {
  // iterate array to identify if it exists
  var i;
  var replaced=false;
  for (var i=0; i<canvas_array.length; i++){
    if((canvas_array[i].x==hex.x)&&(canvas_array[i].y==hex.y)){
			canvas.removeChild(canvas_array[i].obj);
      canvas_array.splice(i,1);
      replaced=true;
    }
    if (replaced) break;
  }
  // add new item
  canvas_array.push(hex);
}

function getRandomBiome() {
  biome = Math.floor(Math.random() * 8);
  return biome;
}

function getRandomColor() {
  biome = getRandomBiome();
  return getColor(biome);
}

function getColor(biome){
  switch(biome) {
    case 0:
      return "#ddd254";
      break;
    case 1:
      return "#afa642";
      break;
    case 2:
      return "#338e29";
      break;
    case 3:
      return "#8e6429";
      break;
    case 4:
      return "#fcf68d";
      break;
    case 5:
      return "#2f774d";
      break;
    case 6:
      return "#7e7f7e";
      break;
    case 7:
      return "#a5d8a0";
      break;
    default:
      return "black";
  }
  return "black";
}

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// examples
// add_hex(100,100,"green");
// add_hex(150,150,"black");
// add_hex(150+105,150,"black");
// add_hex(150+105+105,150,"black");
// add_hex(150+105+105+105,150,"black");
// add_hex(150+105+105+105+105,150,"black");
// add_hex(150+105,150,"black");
// add_hex(150+105,150,"black");

function draw_iterative_map() {
	draw_initial_board();
	var middle_hex = get_middle_hex(canvas.width / 2, canvas.height / 2);

	for (var i=0; i<iterations; i++){

		//
		// identify connected hex
		// identify new type (based on last and this)
		// add hex
	}


	// examples
	remove_hex(middle_hex.obj);
	add_hex(middle_hex.x,middle_hex.y,"red");

}

function draw_initial_board() {
	  // default start point
	  var x = 100;
	  var y = 100;
	  var height = 184; //121+60
	  var cols = 8;
	  var cols_off_row = 9;
	  var total_rows = 4;
		map_type="#c0c0c0";

	  for (a=0; a<=total_rows; a++) {
	    drawrow(x,y,cols);
	    draw_off_row(x,y,cols_off_row);
	    y=y+height;
	  }
}

function draw_random_map() {

  // default start point
  var x = 100;
  var y = 100;
  var height = 184; //121+60
  var cols = 8;
  var cols_off_row = 9;
  var total_rows = 4;
	map_type = "random";

  for (a=0; a<=total_rows; a++) {
    drawrow(x,y,cols);
    draw_off_row(x,y,cols_off_row);
    y=y+height;
  }
	// alert(canvas_array.length);
}

function draw_off_row(x,y,z) {
  var off = 54;
  var height_off = 92;

  for (i = 0; i < z; i++) {
    z_new = (z + ((i+1) * 107)) - off;
    y_new = y+ height_off
    add_hex(z_new,y_new,map_type);
  }
}

// draw a row of hex
function drawrow(x,y,z) {
  for (i = 0; i < z; i++) {
    z_new = z + ((i+1) * 107);
    add_hex(z_new,y,map_type);
  }
}

function remove_hex(hex){
	// iterate array to identify if it exists
	console.log("Removing Hex: ["+hex.x+", "+hex.y+"]");
  var i;
  var replaced=false;
  for (i=0; i<canvas_array.length; i++){
    if((canvas_array[i].x==hex.x)&&(canvas_array[i].y==hex.y)){
      canvas.removeChild(canvas_array[i].obj);
      canvas_array.splice(i,1);
      replaced=true;
    }
    if (replaced) break;
  }
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function pick_random_border_hex(hex) {
	var near_hexes = get_near_hexes(hex);
	var number_of_hexes = near_hexes.length;

	if (number > 0) {
		return near_hexes[randomIntFromInterval(1,number_of_hexes)];
	} else {
		return 0;
	}
}

function get_near_hexes(hex) {
	//get closest hex and distance to it
	var closest_other = get_closest_hex(hex.x, hex.y);
	var distance = get_distance(hex.x, hex.y, closest_other.x, closest_other.y);
	// add a little distance to range for slight differences between nearest hexes
	distance = distance + (distance * 0.05);
	// iterate all hexes and find all those within the "distance" to nearest, return array of hexes
	var near_hexes;
	for (var i=0; i<canvas_array.length; i++) {
		curr_distance = get_distance(screen_mid_x, screen_mid_y, canvas_array[i].x, canvas_array[i].y);
		if((curr_distance < distance)&&(curr_distance!=0)) {
			near_hexes.push(hex);
		}
	}
	return near_hexes;
}

function get_closest_other_hex(screen_mid_x, screen_mid_y) {
	var closest_hex=canvas_array[0];
	var distance=9999;
	for (var i=0; i<canvas_array.length; i++) {
		curr_distance = get_distance(screen_mid_x, screen_mid_y, canvas_array[i].x, canvas_array[i].y);
		if((curr_distance < distance)&&(curr_distance!=0)) {
			distance = curr_distance;
			closest_hex = canvas_array[i];
		}
	}
	return closest_hex;
}

function get_middle_hex(screen_mid_x, screen_mid_y) {
	var closest_hex=canvas_array[0];
	var distance=9999;
	for (var i=0; i<canvas_array.length; i++) {
		curr_distance = get_distance(screen_mid_x, screen_mid_y, canvas_array[i].x, canvas_array[i].y);
		if(curr_distance < distance) {
			distance = curr_distance;
			closest_hex = canvas_array[i];
		}
	}
	return closest_hex;
}

function get_distance(x1, y1, x2, y2) {
	var a = x1 - x2;
	var b = y1 - y2;
	return Math.sqrt( a*a + b*b );
}


/****************************/
/*  Init / Runtime
/****************************/


// canvas.addChild(button);

var dragOptions = { changeZindex: true };

canvas.setLoop(function () {
});

// draw_iterative_map();
draw_random_map();

// button.bind("click tap", function () {
// 	if (canvas.timeline.running) {
// 		canvas.timeline.stop();
// 	} else {
// 		canvas.timeline.start();
// 	}
// });
