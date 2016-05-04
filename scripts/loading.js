//CoverViewer Loading builder
CoverViewer.prototype.LoadingBuilder = function()
{
  //Create the new div
  var div = '<div id="' + this.loading.id + '" class="' + this.loading.class + '">';

  //Create the screen
  div = div + '<div id="' + this.loadingscreen.id + '" class="' + this.loadingscreen.class + '" ';

  //Set the screen style
  div = div + 'style="opacity:0.0; visibility:hidden; padding-top:' + this.loadingscreen.padding.top + '">';

  //Create the animation
  div = div + '<div class="cover-anim"></div>';

  //Close the screen div
  div = div + '</div>';

  //Close the main div
  div = div + '</div>';

  //Return the div
  return div;
};

//CoverViewer loading resize
CoverViewer.prototype.LoadingResize = function()
{
  //Save the width
  this.loadingscreen.width = $('#' + this.loadingscreen.id).width();

  //Calculate the height
  this.loadingscreen.height = this.parent.height - this.navbar.height - this.loadingscreen.padding.top;

  //Set the loading screen height
  $('#' + this.loadingscreen.id).height(this.loadingscreen.height);
};

//CoverViewer Show loading
CoverViewer.prototype.LoadingShow = function()
{
  //Check for visible
  if(this.loading.visible === false)
  {
    //Change the opacity
    $('#' + this.loadingscreen.id).css('opacity', '1.0');

    //Change the visibility
    $('#' + this.loadingscreen.id).css('visibility', 'visible');
  }

  //Set visible as true
  this.loading.visible = true;
};

//CoverViewer Hide loading
CoverViewer.prototype.LoadingHide = function()
{
  //Check for visible
  if(this.loading.visible === true)
  {
    //Change the opacity
    $('#' + this.loadingscreen.id).css('opacity', '0.0');

    //Change the visibility
    $('#' + this.loadingscreen.id).css('visibility', 'hidden');
  }

  //Set visible as false
  this.loading.visible = false;
};
