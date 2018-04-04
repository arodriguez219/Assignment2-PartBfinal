function setup(){
  //Creates a rectangular canvas that is 600 x 800
  createCanvas(600, 800);
  //Creates a white background
  background(255);
  //Sets all of the angle measurements to DEGREES
  angleMode(DEGREES);
}

//The function to create a digital clock
function digitalClock(){
  //Moves the digital display above the analog clock
  //translate(50, 50);

  //Initiate the variable, h, and sets it equal to the computer time (hour)
  var h = hour()%12;
  //Handles the issue with noon or midnight
  if((hour() == 0)||(hour() == 12)){
    h = 12;
  }
  //Initiate the variable, m, and sets it equal to the computer time (minute)
  var m = minute();
  //Initiate the variable, s, and sets it equal to the computer time (second)
  var s = second();

  //Displays the time in black on screen based on the computer time
  //Sets the standard text size
  textSize(32);
  //Displays the hour, 01 - 12, in black on the digitalClock
  fill(0);
  text(nf(h,2,0), -75, -300);
  //Displays the 1st spacer in black on the digitalClock
  fill(0);
  text(':', -45, -300);
  //Displays the minute, 00 - 59, in black on the digitalClock
  fill(0);
  text(nf(m,2,0), -15, -300);
  //Displays the 2nd spacer in black on the digitalClock
  fill(0);
  text(':', 15, -300);
  //Displays the second, 00 - 59, in black on the digitalClock
  fill(0);
  text(nf(s,2,0), 45, -300);

  //Handles meridiem for the time (AM or PM)
  if(hour() < 12){
    textSize(32);
    text('AM', 95, -300);
  }else{
    textSize(32);
    text('PM', 95, -300);
  }
}

//The function to create the analog clock
function analogClock(){
  //Moves the shape to the middle of the canvas
  translate(width/2, height/2);

  //Makes the background
  background(255);

  //Declares a variable for r and in this case sets it equal to 300
  var r = int(min(width, height) / 2);

  //Creates two variables, nP and aV, to help make the tick marks for minutes/seconds
  //nP = the # of mins/secs on a clock and aV = angle between two tick marks
  var nP = 60;
  var aV = 6;

  //Declares variables that set the radius for the second, minute, and hour hands
  var sR = r * 0.70;
  var mR = r * 0.55;
  var hR = r * 0.40;

  // Draw the clock background
  fill(0);
  noStroke();
  //Centers the ellipse at the new origin
  ellipseMode(CENTER);
  //Creates an ellipse (circle) at (300, 300) with radius of 300
  ellipse(0, 0, r, r);

  //Declares the variables that determine the placement of the clock hands
  //Subtracting the 90 degrees shifts the start point from East to North
  var s = map(second(), 0, 60, 0, 360) - 90;
  var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, 360) - 90;
  var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, 720) - 90;

  //Draw the minute/second ticks
  // beginShape() will build the points into a single custom shape
  strokeWeight(2);
  //Sets the stroke color to black
  stroke(0);

  //Creates a circular shape with tick marks
  beginShape(POINTS);
  var i = 0;
  while (i < nP){
      //The -90 adjusts to make North (noon) the starting point
      x = cos((aV * i) -90) * 0.85 * r;
      y = sin((aV * i) -90) * 0.85 * r;
      if((i % 5) == 0){
        fill(0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(nf(i,2,0), x, y);
        i++;
      }else{
        //Uses Cartesian coordinates (derived from polar) to place points
        vertex(x, y);
        //Increments counter
        i++;
      }
  }
  //Closes shape loop
  endShape();

  //Second Hand
  //Creates the second hand in bronze with a thickness of 1
  strokeWeight(2);
  //Sets the stroke color to bronze
  stroke(80, 50, 20);
  //Creates the line for the second hand using cos and sin
  line(0, 0, cos(s) * sR, sin(s) * sR);

  //Minute Hand
  //Creates the minute hand in silver with 2 times the thickness of the second hand
  strokeWeight(4);
  //Sets the stroke color to silver
  stroke(192, 192, 192);
  //Creates the line for the minute hand using cos and sin
  line(0, 0, cos(m) * mR, sin(m) * mR);

  //Hour Hand
  //Creates the hour hand in gold with 4 times the thickness of the second hand
  strokeWeight(8);
  //Sets the stroke color to gold
  stroke(212, 175, 55);
  //Creates the line for the hour hand using cos and sin
  line(0, 0, cos(h) * hR, sin(h) * hR);

  //Removes the stroke from the digital display
  noStroke();
}

function draw()
{
  analogClock();
  digitalClock();


}
