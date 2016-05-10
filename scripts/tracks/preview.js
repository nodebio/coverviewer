//CoverViewer preview track draw
CoverViewer.prototype.PreviewTrackDraw = function()
{
  //Check the status
  if(this.draw.status === 'cover')
  {
    //Draw the preview region
    this.PreviewTrackPreviewDraw();
  }

  //Check for draw the selected chromosome
  else if(this.draw.status === 'chromosome')
  {
    //Draw the selected chromosome
    this.PreviewTrackChromsomeDraw();
  }

  //Check for draw the karyotypes
  else
  {
    //Draw the karyotypes
    this.PreviewTrackKaryotypesDraw();
  }
};

//CoverViewer preview track draw clear
CoverViewer.prototype.PreviewTrackClear = function()
{
  //Clear the first layer
  this.preview.Layer(0).Clear();

  //Clear the second layer
  this.preview.Layer(1).Clear();

  //Clear the third layer
  this.preview.Layer(2).Clear();

  //Clear the fourth layer
  this.preview.Layer(3).Clear();

  //Clear the fifth layer
  this.preview.Layer(4).Clear();
};

//CoverViewer Preview Track draw karyotypes
CoverViewer.prototype.PreviewTrackKaryotypesDraw = function()
{
  //Remove the hand cursor
  this.preview.CursorRemove('hand');

  //Clear all the canvas layers
  this.PreviewTrackClear();

  //Draw the karyotypes
  this.preview.KaryotypesDraw();

  //Hide the action button
  this.preview.ActionHide();

  //Show the title
  this.PreviewTrackKaryotypesTitle();
};

//CoverViewer Preview Track Karyotypes title
CoverViewer.prototype.PreviewTrackKaryotypesTitle = function()
{
  //Set the preview track title
  this.preview.SetTitle('Karyotype');

  //Set the Specie info
  this.preview.SetSubtitle(this.data.specie + ' (' + this.data.assembly + ')');
};

//CoverViewer Preview track karyotypes mouse up
CoverViewer.prototype.PreviewTrackKaryotypesMouseUp = function(x, y)
{
  //Get the clicked chromosome
  var index = this.preview.KaryotypesClick(x, y);

  //Check for null chromosome
  if(index < 0){ return; }

  //Get the chromosome info
  var chr = this.preview.GetChromosomeByIndex(index);

  //Set the chromosome
  this.preview.SetChromosomeNow(index);

  //Set the chromosome status
  this.draw.status = 'chromosome';

  //Show loading
  this.preview.LoadingShow();

  //Draw
  CoverViewerDraw(this);
};

//CoverViewer Preview Track karyotypes mouse move
CoverViewer.prototype.PreviewTrackKaryotypesMouseMove = function(x, y)
{
  //Draw the karyotypes hover
  this.preview.KaryotypesHover(x, y);
};

//CoverViewer Preview track draw chromosome
CoverViewer.prototype.PreviewTrackChromsomeDraw = function()
{
  //Remove the hand cursor
  this.preview.CursorRemove('hand');

  //Clear all the canvas layers
  this.PreviewTrackClear();

  //Draw the chromosome
  this.preview.ChromosomeDraw();

  //Show the action button
  this.preview.ActionShow();

  //Show the title
  this.PreviewTrackChromsomeTitle();
};

//Coverviewer Preview track chromosome title
CoverViewer.prototype.PreviewTrackChromsomeTitle = function()
{
  //Get the chromosome info
  var chr = this.preview.GetChromosomeNowInfo();

  //Format the length
  var l = jvizMath.FormatNumber(chr.length, '.');

  //Set the preview track title
  this.preview.SetTitle('Chromosome ' + chr.id + '&nbsp;&nbsp;(' + l + ' bp)');

  //Set the Specie info
  this.preview.SetSubtitle(this.data.specie + ' (' + this.data.assembly + ')');
};

//CoverViewer Preview track chromosome mouse move
CoverViewer.prototype.PreviewTrackChromsomeMouseMove = function(x, y)
{
  //Draw the position label
  this.preview.ChromosomeDrawPosition(x, y);

  //Check for draw the region label
  this.preview.ChromosomeDrawRegionLabel(x, y);
};

