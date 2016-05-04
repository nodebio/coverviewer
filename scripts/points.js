//CoverViewer Control Points get near point
CoverViewer.prototype.PointsNear = function(p)
{
  //Get the real point
  return Math.floor(p/this.points.gap);
};

//CoverViewer draw control points
CoverViewer.prototype.PointsDraw = function(canvas, start, end, height, margin)
{
  //Get the start point
  var pstart = this.PointsNear(start) + 1;

  //Loop
  for(var i = pstart; i*this.points.gap <= end; i++)
  {
    //Get the value
    var value = i*this.points.gap;

    //Line position x
    var line_x = margin.left + (value - start);

    //Line position y start
    var line_y_start = margin.top;

    //Line position y end
    var line_y_end = height - this.points.margin;

    //Generate the line
    canvas.Line([[line_x, line_y_start], [line_x, line_y_end]]);

    //Add the line style
    canvas.Stroke(this.points.stroke);

    //Get the point x position
    var lt_x = line_x + this.points.textmargin.left;

    //Get the point y position
    var lt_y = line_y_end - this.points.textmargin.top;

    //Add the text value
    var lt_text = jvizMath.FormatNumber(i, '.') + this.points.letter;

    //Add the text size
    var lt_size = this.points.text.size;

    //Add the text font
    var lt_font = this.points.text.font;

    //Add the text color
    var lt_color = this.points.text.color;

    //Add the text
    canvas.Text({ x: lt_x, y: lt_y, text: lt_text, color: lt_color, font: lt_font, size: lt_size });
  }
};
