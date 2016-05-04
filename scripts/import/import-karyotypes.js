//CoverViewer Import karyotypes data
CoverViewer.prototype.ImportDataKaryotypes = function()
{
  //Get the real url
  var url = this.data.karyotypes.url;

  //Replace the specie
  url = url.replace(/{specie}/gi, this.data.specie);

	//Replace the assembly
  url = url.replace(/{assembly}/gi, this.data.assembly);

  //Show in console
  console.log('CoverViewer: reading karyotypes data from "' + url + '"');

  //Set karyotypes as busy
  this.data.karyotypes.busy = true;

  //Set error as false
  this.data.karyotypes.error = false;

  //Import from url
  CoverViewerImportDataKaryotypes(url, this);
};

//CoverViewer Karyotypes import error
CoverViewer.prototype.ImportDataKaryotypesError = function(url)
{
  //Show error in console
  console.log('CoverViewer: Error reading karyotypes data from "' + url + '"');

  //Set true the error
  this.data.karyotypes.error = true;

  //Set karyotypes busy as false
  this.data.karyotypes.busy = false;

  //Continue
  //this.Draw();
};

//CoverViewer karyotypes import done
CoverViewer.prototype.ImportDataKaryotypesParser = function(data)
{
  //Save the data
  this.data.karyotypes.data = data;

  //Check parser
  if(this.data.karyotypes.parser)
  {
    //Parse the data
    this.data.karyotypes.data = this.data.karyotypes.parser(data);
  }

	//Save the karyotypes to the track
	this.preview.SetKaryotypes(this.data.karyotypes.data);

  //Set karyotypes busy as false
  this.data.karyotypes.busy = false;

  //Continue
  this.Draw();
};

//Function for import the data with jquery
function CoverViewerImportDataKaryotypes(_url, _this)
{
  //Create the conection
  var _import = $.ajax({ url: _url, dataType: 'json' });

  //Done function
  _import.done(function(data){ _this.ImportDataKaryotypesParser(data); });

  //Fail function
  _import.fail(function(){ _this.ImportDataKaryotypesError(_url); });
}