//CoverViewer Preview track chromosome mouse up
CoverViewer.prototype.PreviewTrackChromsomeMouseUp = function(x, y)
{
  //Get the region index
  var index = this.preview.ChromosomeClickRegion(x, y);

  //Check the region index
  if(index < 0){ return; }

  //Get the region
  var region = this.preview.GetRegion(index);

  //Join the region
  var r = jvizRegion.Join(region);

  //Show preview loading
	this.preview.LoadingShow();

	//Show cover loading
	this.cover.LoadingShow();

	//Show genes loading
	this.genes.LoadingShow();

  //Open the region
  CoverViewerGoTo(this, r);
};

//CoverViewer Preview Draw preview region
CoverViewer.prototype.PreviewTrackPreviewDraw = function()
{
  //Remove the hand cursor
  this.preview.CursorRemove('hand');

  //Show the action button
  this.preview.ActionShow();

  //Clear all the canvas layers
  this.PreviewTrackClear();

  //Save the middle canvas
  var canvas = this.preview.Layer(2);

  //Save the start position
  this.preview.draw.start = this.draw.start;

  //Save the end position
  this.preview.draw.end = this.draw.end;

  //Save the draw length
  this.preview.draw.length = this.preview.draw.end - this.preview.draw.start;

  //Calculate the scale
  this.preview.draw.scale = this.preview.draw.length/this.preview.draw.width;

  //Get the preview zone position x
  this.preview.zone.posx = this.preview.draw.margin.left;

  //Get the preview zone position y
  this.preview.zone.posy = this.preview.height/2 - this.preview.zone.height/2;

  //Get the preview zone width
  this.preview.zone.width = this.preview.draw.width;

  //Check for adjust the data
  if(this.core.resized === true || this.preview.data === null)
  {
    //Adjust the data
    this.preview.data = this.DataGen(this.preview.zone.height);

    //Apply the Gauss filter
    //this.preview.data = this.GaussFilter(this.preview.data);

    //Show in console
    console.log('CoverViewer: preview data successful adjusted to draw window');
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
  var p = this.preview.zone.posx;

  //Read all the positions
  for(var i = 0; i < this.preview.zone.width; i++)
  {
    //Get the real index
    var index = Math.floor(this.preview.draw.start + i*this.preview.draw.scale);

    //Get the cover
    var cover = (typeof this.preview.data[index] === 'undefined') ? this.bams.empty : this.preview.data[index];

    //Draw all the lines
    for(var j = 0; j < this.bams.num; j++)
    {
      //Calculate the y position
      var py = this.preview.zone.posy + this.preview.zone.height - cover[j];

      //Push
      lines[j].push([p, py]);
    }

    //Increment the position
    p = p + 1;
  }

  //Draw all the lines
  for(var j = 0; j < this.bams.num; j++)
  {
    //Draw the line
    canvas.Line(lines[j]);

    //Set the line style
    canvas.Stroke({ width: this.preview.stroke, color: this.bams.color[j], opacity: this.preview.opacity });
  }

  //Get the marks for this chromosome
  var marks = this.MarksChromosome();

  //Read all the marks
  for(var i = 0; i < marks.length; i++)
  {
    //Get the mark
    var m = marks[i];

    //Check the start position
    if(m.end < this.preview.draw.start){ continue; }

    //Check the end position
    if(this.preview.draw.end < m.start){ break; }

    //Get the start position
    var mark_start = Math.max(0, (m.start - this.preview.draw.start)/this.preview.draw.scale);

    //Get the end point
    var mark_end = Math.min(this.preview.draw.width, (m.end - this.preview.draw.start)/this.preview.draw.scale);

    //Get the mark length
    var mark_length = Math.max(1, mark_end - mark_start);

    //Get the start position x
    var mark_x = this.preview.zone.posx + mark_start;

    //Get the mark position y
    var mark_y = this.preview.zone.posy;

    //Get the mark height
    var mark_height = this.preview.zone.height;

    //Draw the mark rectangle
    canvas.Rect({ x: mark_x, y: mark_y, width: mark_length, height: mark_height });

    //Draw the color
    canvas.Fill({ color: this.marks.fill, opacity: this.marks.opacity.preview });
  }

  //Calculate the window width
  this.preview.window.width = this.cover.draw.width/this.preview.draw.scale;

  //Calculate the window height
  this.preview.window.height = this.preview.zone.height;

  //Reset the preview start point
  this.preview.window.start = this.cover.actual;

  //Initialize the label position y
  this.preview.label.posy = this.preview.zone.posy + this.preview.zone.height + this.preview.label.margin;

  //Draw the window
  this.PreviewTrackPreviewDrawWindow();

  //Show the region info
  this.PreviewTrackPreviewTitle();
};

//CoverViewer preview track show preview title
CoverViewer.prototype.PreviewTrackPreviewTitle = function()
{
  //Add the chromosome
  var reg = 'Chromosome ' + this.draw.chromosome;

  //Add the start point
  reg = reg + ', start: '+ jvizMath.FormatNumber(this.preview.draw.start, '.');

  //Add the end point
  reg = reg + ', end: ' + jvizMath.FormatNumber(this.preview.draw.end, '.');

  //Show the region info
  this.preview.SetTitle(this.preview.title);

  //Show the subtitle
  this.preview.SetSubtitle(reg);
};

//CoverViewer Draw Preview Window
CoverViewer.prototype.PreviewTrackPreviewDrawWindow = function()
{
  //Get the canvas layer up
  var canvas = this.preview.Layer(3);

  //Clear the layer
	canvas.Clear();

  //Check the start position
  if(this.preview.window.start < 0)
  {
    //Set the start position in 0
    this.preview.window.start = 0;
  }

  //Check if start + length > margin-left + width
  if(this.preview.window.start + this.preview.window.width > this.preview.draw.width)
  {
    //Change the start position
    this.preview.window.start = this.preview.draw.width - this.preview.window.width;
  }

  //Calculate the end position
  this.preview.window.end = this.preview.window.start + this.preview.window.width;

  //Calculate the region start coordinates
  this.preview.region.start = Math.floor(this.preview.draw.start + this.preview.window.start*this.preview.draw.scale);

  //Calculate the region end coordinates
  this.preview.region.end = Math.floor(this.preview.draw.start + this.preview.window.end*this.preview.draw.scale);

  //Get the rectangle position x
  var rect_x = this.preview.window.start + this.preview.draw.margin.left;

  //Get the rectangle position y
  var rect_y = this.preview.zone.posy;

  //Get the rectangle width
  var rect_width = this.preview.window.width;

  //Get the rectangle height
  var rect_height = this.preview.window.height;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height });

  //Add the fill
  canvas.Fill(this.preview.window.fill);

  //Draw label
  this.PreviewTrackPreviewDrawLabel();
};

