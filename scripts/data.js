//CoverViewer fix the data
CoverViewer.prototype.DataFix = function()
{
  //Gap
  var gap = 1;

  //Number of covers
  var ncovers = this.data.cover.data[0].cover.length;

  //Generates the new data array
  var ndata = [];

  //Push the first element
  ndata.push(this.data.cover.data[0]);

  //Read all the data
  for(var i = 1; i < this.data.cover.data.length; i++)
  {
    //Save the jump
    var diff = this.data.cover.data[i].pos - this.data.cover.data[i-1].pos;

    //Create the other elements
    for(var j = gap; j < diff; j = j + gap)
    {
      //Create the null object and push
      ndata.push(this.DataNullVals(this.data.cover.data[i-1].pos + j, ncovers));
    }

    //Push the element
    ndata.push(this.data.cover.data[i]);
  }

  //New data 2
  var ndata2 = [];

  //Check the data positions
  if(ndata[ndata.length-1].pos < this.draw.start || ndata[0].pos > this.draw.end)
  {
    //Show error
    console.error('CoverViewer: imported data is out of the selected region');

    //Create the new data with null values
    for(var i = this.draw.start; i <= this.draw.end; i++)
    {
      //Create the null object and push
      ndata2.push(this.DataNullVals(i, ncovers));
    }
  }
  else
  {
    //Add the left positions
    for(var i = this.draw.start; i < ndata[0].pos; i++)
    {
      //Create the null object and push
      ndata2.push(this.DataNullVals(i, ncovers));
    }

    //Push the actual elements
    for(var i = 0; i < ndata.length; i++)
    {
      //Check the position
      if(this.draw.start <= ndata[i].pos && ndata[i].pos <= this.draw.end)
      {
        //Add the element
        ndata2.push(ndata[i]);
      }
    }

    //Add the right positions
    for(var i = ndata[ndata.length - 1].pos + gap; i <= this.draw.end; i++)
    {
      //Create the null object and push
      ndata2.push(this.DataNullVals(i, ncovers));
    }
  }

  //Save
  this.data.cover.data = ndata2;
};

//CoverViewer Generate Positions with null values
CoverViewer.prototype.DataNullVals = function(position, ncovers)
{
  //Initialize the new object
  var obj = {};

  //Save the position
  obj.pos = position;

  //Initialize the cover arrays
  obj.cover = [];

  //Save the cover values
  for(var k = 0; k < ncovers; k++) { obj.cover.push(this.data.nullvalues); }

  //Return the new element
  return obj;
};

//CoverViewer Adjust the data to the cover region
CoverViewer.prototype.DataGen = function(hei)
{
  //Initialize the transformed data
  var ele = {};

  //Transform the original data to a new data
  for(var key in this.data.cover.data)
  {
    //Create the new element
    var obj = [];

    //Get the cover values
    var cover = this.data.cover.data[key];

    //Get all the coverages
    for(var j = 0; j < this.bams.num; j++)
    {
      //Calculate the new height
      var h = cover[j]/this.data.cover.max;

      //Round
      h = Math.floor(h*hei);

      //Push to the object
      obj.push(h);
    }

    //Push the new object
    ele[key] = obj;
  }

  //Return the new element
  return ele;
};

//CoverViewer find position index
CoverViewer.prototype.DataFindPos = function(p)
{
  //Read all the data and find the position
  for(var i = 0; i < this.data.cover.data.length; i++)
  {
    //Check position
    if(p <= this.data.cover.data[i].pos)
    {
      //Return the index
      return i;
    }
  }

  //Default, return 0
  return 0;
};
