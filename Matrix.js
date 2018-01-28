class Matrix 
{
    constructor(array)
    {
        this.data = array;
    }

    add(matrix)
    {
        return this.operateWith(matrix, (n1,n2) => n1 + n2 );
    }

    substract(matrix)
    {
        return this.operateWith(matrix, (n1,n2) => n1 - n2 );
    }

    multiply(matrix)
    {
        return this.operateWith(matrix, (n1,n2) => n1 * n2 );
    }

    divide(matrix)
    {
        return this.operateWith(matrix, (n1,n2) => n1 / n2 );
    }

    transform(operation)
    {
        for(let row of this.data)
        {
            if( Array.isArray(row) )
            {
                for(let element in row)
                {
                    row[element] = operation(row[element]);
                }
            }
            else if(typeof row == "number")
            {
                this.data[row] = operation(this.data[row]);
            }
        }
        return this;
    }

    row(index,operation)
    {
        let row = this.data[index - 1];
        if(typeof row == "number")
        {
            this.data[row] = operation(row);
        }
        else if( Array.isArray(row) )
        {
            for(let element in row)
            {
                row[element] = operation(row[element]);
            }
        }
        return this;
    }

    column(index,operation)
    {
        for(let row in this.data)
        {
            if(typeof row == "number")
            {
                this.data[row] = operation(row);
            }
            else if( Array.isArray(row) )
            {
                row[index] = operation(row[index]);
            }
        }
        return this;
    }

    diagonal(type,operation)
    {
        if(type == 1)
        {
            let diagonal = 0;
            for(let row of this.data)
            {
                row[diagonal] = operation(row[diagonal]);
                diagonal++;
            }   
        }
        else if(type == 2)
        {
            let diagonal = this.data.length;
            for(let row of this.data.map(e=>e).reverse())
            {
                row[diagonal] = operation(row[diagonal]);
                diagonal--;
            }   
        }
        return this;
    }

    clone()
    {
        let newMatrix = [];
        for(let row of this.data)
        {
            if(typeof row == "number")
            {
                newMatrix.push(row);
            }
            else if(Array.isArray(row))
            {
                let newRow = [];
                for(let e of row)
                {
                    newRow.push(e);
                }
                newMatrix.push(newRow);
            }
        }
        return new Matrix(newMatrix);
    }

    operateWith(matrix,operation)
    {
        let newMatrix = [];
        if(matrix instanceof Matrix)
        {   
            matrix = matrix.data
        }
        for(let row in this.data)
        {
            let r1 = this.data[row];
            let r2 = matrix[row];
            let newRow = [];
            if(typeof r1 == "number" && typeof r2 == "number")
            {
                newMatrix.push(operation(r1,r2))
            }
            else if( Array.isArray(r1) && typeof r2 == "number" )
            {
                newRow[0] = operation(r1[0],r2);
                for(let i = 1; i < r1.length; i++)
                {
                    newRow[i] = r1[i];
                }
                newMatrix.push(newRow);
            }
            else if( typeof r1 == "number" && Array.isArray(r2) )
            {
                newMatrix.push(operation(r1,r2[0]));
            }
            else if( Array.isArray(r1) && Array.isArray(r2) )
            {
                for(let n in r1)
                {   
                    let e1 = r1[n];
                    let e2 = r2[n];
                    if( e1 == undefined && e2 != undefined )
                    {
                        newRow.push(e2);
                    }
                    else if( e2 == undefined && e1 != undefined )
                    {
                        newRow.push(e1);
                    }
                    else 
                    {
                        newRow.push(operation(r1[n],r2[n]));
                    }
                }
                newMatrix.push(newRow);
            }  
        }
        return new Matrix(newMatrix);
    }
}

module.exports = Matrix;