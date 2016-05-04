//CoverViewer Open labels dialog
CoverViewer.prototype.LabelsOpen = function()
{
	//Check for create the labes window
	if(this.labels.created === false)
	{
		//Create the labels window
		this.LabelsCreate();

		//Set created as true
		this.labels.created = true;
	}

	//Show the labels dialog
	this.labels.Show();
};

//CoverViewer labels create
CoverViewer.prototype.LabelsCreate = function()
{
	//Initialize the div
	var div = '';

	//Read all the names
	for(var i = 0; i < this.bams.label.length; i++)
	{
		//Create the name row
		div = div + '<div class="' + this.labels.row.class + '">';

		//Add the switch div
		div = div + '<div id="' + this.labels.switch.id + '_' + i + '" class="' + this.labels.switch.class + '">';

		//Add the switch input
		div = div + '<input type="checkbox" value="1" id="' + this.labels.switch.id + '_' + i + 'ch" name>';

		//Add the switch label
	  div = div + '<label for="' + this.labels.switch.id + '_' + i + 'ch2"></label>';

		//Add the div for the background
		div = div + '<div></div>';

		//Close the switch
  	div = div + '</div>';

		//Name span
		div = div + '<span class="' + this.labels.names.class + '" style="color:' + this.bams.color[i] + ';">';

		//Add the name
		div = div + this.bams.label[i];

		//Close the span name
		div = div + '</span>';

		//Close the name element
		div = div + '</div>';
	}

	//Add a line break
	div = div + '<br>';

	//Add the done button
	div = div + '<div id="' + this.labels.done.id + '" class="' + this.labels.done.class + '">' + this.labels.done.title + '</div>';

	//Show the names
	this.labels.Content(div);

	//Add the events
	for(var i = 0; i < this.bams.label.length; i++)
	{
		//Add the event
		CoverViewerLabelsSwitchEvent(this, i);

		//Change the status
		document.getElementById(this.labels.switch.id + '_' + i + 'ch').checked = true;
	}

	//dd the done button event
	CoverViewerLabelsDoneEvent(this);
};

//CoverViewer Labels Click event
CoverViewer.prototype.LabelsClick = function(i)
{
	//Get the element
	var el = document.getElementById(this.labels.switch.id + '_' + i + 'ch');

	//Change the active
	this.bams.active[i] = (this.bams.active[i] === true)? false : true;

	//Change the status
	el.checked = this.bams.active[i];

  //Draw the actual region
  this.Move();
};

//CoverViewer labels done
CoverViewer.prototype.LabelsDone = function()
{
	//Hide the labels dialog
	this.labels.Hide();
};

//CoverViewer labels switch event
function CoverViewerLabelsSwitchEvent(_this, _i)
{
	//Add the on click event
	$('#' + _this.labels.switch.id + '_' + _i).on('click', function(){ _this.LabelsClick(_i); });
}

//CoverViewer labels done event
function CoverViewerLabelsDoneEvent(_this)
{
	//Add the click event
	$('#' + _this.labels.done.id).on('click', function(){ _this.LabelsDone(); });
}