//CoverViewer Preview Track Draw label
CoverViewer.prototype.PreviewTrackPreviewDrawLabel = function()
{
  //Get the canvas layer up
  var canvas = this.preview.Layer(3);

  //Save the position x
  var posx = this.preview.window.start + this.preview.window.width/2 + this.preview.draw.margin.left;

  //Save the position y
  var posy = this.preview.label.posy;

  //Get the rectangle position x
  var rect_x = posx - this.preview.label.width/2;

  //Get the rectangle position y
  var rect_y = posy;

  //Get the rectangle width
  var rect_width = this.preview.label.width;

  //Get the rectangle height
  var rect_height = this.preview.label.height;

  //Get the rectangle radius
  var rect_radius = this.preview.label.radius;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

  //Set the style
  canvas.Fill(this.preview.label.fill);

  //Get the start point
  var text_start = jvizMath.FormatNumber(this.preview.region.start, '.');

  //Get the end point
  var text_end = jvizMath.FormatNumber(this.preview.region.end, '.');

  //Get the text
  var text_txt = text_start + ' - ' + text_end;

  //Get the text position x
  var text_x = posx;

  //Get the text position y
  var text_y = posy + 4;

  //Get the text font
  var text_font = this.preview.label.text.font;

  //Get the text size
  var text_size = this.preview.label.text.size;

  //Get the text align
  var text_align = this.preview.label.text.align;

  //Get the text color
  var text_color = this.preview.label.text.color;

  //Show the text
  canvas.Text({ text: text_txt, x: text_x, y: text_y, font: text_font, size: text_size, align: text_align, color: text_color });

  //Draw the triangle
  canvas.Polygon([[posx - 6, posy + 2],[posx, posy - 6],[posx + 6, posy + 2]]);

  //Set the style
  canvas.Fill(this.preview.label.fill);
};

