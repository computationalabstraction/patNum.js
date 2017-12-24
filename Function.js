var FunctionRecord = require("./DataUnit").FunctionRecord;

class Function{}


class FunctionTable extends Function
{
    constructor(...records)
    {
        super();
        this.table = new Set();
        for(let record of records)
        {
            this.addRecord(record);
        }
    }

    addRecord(record)
    {
        if(!this.table.has(record))
        {
            var exists = false;
            for(let unit of this.table)
            {
                if(unit.input == record.input)
                {
                    exists = true;
                }
            }
            if(!exists)
            {
                this.table.add(record);
            }
        }
    }

    *[Symbol.iterator]()
    {
        for(let record of this.table)
        {
            yield record;
        }
    }

    inverse()
    {
        var inverse = new FunctionTable();
        for(let record of this.table)
        {
            inverse.addRecord(new FunctionRecord(record.ouput,record.input));
        }
        return inverse;
    }

    of(input)
    {
        for(let record of this.table)
        {
            if(record.input == input)
            {   
                return record.ouput;
            }
        }
    }
}

class BinomialEquation extends Function
{
    constructor(equation)
    {
        super();
        this.equation = equation;
    }

    x(value)
    {
    }

    y(value)
    {
        return this.equation(value);
    }

}

// Exports ---------------------------------------------------------------------

//Function Table
module.exports.FunctionTable = FunctionTable;
