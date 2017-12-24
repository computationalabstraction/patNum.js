// Dependancies ---------------------------------------------------------------------

// Mathematical Graph Representation
var Graph = require("./Graph");



function AFrequency(data,val)
{
  var count = 0;
  for(var v of data)
  {
    if(v === val) count++;
  }
  return {Value: val, Occurance: count};
}


function SomeFrequencies(data,vals){
  var freq = [];
  for(let value of vals)
  {
    freq.push(AFrequency(data,value))
  }
  return freq;
}


function AllFrequencies(data)
{
  var freq = [];
  var done = [];
  for(let value of data)
  {
    if(!done.includes(value))
    {
      done.push(value);
      freq.push(AFrequency(data,value));
    }
  }
  return freq;
}


function Mean(data)
{
  var total = 0;
  for(let val of data) total += val;
  return total/data.length;
}


function SampleStandardDeviation(data)
{
  var mean = Mean(data);
  var deviation = [];
  for(let val of data) deviation.push( Math.pow( (val - mean) , 2) );
  var variance = Math.sqrt(Mean(deviation));
  return variance;
}


function PopulationStandardDeviation(data)
{
  var total = 0;
  for(let val of data)
  {
    total += val;
  }
  var mean = total/data.length;
  var deviation = [];
  for(let val of data) deviation.push( Math.pow(val - mean, 2) );
  var total = 0;
  for(let val of deviation)
  {
    total += val;
  }
  var variance = Math.sqrt(total/(deviation.length-1));
  return variance;
}


function MeanAbsoluteDeviation(data)
{
  var mean = Mean(data);
  var deviation = [];
  for(let val of data) deviation.push(Math.abs((val - mean)));
  return Mean(deviation);
}


function Median(data)
{
  var med = data.slice();
  med.sort();
  var len = med.length
  if(even(len))
  {
    let one = len/2;
    let two = one + 1;
    return ( ( med[one] + med[two] ) / 2 );
  }
  else
  {
    return med[ ( (med.length - 1) / 2 ) + 1 ];
  }
}


function even(number)
{
  return Math.abs(number % 2) == 0;
}


function MedianAbsoluteDeviation(data)
{
  var median = Median(data);
  var deviation = [];
  for(let val of data) deviation.push(Math.abs((val - median)));
  return Median(deviation);
}


function Mode(data)
{
  var freq = AllFrequencies(data);
  var mode = freq[0];
  for(let val of freq)
  {
    if(mode.Occurance < val.Occurance)
    {
      mode = val;
    }
  }
  return mode.Value;
}


function max(data)
{
  var max = data[0];
  for(let val of data)
  {
    if(max < val)
    {
      max = val;
    }
  }
  return max;
}


function min(data)
{
  var min = data[0];
  for(let val of data)
  {
    if(min > val)
    {
      min = val;
    }
  }
  return min;
}

function Range(data)
{
  return max(data) - min(data);
}

// Exports ---------------------------------------------------------------------

// Math Operations
module.exports.even = even;

// Basic Operations
module.exports.max = max;
module.exports.min = min;
module.exports.Range = Range;

// Average Operations
module.exports.Mean = Mean;
module.exports.Median = Median;
module.exports.Mode = Mode;

// Frequency Operations
module.exports.AFrequency = AFrequency;
module.exports.SomeFrequencies = SomeFrequencies;
module.exports.AllFrequencies = AllFrequencies;

// Deviations
module.exports.SampleStandardDeviation = SampleStandardDeviation;
module.exports.PopulationStandardDeviation = PopulationStandardDeviation;
module.exports.MeanAbsoluteDeviation = MeanAbsoluteDeviation;
module.exports.MedianAbsoluteDeviation = MedianAbsoluteDeviation;