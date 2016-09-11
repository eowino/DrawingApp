var color = $(".selected").css("background-color");
var sliders = $(".sliders p input");
var $canvas = $("canvas");
var lastEvent;
var mouseDown = false; 
//grabs 1st element in the array of canvas elements 
//"context" in computer graphics is for the computer to know where to draw
var context = $("canvas")[0].getContext("2d"); //grab 2d context

function getRGB(){
  var red = $("#red").val();
  var green = $("#green").val();
  var blue = $("#blue").val();
  return "rgb(" + red + ","+ green + ","+ blue + ")";
}

function changeColor(){
  $("#newColor").css("background-color", getRGB());
}

function setSelected(obj){
  //Deselect sibling elements
    obj.siblings().removeClass("selected");
    //Select clicked element
    obj.addClass("selected");
    //cache current color
    color = obj.css("background-color");
}

//When clicking on control list items
//The 'on' function is great for dynamic elements on a page
$(".controls").on("click", "li", (function(){
    setSelected($(this));
}));

//When new color is selected
$("#revealColorSelect").click(function(){
   changeColor();
  //show color selected or hide the color select
  $("#colorSelect").toggle();
});

sliders.change(changeColor);

//When add new color is selected
$("#addNewColor").click(function(){
  //add li item to control list items
  var $newColor = $("<li></li>");
  $newColor.css("background-color", getRGB());
  $(".controls ul").append($newColor);
  setSelected($newColor);
  
});

//On mouse events on the canvas
  $canvas.mousedown(function(e){
    lastEvent = e;
    mouseDown = true;
  }).mousemove(function(e){
    //Draw lines
    if(mouseDown){
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY); //will start the line
      context.lineTo(e.offsetX, e.offsetY); //move line to location of move event 'e'
      context.strokeStyle = color;
      context.stroke(); //actually draw the line from the co-ordinates above
      lastEvent = e; // *important* update last event as the new value of e
    }
  }).mouseup(function(e){
      mouseDown = false;
  }).mouseleave(function(e){
      mouseDown = false;
  });