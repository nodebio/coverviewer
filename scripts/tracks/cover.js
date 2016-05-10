//CoverViewer Cover track clear
CoverViewer.prototype.CoverTrackClear = function()
{
  //Clear the cover layer
  this.CoverTrackDrawClear();

  //Clear the Label layer
  this.CoverTrackDrawLabelClear();
};

//CoverViewer Cover Track Draw Clear
CoverViewer.prototype.CoverTrackDrawClear = function()
{
  //Get the cover layer
  var canvas = this.cover.Layer(0);

  //Clear
  canvas.Clear();
};

//CoverViewer Cover Track Draw Label Clear
CoverViewer.prototype.CoverTrackDrawLabelClear = function()
{
  //Get the label layer
  var canvas = this.cover.Layer(1);

  //Clear
  canvas.Clear();
};

//CoverViewer Cover Track Show region info
CoverViewer.prototype.CoverTrackTitle = function()
{
  //Show the title
  this.cover.SetTitle(this.cover.title);

  //Format the start point
  var start = jvizMath.FormatNumber(this.cover.draw.start, '.');

  //Format the end point
  var end = jvizMath.FormatNumber(this.cover.draw.end, '.');

  //Show the subtitle
  this.cover.SetSubtitle(' ' + start + '-' + end);
};

//CoverViewer Reset the cover title
CoverViewer.prototype.CoverTrackTitleReset = function()
{
  //Show the title
  this.cover.SetTitle(this.cover.title);

  //Show the subtitle
  this.cover.SetSubtitle('');
};

//CoverViewer Cover Track draw no cover
CoverViewer.prototype.CoverTrackDrawNoCover = function()
{
  //Clear the track
  this.CoverTrackClear();

  //Get the canvas
  var canvas = this.cover.Layer(0);

  //Get the rectangle position x
  var rect_x = this.cover.width/2 - this.cover.nocover.width/2;

  //Get the rectangle position y
  var rect_y = this.cover.height/2 - this.cover.nocover.height/2;

  //Get the rectangle width
  var rect_width = this.cover.nocover.width;

  //Get the rectangle height
  var rect_height = this.cover.nocover.height;

  //Get the rectangle radius
  var rect_radius = this.cover.nocover.radius;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

  //Draw the rectangle fill color
  canvas.Fill(this.cover.nocover.color);

  //Get the no cover title text
  var tit_text = this.cover.nocover.title.text;

  //Calculate the no cover title position x
  var tit_x = this.cover.width/2;

  //Get the no cover title position y
  var tit_y = this.cover.height/2 - this.cover.nocover.height/2 + this.cover.nocover.title.posy;

  //Get the title color
  var tit_color = this.cover.nocover.title.color;

  //Get the title font
  var tit_font = this.cover.nocover.title.font;

  //Get the title size
  var tit_size = this.cover.nocover.title.size;

  //Get the tittle align
  var tit_align = this.cover.nocover.title.align;

  //Draw the title
  canvas.Text({ x: tit_x, y: tit_y, text: tit_text, font: tit_font, size: tit_size, color: tit_color, align: tit_align });
};

