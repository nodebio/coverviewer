//CoverViewer Foot
CoverViewer.prototype.FootBuild = function()
{
  //Create the new foot element
  var div = '<div id="' + this.foot.id + '" class="' + this.foot.class + '" ';

  //Check if foot is visible
  if(this.foot.show === false)
  {
    //Add the display as none
    div = div + 'style="display:none;"'
  }

  //End the div
  div = div + '>';

  //Close the foot div
  div = div + '</div>';

  //Return the new element
  return div;
};
