function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Matrix
{
    // Static Methods

    static of(rows,columns)
    {
        const m = new Matrix(null,rows,columns,true);
        return m;
    }

    static random(rows,columns)
    {
        const m = new Matrix(null,rows,columns,true);
        m.randomize();
        return m;
    }

    static from(array)
    {
        return new Matrix(array);
    }

    constructor(array,rows = null,columns = null,fill = false)
    {
        this.data = array;
        if(rows && columns)
        {
            this.rows = rows;
            this.columns = columns;
            if(fill)
            {
                if(this.data == null || this.data == undefined)
                {
                    this.data = [];
                }
                for(let i = 0; i < rows; i++)
                {
                    let row = [];
                    for(let j = 0; j < columns; j++)
                    {
                        row.push(0);
                    }
                    this.data.push(row);
                }
            }
        }
        else
        {
            this.rows = 0;
            this.columns = 0;
            for(let row of this.data)
            {
                if(typeof row == "number")
                {
                    this.columns++;
                    if(this.rows == 0)
                    {
                        this.rows = 1;
                    }
                }
                else if(Array.isArray(this.data))
                {
                    this.rows++;
                    if(this.columns == 0)
                    {
                        this.columns = row.length;
                    }
                }
            }
        }
    }

    to(row,column,value)
    {
        this.data[row - 1][column - 1] = value;
        return this;
    }

    at(row,column)
    {
        return this.data[row - 1][column - 1];;
    }

    fill(n)
    {
        this.transform( (v) => n );
        return this;
    }

    add(matrix)
    {
        return this.operateWith(matrix, (n1,n2) => n1 + n2 );
    }

    subtract(matrix)
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

    randomize(min = -1 , max = 1)
    {
        for(let rows of this.data)
        {
            for(let element in rows)
            {
                rows[element] = random(min,max);
            }
        }
        return this;
    }

    dot(matrix)
    {
        if(matrix instanceof Matrix)
        {
            let rows = this.rows;
            let columns = matrix.columns;
            let newMatrix = new Matrix(null,rows,columns,true);
            if(this.columns == matrix.rows)
            {
                let m1 = this.data;
                let m2 = matrix.data;
                for(let i = 0; i < this.rows; i++)
                {
                    for(let j = 0; j < matrix.columns; j++)
                    {
                        let sum = 0;
                        for(let k = 0; k < matrix.rows; k++)
                        {
                            sum += m1[i][k] * m2[k][j];
                        }
                        newMatrix.data[i][j] = sum;
                    }

                }
                return newMatrix;
            }
            return this;
        }
        return this;
    }

    transpose()
    {
        let newMatrix = new Matrix(null,this.columns,this.rows,true)
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0; j < this.columns; j++)
            {
                newMatrix.data[j][i] = this.data[i][j];
            }
        }
        return newMatrix;
    }

    flatMap(map)
    {
        let arr = [];
        for(let rows of this.data)
        {
            for(let element of rows)
            {
                if(map)
                {
                    arr.push(map(element));
                }
                else
                {
                    arr.push(element);
                }
            }
        }
        return arr;
    }

    flatten()
    {
        let arr = [];
        for(let rows of this.data)
        {
            for(let element of rows)
            {
                arr.push(element);
            }
        }
        return arr;
    }

    transform(operation)
    {
        let column = 0;
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
            column++;
        }
        return this;
    }

    map(operation)
    {
        let newMatrix = new Matrix(null,this.rows,this.columns,true);
        let column = 0;
        for(let row of newMatrix.data)
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
                newMatrix[row] = operation(this.data[row]);
            }
            column++;
        }
        return newMatrix;
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
            for(let row of this.data.map(e => e).reverse())
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
        if(typeof matrix == "number")
        {

            for(let row of this.data)
            {
                let newRow = [];
                for(let column of row)
                {
                    newRow.push(operation(column,matrix));
                }
                newMatrix.push(newRow);
            }

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


function Vector(array)
{
    return new Matrix(array);
}

function ColVector(array)
{
    let output = [];
    for(let i of array)
    {
        output.push([i]);
    }
    return new Matrix(output);
}


// Exports ---------------------------------------------------------------------

// Matrix
module.exports.Matrix = Matrix;
module.exports.of = Matrix.of;
module.exports.random = Matrix.random;
module.exports.from = Matrix.from;

// Vectors
module.exports.Vector = Vector;
module.exports.ColVector = ColVector;