//CoverViewer Cover track draw
CoverViewer.prototype.CoverTrackDraw = function(s)
{
  //Save the canvas down layer
	var canvas = this.cover.Layer(0);

	//Clear the layer
	canvas.Clear();

  //Check for adjust the data
  if(this.cover.data === null) //if(this.core.resized === true || this.cover.data === null)
  {
    //Adjust the data
    this.cover.data = this.DataGen(this.cover.draw.height);

    //Apply the Gauss filter
    //this.cover.data = this.GaussFilter(this.cover.data);

    //Show in console
    console.log('CoverViewer: data successful adjusted to draw window');
  }

  //Check the start
  if(typeof s !== 'undefined'){ this.cover.actual = s; }

  //Get the draw start
  this.cover.draw.start = this.cover.actual;

  //Save the length window
  this.cover.draw.length = this.cover.draw.width;

  //Check the start point
  if(this.cover.draw.start < this.draw.start)
  {
    //Replace the start point
    this.cover.draw.start = this.draw.start;
  }

  //Save the end point
  this.cover.draw.end = this.cover.draw.start + this.cover.draw.length;

  //Check the end point
  if(this.draw.end < this.cover.draw.end)
  {
    //Replace the end point
    this.cover.draw.end = this.draw.end;

    //Replace the start point
    this.cover.draw.start = this.cover.draw.end - this.cover.draw.length;
  }

  //Draw the control points
	this.PointsDraw(canvas, this.cover.draw.start, this.cover.draw.end, this.cover.height, this.cover.draw.margin);

  //Get the marks
  var marks = this.MarksChromosome();

  //Read all the marks
  for(var i = 0; i < marks.length; i++)
  {
    //Get the mark
    var m = marks[i];

    //Check the start position
    if(m.end < this.cover.draw.start){ continue; }

    //Check the end position
    if(this.cover.draw.end < m.start){ break; }

    //Get the start position
    var mark_start = Math.max(0, (m.start - this.cover.draw.start)/this.cover.draw.scale);

    //Get the end point
    var mark_end = Math.min(this.cover.draw.width, (m.end - this.cover.draw.start)/this.cover.draw.scale);

    //Get the mark length
    var mark_length = Math.max(1, mark_end - mark_start);

    //Get the start position x
    var mark_x = this.cover.draw.margin.left + mark_start;

    //Get the mark position y
    var mark_y = this.cover.draw.margin.top;

    //Get the mark height
    var mark_height = this.cover.draw.height;

    //Draw the mark rectangle
    canvas.Rect({ x: mark_x, y: mark_y, width: mark_length, height: mark_height });

    //Draw the color
    canvas.Fill({ color: this.marks.fill, opacity: this.marks.opacity.cover });

    //Get the mark position label x
    var markp_x = this.cover.draw.margin.left + (mark_end + mark_start)/2 - this.marks.position.width/2;

    //Get the mark position label y
    var markp_y = this.cover.draw.margin.top - this.marks.position.height - this.marks.position.triangle;

    //Get the mark position label width
    var markp_width = this.marks.position.width;

    //Get the mark position label height
    var markp_height = this.marks.position.height;

    //Get the mark position label radius
    var markp_radius = this.marks.position.radius;

    //Draw the mark position rectangle
    canvas.Rect({ x: markp_x, y: markp_y, width: markp_width, height: markp_height, radius: markp_radius });

    //Fill color
    canvas.Fill(this.marks.position.fill);

    //Create the triangle
    var mtri = [];

    //Get the triangle position x
    var mtri_x = markp_x + this.marks.position.width/2;

    //Get the triangle position y
    var mtri_y = markp_y + this.marks.position.height;

    //Add the first point
    mtri.push([ mtri_x - this.marks.position.triangle, mtri_y ]);

    //Add the middle point
    mtri.push([ mtri_x, mtri_y + this.marks.position.triangle ]);

    //Add the last point
    mtri.push([ mtri_x + this.marks.position.triangle, mtri_y ]);

    //Draw the triangle
    canvas.Line(mtri);

    //Fill color
    canvas.Fill(this.marks.position.fill);

    //Get the text
    var mtext = jvizMath.FormatNumber(m.start) + ' - ' + jvizMath.FormatNumber(m.end);

    //Get the text position x
    var mtext_x = markp_x + this.marks.position.width/2;

    //Get the text position y
    var mtext_y = markp_y + this.marks.position.text.margin;

    //Get the text font
    var mtext_font = this.marks.position.text.font;

    //Get the text size
    var mtext_size = this.marks.position.text.size;

    //Get the text color
    var mtext_color = this.marks.position.text.color;

    //Get the text align
    var mtext_align = this.marks.position.text.align;

    //Draw the text
    canvas.Text({ text: mtext, x: mtext_x, y: mtext_y, color: mtext_color, font: mtext_font, size: mtext_size, align: mtext_align });
  }

  //Lines array
  var lines = [];

  //Initialize the lines array
  for(var j = 0; j < this.bams.num; j++)
  {
    //Initialize the lines array
    lines[j] = [];
  }

  //Real position counter
  var p = this.cover.draw.margin.left;

  //Read all the positions
  for(var i = this.cover.draw.start; i < this.cover.draw.end; i++)
  {
    //Get the cover array
    var cover = (typeof this.cover.data[i] === 'undefined') ? this.bams.empty : this.cover.data[i];

    //Draw the lines
    for(var j = 0; j < this.bams.num; j++)
    {
      //Calculate the y position
      var py = this.cover.height - this.cover.draw.margin.bottom - cover[j];

      //Push
      lines[j].push([p, py]);
    }

    //Increment the counter
    p = p + 1;
  }

  //Draw all the lines
  for(var j = 0; j < this.bams.num; j++)
  {
    //Get the line opacity
    var opacity = (this.bams.active[j] === false)? this.bams.opacity : 1.0;

    //Draw the line
    canvas.Line(lines[j]);

    //Set the line style
    canvas.Stroke({ width: this.cover.stroke, color: this.bams.color[j], opacity: opacity });
  }

  //Initialize the position y for the cover label
  this.cover.label.posy = this.cover.height - this.cover.draw.margin.bottom + this.cover.label.margin;

  //Initialize the height for the line
  this.cover.hover.height = this.cover.draw.height;

  //Show the region info
  this.CoverTrackTitle();
};

