//CoverViewer Go To region
CoverViewer.prototype.GoTo = function(region)
{
	//Check the core status
	if(this.core.running === true){ return; }

	//Get the region
	var r = jvizRegion.Split(region);

	//Set as true
	this.core.running = true;

	//Save the chromosome
	this.draw.chromosome = r.chromosome;

	//Save the start point
	this.draw.start = r.start;

	//Save the end point
	this.draw.end = r.end;

	//Save the full region
	this.draw.region = jvizRegion.Join(r);

	//Find the chromosome index
	var index = this.preview.FindChromosomeIndex(this.draw.chromosome);

	//Check the chromosome index
	if(index < 0){ return console.error('Unknow chromosome ' + this.draw.chromosome ); }

	//Set the chromosome now
	this.preview.SetChromosomeNow(index);

	//Set the draw status as cover
	this.draw.status = 'cover';

	//Reset the actual
	this.cover.actual = 0;

	//Reset the cover data in cache
	this.cover.data = null;

	//Reset the preview data in cache
	this.preview.data = null;

	//Show in console
	console.log('CoverViewer: drawing region "' + this.draw.region + '"');

	//Show preview loading
	this.preview.LoadingShow();

	//Show cover loading
	this.cover.LoadingShow();

	//Show genes loading
	this.genes.LoadingShow();

	//Start the cover track import data
	this.ImportDataCover();

	//Start the genes track import data
	this.ImportDataGenes();
};

//Coverviewer go to delay
function CoverViewerGoTo(_this, _region)
{
	//Set the time out
	setTimeout(function(){ _this.GoTo(_region); }, _this.draw.delay);
}