//CoverViewer Preview Track mouse down
CoverViewer.prototype.PreviewTrackPreviewMouseDown = function(x)
{
  //Activate the mouse
  this.preview.mouse = true;

  //Set cursor as move
  $('body').addClass(this.cursor.move);

  //Save the click position
  this.preview.click.point = x;

  //Save the start position
  this.preview.click.start = this.preview.window.start;

  //Destroy the genes info
  this.genes.tooltip.Hide();
};

//CoverViewer Preview Track mouse move
CoverViewer.prototype.PreviewTrackPreviewMouseMove = function(x)
{
  //Check for draw
  if(this.preview.mouse === true)
  {
    //Calculate the start point
    this.preview.window.start = this.preview.click.start + (x - this.preview.click.point);

    //Draw the region
    this.Move();
  }
};

//CoverViewer Preview Track mouse Up
CoverViewer.prototype.PreviewTrackPreviewMouseUp = function(x)
{
  //Set mouse as false
  this.preview.mouse = false;

  //Set default cursor
  $('body').removeClass(this.cursor.move);
};

//CoverViewer Preview track mouse events
CoverViewer.prototype.PreviewTrackEvents = function(action, event, x, y)
{
  //Prevent default
	event.preventDefault();

  //Check for cover status
  if(this.draw.status === 'cover')
  {
    //Check for move action
    if(action === 'move'){ this.PreviewTrackPreviewMouseMove(x, y); }

    //Check for down action
    else if(action === 'down'){ this.PreviewTrackPreviewMouseDown(x, y); }

    //Check for up action
    else if(action === 'up'){ this.PreviewTrackPreviewMouseUp(x, y); }
  }

  //Check for chromosome status
  else if(this.draw.status === 'chromosome')
  {
    //Check for move action
    if(action === 'move'){ this.PreviewTrackChromsomeMouseMove(x, y); }

    //Check for up action
    else if(action === 'up'){ this.PreviewTrackChromsomeMouseUp(x, y); }
  }

  //Check for karyotype status
  else if(this.draw.status === 'karyotypes')
  {
    //Check for move action
    if(action === 'move'){ this.PreviewTrackKaryotypesMouseMove(x, y); }

    //Check for up action
    else if(action === 'up'){ this.PreviewTrackKaryotypesMouseUp(x, y); }
  }
};

//CoverViewer Preview Track Return
CoverViewer.prototype.PreviewTrackReturn = function(event)
{
  //Prevent default
	event.preventDefault();

  //Check the actual status
  if(this.draw.status === 'chromosome')
  {
    //Change the status
    this.draw.status = 'karyotypes';
  }
  else if(this.draw.status === 'cover')
  {
    //Change the status
    this.draw.status = 'chromosome';
  }

  //Show loading
  this.preview.LoadingShow();

  //Draw
  CoverViewerDraw(this);
};

//CoverViewer Preview Track mouse function event
function CoverViewerPreviewTrackEvents(_this)
{
	//Save the canvas ID
  var _cv = '#' + _this.preview.CanvasClickID();

  //Get the action button ID
  var _ac = '#' + _this.preview.ActionID();

  //Mouse up
  $(_cv).mouseup(function(e){ _this.PreviewTrackEvents('up', e,  e.pageX - $(this).offset().left, e.pageY - $(this).offset().top); });

  //Mouse down
  $(_cv).mousedown(function(e){ _this.PreviewTrackEvents('down', e, e.pageX - $(this).offset().left, e.pageY - $(this).offset().top); });

  //Mouse move
  $(_cv).mousemove(function(e){ _this.PreviewTrackEvents('move', e, e.pageX - $(this).offset().left, e.pageY - $(this).offset().top); });

  //Action button
  $(_ac).mousedown(function(e){ _this.PreviewTrackReturn(e); });
}
