//CoverViewer Calculate the Gauss filter to an array
CoverViewer.prototype.GaussFilter = function(arr)
{
  //Read all the bams
  for(var i = 0; i < this.bams.num; i++)
  {
    //Generate the new object
    var obj = [];

    //Insert in the object
    for(var j = 0; j < arr.length; j++){ obj.push(arr[j][i]); }

    //Calculate the Gauss filter
    obj = Gauss(obj, this.gauss.times);

    //Save the obj to the array
    for(var j = 0; j < arr.length; j++){ arr[j][i] = obj[j]; }
  }

  //Return
  return arr;
};

//Calculate the Gauss filter
function Gauss(arr, n)
{
  //Auxiliar array
	var aux = [];

	//Filter values
	var a = 0.383, b = 0.242, c = 0.061, d = 0.006;

	//Apply the gauss filter n times
	for(k = 0; k < n; k++)
	{
		//Read all the array
		for(i = 0; i < arr.length; i++)
		{
			aux[3] = arr[i];

			if(i - 1 < 0) aux[2] = arr[i];
			else aux[2] = arr[i-1];

			if(i - 2 < 0) aux[1] = arr[i];
			else aux[1] = arr[i-2];

			if(i - 3 < 0) aux[0] = arr[i];
			else aux[0] = arr[i-3];

			if(i + 1 >= arr.length) aux[4] = arr[i];
			else aux[4] = arr[i+1];

			if(i + 2 >= arr.length) aux[5] = arr[i];
			else aux[5] = arr[i+2];

			if(i + 3 >= arr.length) aux[6] = arr[i];
			else aux[6] = arr[i+3];

			//Save the new value
			arr[i] = aux[0]*d + aux[1]*c + aux[2]*b + aux[3]*a + aux[4]*b + aux[5]*c + aux[6]*d;
		}
	}

	//Return the new array
	return arr;
}
