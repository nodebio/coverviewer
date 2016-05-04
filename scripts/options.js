//CoverViewer Options function
CoverViewer.prototype.Options = function(opt)
{
  //For check the specie
  if(typeof opt.specie !== 'undefined'){ this.data.specie = opt.specie; }

  //For check the assembly
  if(typeof opt.assembly !== 'undefined'){ this.data.assembly = opt.assembly; }

  //For test mode
  if(typeof opt.testMode !== 'undefined'){ this.default.test = opt.testMode; }

  //Check for show button labes
  if(typeof opt.showBtnLabels !== 'undefined'){ this.navbar.btn.labels.show = opt.showBtnLabels; }

  //Check for show the preview track
  if(typeof opt.showTrackPreview !== 'undefined') { this.preview.show = opt.showTrackPreview; }

  //Check for show the cover track
  if(typeof opt.showTrackCover !== 'undefined'){ this.cover.show = opt.opt.showTrackCover; }

  //Check for show the genes track
  if(typeof opt.showTrackGenes !== 'undefined'){ this.genes.show = opt.showTrackGenes; }

  //Check for gaus filter times
  if(typeof opt.gaussFilter !== 'undefined'){ this.gauss.times = opt.gaussFilter; }

  //Check for bam names
  if(typeof opt.bamNames !== 'undefined'){ this.bams.labels = opt.bamNames; }

  //Check for import names
  if(typeof opt.importNames !== 'undefined'){ this.ImportNames(opt.importNames); }

  //Check for import karyotypes
  if(typeof opt.importKaryotypes !== 'undefined'){ this.ImportKaryotypes(opt.importKaryotypes); }

  //Check for import regions
  if(typeof opt.importRegions !== 'undefined'){ this.ImportRegions(opt.importRegions); }

  //Check for import cover
  if(typeof opt.importCover !== 'undefined'){ this.ImportCover(opt.importCover); }

  //Check for import genes
  if(typeof opt.importGenes !== 'undefined'){ this.ImportGenes(opt.importGenes); }

  //Check for mark label
  if(typeof opt.markLabel !== 'undeifned'){ this.marks.label = opt.markLabel; }
};

//CoverViewer update options
CoverViewer.prototype.OptionsUpdate = function(opt)
{
  //Update the options
  this.Options(opt);
};
