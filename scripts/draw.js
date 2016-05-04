//CoverViewer Draw
CoverViewer.prototype.Draw = function()
{
  //Check the status
  if(this.draw.status === ''){ return; }

  //Check for karyotype status
  else if(this.draw.status === 'karyotypes'){ this.DrawKaryotypes(); }

  //Check for chromosome status
  else if(this.draw.status === 'chromosome'){ this.DrawChromosome(); }

  //Check for cover status
  else if(this.draw.status === 'cover'){ this.DrawCover(); }
};

//CoverViewer draw karyotypes
CoverViewer.prototype.DrawKaryotypes = function()
{
  //Check for karyotypes
  if(this.data.karyotypes.busy === true){ return; }

  //Check for regions
  if(this.data.regions.busy === true){ return; }

  //Check for names
  if(this.data.names.busy === true){ return; }

  //Update the cover track height
  this.cover.height = this.cover.default.height.karyotypes;

  //Resize the cover track
  this.cover.Resize();

  //Update the genes track height
  this.genes.height = this.genes.default.height.karyotypes;

  //Resize the genes track
  this.genes.Resize();

  //Draw the karyotypes
  this.PreviewTrackKaryotypesDraw();

  //Draw the no cover
  this.CoverTrackDrawNoCover();

  //Draw the no genes
  //this.GenesTrackDrawNoGenes();

  //Set core running as false
  this.core.running = false;

  //Hide preview loading
  this.preview.LoadingHide();

  //Update the cover title
  this.CoverTrackTitleReset();

  //Update the genes title
  this.GenesTrackTitleReset();
};

//CoverViewer draw chromosome
CoverViewer.prototype.DrawChromosome = function()
{
  //Update the cover track height
  this.cover.height = this.cover.default.height.chromosome;

  //Resize the cover track
  this.cover.Resize();

  //Update the genes track height
  this.genes.height = this.genes.default.height.chromosome;

  //Resize the genes track
  this.genes.Resize();

  //Draw the chromosome
  this.PreviewTrackChromsomeDraw();

  //Draw the no cover
  this.CoverTrackDrawNoCover();

  //Draw the no genes
  //this.GenesTrackDrawNoGenes();
  
  //Set core running as false
  this.core.running = false;

  //Hide preview loading
  this.preview.LoadingHide();

  //Update the cover title
  this.CoverTrackTitleReset();

  //Update the genes title
  this.GenesTrackTitleReset();
};

//CoverViewer draw cover
CoverViewer.prototype.DrawCover = function()
{
  //Show in console
  console.log('CoverViewer: check for draw...');

  //Show loading
  //this.LoadingShow();

  //Check if cover is ready
  if(this.data.cover.busy === true){ return; }

  //Check if genes is ready
  if(this.data.genes.busy === true){ return; }

  //Show in console
  console.log('CoverViewer: system ready for draw');

  //Set the default cover size
  this.cover.height = this.cover.default.height.cover;

  //Resize the cover track
  this.cover.Resize();

  //Draw cover track
  this.CoverTrackDraw(0);

  //Draw preview track
  this.PreviewTrackDraw();

  //Draw genes track
  this.GenesTrackDraw();

  //Set core running as false
  this.core.running = false;

  //Show in console
  console.log('CoverViewer: draw complete!');

  //Set resized as false
  this.core.resized = false;

  //Hide preview loading
  this.preview.LoadingHide();

  //Hide cover loading
  this.cover.LoadingHide();

  //Hide genes loading
  this.genes.LoadingHide();
};

//CoverViewer draw time out
function CoverViewerDraw(_this)
{
  //Set time out
  setTimeout(function(){ _this.Draw(); }, _this.draw.delay);
}
