//CoverViewer Labels button click
CoverViewer.prototype.NavbarBtnLabelsClick = function()
{
  //Open the labels dialog
  this.LabelsOpen();
};

//Coverviewer karyotypes button click
CoverViewer.prototype.NavbarKaryotypesClick = function()
{
  //Change the status
  this.draw.status = 'karyotypes';
  
  //Show loading
  this.preview.LoadingShow();

  //Draw
  CoverViewerDraw(this);
};

//CoverViewer Navbar Input event
CoverViewer.prototype.NavbarInputClick = function()
{
	//Get the region
	var region = $('#' + this.navbar.input.id).val();

  //Check for null
  if(region === '' || region === ' ')
  {
    //Show error
    this.alert.Error({ text: this.navbar.input.alert.text, time: this.navbar.input.alert.time });

    //Exit
    return;
  }

	//Covert to lower case
  region = region.toLowerCase();

  //Find region index
  var index = -1;

  //Search in all the regions
  for(var i = 0; i < this.data.regions.data.length; i++)
  {
    //Get the region
    var r = this.data.regions.data[i];

    //Check the region ID
    if(typeof r.id !== 'undefined')
    {
      //Check for region id
      if(region === r.id.toLowerCase()){ index = i; break; }
    }

    //Check the region name
    if(typeof r.name !== 'undefined')
    {
      //Check for region name
      if(region === r.name.toLowerCase()){ index = i; break; }
    }

    //Check the region label
    if(typeof r.label !== 'undefined')
    {
      //Check for region label
      if(region === r.label.toLowerCase()){ index = i; break; }
    }
  }

  //Check for null
  if(index < 0)
  {
    //Show error
    this.alert.Error({ text: this.navbar.input.alert.text, time: this.navbar.input.alert.time });

    //Exit
    return;
  }

  //Get the region
  var r = jvizRegion.Join(this.data.regions.data[index]);

  //Show preview loading
	this.preview.LoadingShow();

	//Show cover loading
	this.cover.LoadingShow();

	//Show genes loading
	this.genes.LoadingShow();

  //Open the region
  CoverViewerGoTo(this, r);
};

//Navbar Buttons event
function CoverViewerNavbarBtnEvents(_this)
{
  //Go back to karyotypes
  $('#' + _this.navbar.btn.karyotypes.id).click(function(e){ _this.NavbarKaryotypesClick(); });

  //Input region
	$('#' + _this.navbar.input.id).keyup(function(e){ if(e.keyCode == 13){ _this.NavbarInputClick(); } });

  //Find region
  $('#' + _this.navbar.btn.search.id).click(function(e){ _this.NavbarInputClick(); });

  //Labels button
  $('#' + _this.navbar.btn.labels.id).click(function(e){ _this.NavbarBtnLabelsClick(); });
}
