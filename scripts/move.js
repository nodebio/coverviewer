//CoverViewer Move tracks
CoverViewer.prototype.Move = function()
{
  //Check the draw status
  if(this.draw.status !== 'cover'){ return; }

  //Check core
  if(this.core.running === true){ return; }

  //Clear the cover label layer
  this.CoverTrackDrawLabelClear();

  //Draw the window
  this.PreviewTrackPreviewDrawWindow();

  //Move the cover track
  this.CoverTrackDraw(this.preview.region.start);

  //Move the genes track
  this.GenesTrackDraw();
};
