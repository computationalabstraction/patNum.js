var Point = require("./DataUnit").Point;


class Graph
{
  constructor(points,sort="x")
  {
    this.points = points;
    this.points.sort((one,two) => one[sort] - two[sort]);
  }
}


class Interpolation extends Graph
{
    constructor(points,sort="x")
    {
        super(points,sort);
    }

    interpolate()
    {

    }
}