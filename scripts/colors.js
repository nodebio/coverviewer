//CoverViewer Color By Index
CoverViewer.prototype.ColorByIndex = function(index)
{
  //Check the index
  if(index >= this.colors.length)
  {
    //Show error in console
    console.log('CoverViewer: Error in "ColorByIndex", not enought colors for index ' + index);

    //Get the first
    return this.colors[0].hex;
  }

  //Return the color for index
  return this.colors[index].hex;
};

//CoverViewer Random Color
CoverViewer.prototype.ColorRand = function()
{
  //Generate a random int
  var r = Math.floor((Math.random()*this.colors.length));

  //Return the color
  return this.colors[r].hex;
};