//CoverViewer draw label
CoverViewer.prototype.CoverTrackDrawLabel = function(px)
{
  //Get the up layer
	var canvas = this.cover.Layer(1);

	//Clear the canvas
	//canvas.Clear();

  //Save the position x
  var posx = px;

  //Save the position y
  var posy = this.cover.label.posy;

  //Set the rectanle position x
  var rect_x = posx - this.cover.label.width/2;

  //Set the rectanlge width
  var rect_width = this.cover.label.width;

  //Set the rectanlge height
  var rect_height = this.cover.label.height;

  //Set the rectangle radius
  var rect_radius = this.cover.label.radius;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: posy, width: rect_width, height: rect_height, radius: rect_radius });

  //Set the style
  canvas.Fill(this.cover.label.fill);

  //Save the text
  var text_text = jvizMath.FormatNumber(this.cover.hover.position, '.');

  //Save the text font
  var text_font = this.cover.label.text.font;

  //Save the text size
  var text_size = this.cover.label.text.size;

  //Save the text align
  var text_align = this.cover.label.text.align;

  //Save the text color
  var text_color = this.cover.label.text.color;

  //Show the text
  canvas.Text({ text: text_text, x: posx, y: posy + 4, font: text_font, size: text_size, align: text_align, color: text_color });

  //Draw the triangle
  canvas.Polygon([[posx - 6, posy + 2],[posx, posy - 6],[posx + 6, posy + 2]]);

  //Set the style
  canvas.Fill(this.cover.label.fill);
};

//CoverViewer Draw hover line
CoverViewer.prototype.CoverTrackDrawHover = function(px, py)
{
	//Get the up layer
	var canvas = this.cover.Layer(1);

	//Clear the canvas
	canvas.Clear();

	//Reset the circles array
	this.cover.hover.circle = [];

  //Save the position x
  var posx = px;

  //Save the position y
  var posy = py - this.cover.draw.margin.top;

  //Save the real position
  this.cover.hover.position = Math.floor(this.cover.draw.start + posx - this.cover.draw.margin.left);

  //Draw the line
  canvas.Line([[ posx, this.cover.draw.margin.top], [posx, this.cover.draw.margin.top + this.cover.hover.height]]);

  //Add the style
  canvas.Stroke(this.cover.hover.stroke);

  //Get the cover for this position
  var cover = (typeof this.cover.data[this.cover.hover.position] === 'undefined') ? this.bams.empty : this.cover.data[this.cover.hover.position];

  //Create one circle for each bam file
  for(var i = 0; i < this.bams.num; i++)
  {
    //Create the new object circle
    var circ = {};

    //Calculate the position x
    circ.posx = px;

    //Calculate the position y
    circ.posy = this.cover.height - this.cover.draw.margin.bottom - cover[i];

    //Set the radius
    canvas.Circle({ x: circ.posx, y: circ.posy, radius: this.cover.hover.radius });

    //Add the style
    canvas.Fill(this.bams.color[i]);

		//Push the circle
    this.cover.hover.circle.push(circ);
  }

  //Draw the cover value
  this.CoverTrackDrawValue(px, py);
};

