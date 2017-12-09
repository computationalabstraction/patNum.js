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
        for(record of this.table)
        {
            yield record;
        }
    }

    inverse()
    {
        inverse
        for()
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

// Exports ---------------------------------------------------------------------

//Function Table
module.exports.FunctionTable = FunctionTable;
