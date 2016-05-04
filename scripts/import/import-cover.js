//CoverViewer Import coverage data
CoverViewer.prototype.ImportDataCover = function()
{
  //Get the real url
  var url = this.data.cover.url;

  //Replace the region
  url = url.replace(/{region}/gi, this.draw.region);

  //Show in console
  console.log('CoverViewer: reading cover data from "' + url + '"');

  //Set cover as busy
  this.data.cover.busy = true;

  //Set error as false
  this.data.cover.error = false;

  //Import from url
  CoverViewerImportDataCoverJson(url, this);
};

//CoverViewer Track import error
CoverViewer.prototype.ImportDataCoverError = function(url)
{
  //Show error in console
  console.log('CoverViewer: Error reading coverage data from "' + url + '"');

  //Set true the errror
  this.data.cover.error = true;

  //Set cover busy as false
  this.data.cover.busy = false;

  //Continue
  this.Draw();
};

//CoverViewer Track Import and parser
CoverViewer.prototype.ImportDataCoverParser = function(data)
{
  //Save the data
  this.data.cover.data = data;

  //Check parser
  if(this.data.cover.parser)
  {
    //Parse the data
    this.data.cover.data = this.data.cover.parser(data);
  }

  //Get the region chromosome
  //this.data.cover.data = this.data.cover.data[this.draw.chromosome];

  //Find the min and max values
  this.ImportDataCoverFindMinMax();

  //Set cover busy as false
  this.data.cover.busy = false;

  //Continue
  this.Draw();
};

//CoverViewer Find min and max values
CoverViewer.prototype.ImportDataCoverFindMinMax = function()
{
  //Find the max and min
  this.data.cover.min = 99999999;
  this.data.cover.max = 0;

  //Read the others
  for(var key in this.data.cover.data)
  {
    //Get the cover values
    var cover = this.data.cover.data[key];

    //Check each cover
    for(var j = 0; j < cover.length; j++)
    {
      //Check the min
      if(this.data.cover.min > cover[j]){ this.data.cover.min = cover[j]; }

      //Check the max
      if(this.data.cover.max < cover[j]){ this.data.cover.max = cover[j]; }
    }
  }

  //Check for prevent 0 in max
  if(this.data.cover.max < 1) { this.data.cover.max = 1; }

  //Check for prevent 0 in min
  if(this.data.cover.min < 1) { this.data.cover.min = 1; }
};

//Function for import the data with jquery
function CoverViewerImportDataCoverJson(_url, _this)
{
  //Create the conection
  var _import = $.ajax({url: _url, dataType: 'json'});

  //Done function
  _import.done(function(data){ _this.ImportDataCoverParser(data); });

  //Fail function
  _import.fail(function(){ _this.ImportDataCoverError(_url); });
}
