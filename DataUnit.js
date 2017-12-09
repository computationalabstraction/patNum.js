class Record{}


class Point extends Record
{
    constructor(x,y)
    {
        super();
        this.x = x;
        this.y = y;
    }
}

// Function Record is a notion which captures an input and ouput
// The Instance of the class is to be composed by FunctionTable
class FunctionRecord extends Record
{
    constructor(input,ouput)
    {
        super();
        this.input = input;
        this.ouput = ouput;
    }
}

// Exports ---------------------------------------------------------------------

//  Graph Units
module.exports.Point = Point;

// Algebraic Units
module.exports.FunctionRecord = FunctionRecord;