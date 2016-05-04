//CoverViewer Marks add
CoverViewer.prototype.Marks = function(marks)
{
	//Save the marks
	this.preview.SetMarks(marks);
};

//CoverViewer get marks for a chromosome
CoverViewer.prototype.MarksChromosome = function()
{
	//Get the actual chromosome info
	var chr = this.preview.GetChromosomeNowInfo();

	//Return the marks
	return this.preview.GetMarks(chr.id);
};

//CoverViewer get marks for a region
CoverViewer.prototype.MarksRegion = function(start, end)
{

};
