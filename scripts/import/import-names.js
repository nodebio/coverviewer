//CoverViewer Import names data
CoverViewer.prototype.ImportDataNames = function()
{
	//Check the json object
	if(this.data.names.json)
	{
		//Parse the data
		return this.ImportDataNamesParser(this.data.names.json);
	}

  //Get the real url
  var url = this.data.names.url;

  //Show in console
  console.log('CoverViewer: reading names data from "' + url + '"');

  //Set names import as busy
  this.data.names.busy = true;

  //Set error as false
  this.data.names.error = false;

  //Import from url
  CoverViewerImportDataNames(url, this);
};

//CoverViewer names import error
CoverViewer.prototype.ImportDataNamesError = function(url)
{
  //Show error in console
  console.log('CoverViewer: Error reading names data from "' + url + '"');

  //Set true the error
  this.data.names.error = true;

  //Set names busy as false
  this.data.names.busy = false;

  //Continue
  //this.Draw();
};

//CoverViewer names import done
CoverViewer.prototype.ImportDataNamesParser = function(data)
{
  //Save the data
  this.bams.label = data;

  //Check parser
  if(this.data.names.parser)
  {
    //Parse the data
    this.bams.label = this.data.names.parser(data);
  }

	//Parse the bams
	this.BamsParser();

  //Set names busy as false
  this.data.names.busy = false;

  //Continue
  this.Draw();
};

//Function for import the data with jquery
function CoverViewerImportDataNames(_url, _this)
{
  //Create the conection
  var _import = $.ajax({ url: _url, dataType: 'json' });

  //Done function
  _import.done(function(data){ _this.ImportDataNamesParser(data); });

  //Fail function
  _import.fail(function(){ _this.ImportDataNamesError(_url); });
}
