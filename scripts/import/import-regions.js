//CoverViewer Import regions data
CoverViewer.prototype.ImportDataRegions = function()
{
  //Get the real url
  var url = this.data.regions.url;

  //Show in console
  console.log('CoverViewer: reading regions data from "' + url + '"');

  //Set regions import as busy
  this.data.regions.busy = true;

  //Set error as false
  this.data.regions.error = false;

  //Import from url
  CoverViewerImportDataRegions(url, this);
};

//CoverViewer Regions import error
CoverViewer.prototype.ImportDataRegionsError = function(url)
{
  //Show error in console
  console.log('CoverViewer: Error reading regions data from "' + url + '"');

  //Set true the error
  this.data.regions.error = true;

  //Set regions busy as false
  this.data.regions.busy = false;

  //Continue
  //this.Draw();
};

//CoverViewer regions import done
CoverViewer.prototype.ImportDataRegionsParser = function(data)
{
  //Save the data
  this.data.regions.data = data;

  //Check parser
  if(this.data.regions.parser)
  {
    //Parse the data
    this.data.regions.data = this.data.regions.parser(data);
  }

	//Save the regions to the track
	this.preview.SetRegions(this.data.regions.data);

  //Set regions busy as false
  this.data.regions.busy = false;

  //Continue
  this.Draw();
};

//Function for import the data with jquery
function CoverViewerImportDataRegions(_url, _this)
{
  //Create the conection
  var _import = $.ajax({ url: _url, dataType: 'json' });

  //Done function
  _import.done(function(data){ _this.ImportDataRegionsParser(data); });

  //Fail function
  _import.fail(function(){ _this.ImportDataRegionsError(_url); });
}
