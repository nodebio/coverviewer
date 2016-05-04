//CoverViewer Initialize
CoverViewer.prototype.Init = function()
{
	//Set the draw status
	this.draw.status = 'karyotypes';

	//Import karyotypes
	this.ImportDataKaryotypes();

	//Import regions
	this.ImportDataRegions();

	//Import cover names
	this.ImportDataNames();

	//Build the tool
	this.Build();

	//Show loading
  this.preview.LoadingShow();
};