//CoverViewer Cover Track draw value label
CoverViewer.prototype.CoverTrackDrawValue = function(px, py)
{
	//Get the up layer
	var canvas = this.cover.Layer(1);

  //Get the cover for this position
  var cover = (typeof this.cover.data[this.cover.hover.position] === 'undefined') ? this.bams.empty : this.data.cover.data[this.cover.hover.position];

  //Check the circles
  for(var i = this.cover.hover.circle.length - 1; i >= 0; i--)
  {
    //Save the difference
    var diff = Math.abs(this.cover.hover.circle[i].posy - py);

    //Check the difference
    if(diff < this.cover.value.mindiff)
    {
      //Save the position x
      var posx = px - this.cover.value.margin;

      //Save the position y
      var posy = this.cover.hover.circle[i].posy - this.cover.value.height/2;

      //Save the rectangle position x
      var rect_x = posx - this.cover.value.width;

      //Save the rectanle width
      var rect_width = this.cover.value.width;

      //Save the rectangle height
      var rect_height = this.cover.value.height;

      //Save the rectangle radius
      var rect_radius = this.cover.value.radius;

      //Draw the rectangle
      canvas.Rect({ x: rect_x, y: posy, width: rect_width, height: rect_height, radius: rect_radius });

      //Set the style
      canvas.Fill(this.bams.color[i]);

      //Create the text
      var text_text = cover[i].toString();

      //Save the text font
      var text_font = this.cover.value.text.font;

      //Save the text color
      var text_color = this.cover.value.text.color;

      //Save the text size
      var text_size = this.cover.value.text.size;

      //Save the text position x
      var text_x = posx - this.cover.value.width/2;

      //Save the text position y
      var text_y = posy + 1;

      //Save the text align
      var text_align = this.cover.value.text.align;

      //Move the text
      canvas.Text({ text: text_text, font: text_font, color: text_color, size: text_size, x: text_x, y: text_y, align: text_align });

      //Change the position x for the triangle
      posx = posx - 1;

      //Change the position y for the triangle
      posy = this.cover.hover.circle[i].posy;

      //Draw the triangle
      canvas.Polygon([[posx,posy-5],[posx+6,posy],[posx,posy+5]]);

      //Set the style
      canvas.Fill(this.bams.color[i]);

      //Exit the loop
      break;
    }
  }
};

//CoverViewer Cover Track mouse move
CoverViewer.prototype.CoverTrackMouseMove = function(x, y)
{
  //Check the status
  if(this.draw.status !== 'cover'){ return; }

  //Check for move
  if(this.cover.mouse === true)
  {
    //Calculate the difference
    var diff = this.cover.click.point - x;

    //Calculate the start point
    this.preview.window.start = this.cover.click.start + diff/this.preview.draw.scale;

    //Draw the region
    this.Move();
  }

  //Check click first
  //if(this.cover.clickfirst === true) { this.cover.clickfirst = false; }

  //Show the hover position
  if(this.cover.draw.margin.left <= x && x <= this.cover.draw.margin.left + this.cover.draw.width)
  {
    //Draw the hover line
    this.CoverTrackDrawHover(x, y);

    //Draw the label
    this.CoverTrackDrawLabel(x);
  }
};

//CoverViewer Cover Track mosue Down event
CoverViewer.prototype.CoverTrackMouseDown = function(x)
{
  //Check the status
  if(this.draw.status !== 'cover'){ return; }

  //Activate the mouse
  this.cover.mouse = true;

  //Activate the click first
  this.cover.click.first = true;

  //Set cursor as move
  $('body').addClass(this.cursor.move);

  //Save the click position
  this.cover.click.point = x;

  //Save the start position
  this.cover.click.start = this.preview.window.start;

  //Destroy the genes info
  this.genes.tooltip.Hide();
};

//CoverViewer Cover track mouse up event
CoverViewer.prototype.CoverTrackMouseUp = function(x)
{
  //Check the status
  if(this.draw.status !== 'cover'){ return; }

  //Set mouse as false
  this.cover.mouse = false;

  //Set default cursor
  $('body').removeClass(this.cursor.move);
};

//CoverViewer Cover Track mouse function event
function CoverViewerCoverTrackEvents(_this)
{
  //Save the ID
  var _id = '#' + _this.cover.id;

  //Mouse up
  $(_id).mouseup(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.CoverTrackMouseUp(e.pageX - $(this).offset().left);

  });

  //Mouse down
  $(_id).mousedown(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.CoverTrackMouseDown(e.pageX - $(this).offset().left);

  });

  //Mouse move
  $(_id).mousemove(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.CoverTrackMouseMove(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);

  });
}
