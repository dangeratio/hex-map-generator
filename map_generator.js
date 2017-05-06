
/****************************/
/*  Default Details
/****************************/

var canvas = oCanvas.create({
	canvas: "#canvas"
});

var canvas_array=[];

/****************************/
/*  Map Pieces
/****************************/

function addhex(in_x, in_y, type) {

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

  // var hex="";
  // hex.x = in_x;
  // hex.y = in_y;
  // hex.type = type;
  // hex.object = hex_obj;

  //add_to_array(hex);

  canvas.addChild(hex_obj);

}

function add_to_array(hex) {
  // iterate array to identify if it exists
  var i;
  var replaced=false;
  for (i=0; i<canvas_array.length; i++){
    if((canvas_array[i].x==hex.x)&&(canvas_array[i].y==hex.y)){
      canvas.removeChild(canvas_array[i]);
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
// addhex(100,100,"green");
// addhex(150,150,"black");
// addhex(150+105,150,"black");
// addhex(150+105+105,150,"black");
// addhex(150+105+105+105,150,"black");
// addhex(150+105+105+105+105,150,"black");
// addhex(150+105,150,"black");
// addhex(150+105,150,"black");

function drawrandommap() {

  // default start point
  var x = 100;
  var y = 100;
  var height = 184; //121+60
  var cols = 8;
  var cols_off_row = 9;
  var total_rows = 4;

  for (a=0; a<=total_rows; a++) {
    drawrow(x,y,cols);
    draw_off_row(x,y,cols_off_row);
    y=y+height;
  }
}

function draw_off_row(x,y,z) {
  var off = 54;
  var height_off = 92;

  for (i = 0; i < z; i++) {
    z_new = (z + ((i+1) * 107)) - off;
    y_new = y+ height_off
    addhex(z_new,y_new,"random");
  }
}

// draw a row of hex
function drawrow(x,y,z) {
  for (i = 0; i < z; i++) {
    z_new = z + ((i+1) * 107);
    addhex(z_new,y,"random");
  }
}






/****************************/
/*  Init / Runtime
/****************************/


// canvas.addChild(button);

var dragOptions = { changeZindex: true };

canvas.setLoop(function () {
});

drawrandommap();

// button.bind("click tap", function () {
// 	if (canvas.timeline.running) {
// 		canvas.timeline.stop();
// 	} else {
// 		canvas.timeline.start();
// 	}
// });
