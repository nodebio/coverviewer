//CoverViewer Import Cover from
CoverViewer.prototype.ImportCover = function(opt)
{
  //Check url
  if(typeof opt.url !== 'undefined') { this.data.cover.url = opt.url; }

  //Check parser
  if(typeof opt.parser !== 'undefined') { this.data.cover.parser = opt.parser; }

  //Check color function
  if(typeof opt.color !== 'undefined') { this.data.cover.color = opt.color; }

  //Check label function
  if(typeof opt.label !== 'undefined') { this.bams.label = opt.label; }
};

//CoverViewer Import Genes from
CoverViewer.prototype.ImportGenes = function(opt)
{
  //Check url
  if(typeof opt.url !== 'undefined') { this.data.genes.url = opt.url; }

  //Check parser
  if(typeof opt.parser !== 'undefined') { this.data.genes.parser = opt.parser; }

  //Check label function
  if(typeof opt.label !== 'undefined') { this.data.genes.label = opt.label; }

  //Check Info Title
  if(typeof opt.infoTitle !== 'undefined') { this.data.genes.info.title = opt.infoTitle; }

  //Check Info Content
  if(typeof opt.infoContent !== 'undefined') { this.data.genes.info.content = opt.infoContent; }
};

//CoverViewer Import Karyotypes from
CoverViewer.prototype.ImportKaryotypes = function(opt)
{
  //Check url
  if(typeof opt.url !== 'undefined') { this.data.karyotypes.url = opt.url; }

  //Check parser
  if(typeof opt.parser !== 'undefined') { this.data.karyotypes.parser = opt.parser; }

  //Check the json
  if(typeof opt.json !== 'undefined') { this.data.karyotypes.json = opt.json; }
};

//CoverViewer Import Regions from
CoverViewer.prototype.ImportRegions = function(opt)
{
  //Check url
  if(typeof opt.url !== 'undefined') { this.data.regions.url = opt.url; }

  //Check parser
  if(typeof opt.parser !== 'undefined') { this.data.regions.parser = opt.parser; }

  //Check the json
  if(typeof opt.json !== 'undefined') { this.data.regions.json = opt.json; }
};

//CoverViewer Import Names from
CoverViewer.prototype.ImportNames = function(opt)
{
  //Check url
  if(typeof opt.url !== 'undefined') { this.data.names.url = opt.url; }

  //Check parser
  if(typeof opt.parser !== 'undefined') { this.data.names.parser = opt.parser; }

  //Check the json
  if(typeof opt.json !== 'undefined') { this.data.names.json = opt.json; }
};
