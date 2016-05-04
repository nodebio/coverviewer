//CoverViewer Preview Stroke
CoverViewer.prototype.BamsParser = function()
{
  //Save the number of bams
  this.bams.num = this.bams.label.length;

  //Initialize the empty bams
  this.BamsEmptyInit();

  //Initialize the bams color
  this.BamsColorInit();

  //Initialize the bams Active
  this.BamsActiveInit();
};

//CoverViewer Bams active creator
CoverViewer.prototype.BamsActiveInit = function()
{
  //Reset the active array
  this.bams.active = [];

  //Initialize the array
  for(var i = 0; i < this.bams.num; i++)
  {
    //Insert true
    this.bams.active.push(true);
  }
};

//CoverViewer parse the bams color
CoverViewer.prototype.BamsColorInit = function()
{
  //Restart the colors array
  this.bams.color = [];

  //Save the color
  for(var i = 0; i < this.bams.num; i++)
  {
    //Default color
    var c = this.ColorByIndex(i);

    //Check for custom color
    if(this.data.cover.color)
    {
      //Call to the custom function
      c = this.data.cover.color(i);
    }

    //Push the color
    this.bams.color.push(c);
  }
};

//CoverViewer Initialize the empty bam cover
CoverViewer.prototype.BamsEmptyInit = function()
{
  //Reset the empty bam cover
  this.bams.empty = jvizMath.Zeros(this.bams.num);
};
