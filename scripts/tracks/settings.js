//CoverViewer build Setings
CoverViewer.prototype.SettingsBuild = function()
{
  //Build the settings div
  var div = '<div id="' + this.settings.id + '" class="' + this.settings.class + '" ';

  //Add the default style
  div = div + 'style="display:none;">';

  //Close the settings div
  div = div + '</div>';

  //Return the settings div
  return div;
};

//CoverViewer Settings Show
CoverViewer.prototype.SettingsShow = function()
{
  //Initialize the output div
  var div = '';

  //Create the Gauss filter track
  div = div + '<div class="row">';
  div = div + '<div class="col-left">Gauss Filter Times<br>';
  div = div + '<small>Specify the number of times for apply the Gauss Filter. ';
  div = div + 'Default value is ' + this.gauss.def + '. A value of 0 means no filter.</small></div>';
  div = div + '<div class="col-right" align="center">';
  div = div + '<input type="number" class="input" name="' + this.settings.gauss + '" id="' + this.settings.gauss + '" ';
  div = div + 'min="' + this.gauss.min + '" max="' + this.gauss.max + '" value="' + this.gauss.times + '">';
  div = div + '</div>';
  div = div + '</div>';

  //Apply button
  div = div + '<div class="row">';
  div = div + '<div class="apply" id="' + this.settings.apply + '">Apply changes</div>';
  div = div + '</div>';

  //Show the div
  $('#' + this.settings.id).html(div);

  //Change the display
  $('#' + this.settings.id).css('display', 'block');

  //Add the apply event
  CoverViewerSettingsEvntApply(this);

  //Set show as true
  this.settings.show = true;
};

//CoverViewer Apply function
CoverViewer.prototype.SettingsApply = function()
{
  //Get the filter of gauss value
  this.gauss.times = $('#' + this.settings.gauss).val();

  //Hide the settings track
  this.SettingsHide();

  //Reset the cover in cache
  this.cover.data = null;
  this.preview.data = null;

  //Show loading
  this.LoadingShow();

  //Apply the changes
  //this.DrawReady();
  CoverViewerSettingsDraw(this);
};

//CoverViewer Settings Hide
CoverViewer.prototype.SettingsHide = function()
{
  //Check if settings is visible
  if(this.settings.show === true)
  {
    //Destroy the settings
    $('#' + this.settings.id).html('');

    //Hide the settings
    $('#' + this.settings.id).css('display', 'none');

    //Set as false
    this.settings.show = false;
  }
};

//Function for initialize the apply event
function CoverViewerSettingsEvntApply(_main)
{
  //Add the click event to the apply button
  $('#' + _main.settings.apply).on('click', function(){ _main.SettingsApply(); });
}

//Time out for draw the region
function CoverViewerSettingsDraw(_main)
{
  //Set the time out
  setTimeout(function(){ _main.DrawReady(); }, _main.draw.delay);
}
