//CoverViewer Import genes for region
CoverViewer.prototype.ImportDataGenes = function()
{
  //Get the real url
  var url = this.data.genes.url;

  //Replace the region
  url = url.replace(/{region}/gi, this.draw.region);

  //Replace the specie
  url = url.replace(/{specie}/gi, this.data.specie.toLowerCase());

  //Replace the assembly
  url = url.replace(/{assembly}/gi, this.data.assembly.toLowerCase());

  //Show in console
  console.log('CoverViewer: reading genes from "' + url + '"');

  //Set genes as busy
  this.data.genes.busy = true;

  //Set genes error as false
  this.data.genes.error = false;

  //Import from url
  CoverViewerImportDataGenesJson(url, this);
};

//CoverViewer Genes Track import error
CoverViewer.prototype.ImportDataGenesError = function(url)
{
  //Show error in console
  console.log('CoverViewer: Error reading genes data from "' + url + '"');

  //Set true the error for genes
  this.data.genes.error = true;

  //Set genes busy as false
  this.data.genes.busy = false;

  //Continue
  this.Draw();
};

//CoverViewer Genes Track Import and parser
CoverViewer.prototype.ImportDataGenesParser = function(data)
{
  //Save the data
  this.data.genes.list = data;

  //Check parser
  if(this.data.genes.parser)
  {
    //Parse the data
    this.data.genes.list = this.data.genes.parser(data);
  }

  //Sort the genes list
  this.data.genes.list = ObjectSort(this.data.genes.list, 'start');

  //Calculate the genes track height
  this.GenesTrackHeight();

  //Show the specie info
  this.GenesTrackTitle();

  //Set genes busy as false
  this.data.genes.busy = false;

  //Continue
  this.Draw();
};

//Function for import the data with jquery
function CoverViewerImportDataGenesJson(_url, _this)
{
  //Create the conection
  var _import = $.ajax({url: _url, dataType: 'json'});

  //Done function
  _import.done(function(data){ _this.ImportDataGenesParser(data); });

  //Fail function
  _import.fail(function(){ _this.ImportDataGenesError(_url); });
}
