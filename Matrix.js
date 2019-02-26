const Construct = require("./Protocols").Construct;
const Fraction = require("./Fraction");
const Complex = require("./Complex");

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Matrix extends Construct
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
        super();
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
        return this.data[row - 1][column - 1]; 
    }

    fill(n)
    {
        this.transform( (v) => n );
        return this;
    }

    _add(n1,n2)
    {
        if(typeof n1 == "Number" && typeof n2 == "Number") return n1+n2;
        else return n1.add(n2);
    }

    _substract(n1,n2)
    {
        if(typeof n1 == "Number" && typeof n2 == "Number") return n1-n2;
        else return n1.subtract(n2);
    }


    _multiply(n1,n2)
    {
        if(typeof n1 == "Number" && typeof n2 == "Number") return n1*n2;
        else return n1.multiply(n2);
    }

    _divide(n1,n2)
    {
        if(typeof n1 == "Number" && typeof n2 == "Number") return n1*n2;
        else return n1.divide(n2);
    }

    add(matrix)
    {
        return this.operateWith(matrix, this._add );
    }

    subtract(matrix)
    {
        return this.operateWith(matrix, this._substract );
    }

    multiply(matrix)
    {
        return this.operateWith(matrix, this._multiply );
    }

    divide(matrix)
    {
        return this.operateWith(matrix, this._divide );
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
                            sum += this._multiply(m1[i][k],m2[k][j]);
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
            else if(typeof row == "number" || row instanceof Construct)
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
            else if(typeof row == "number" || row instanceof Construct)
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
            if(typeof row == "number" || row instanceof Construct)
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
            if(typeof row == "number" || row instanceof Construct)
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

    minor(i,j)
    {
        const temp =  Matrix.of(this.rows-1,this.columns-1);
        let rt = 1;
        let ct = 1;
        for(let rows = 1; rows <= this.rows; rows++)
        {
            if(rows == i) continue;
            for(let columns = 1; columns <= this.columns; columns++)
            {
                if(columns == j) continue;
                temp.to(rt,ct++,this.at(rows,columns));
            }
            rt++;
            ct = 1;
        }
        return temp;
    }

    cofactor(i,j)
    {
        return ( (-1) ** (i+j) ) * this.at(i,j);
    }

    cofactorSign(i,j)
    {
        return ( (-1) ** (i+j) );
    }

    determinant()
    {
        if(this.rows == 1 && this.columns == 1) return this.at(1,1);
        let sum = 0;
        for(let column = 1;column <= this.data[0].length; column++)
        {
            let i = this.cofactor(1,column) * this.minor(1,column).determinant();
            sum += i;
        }
        return sum;
    }

    inverse()
    {
        let det = this.determinant();
        if(det == 0) throw Error("Only Non-Singular Matrices have inverse");
        let CofM = Matrix.of(this.rows,this.columns);
        for(let rows = 1; rows <= this.rows;rows++)
        {
            for(let columns = 1;columns<=this.columns;columns++)
            {
                let e = this.cofactorSign(rows,columns) * this.minor(rows,columns).determinant();
                CofM.to(rows,columns,e);
            }
        }
        let AdjM = CofM.transpose();
        return AdjM.divide(det);
    }

    inverse2()
    {
        let det = this.determinant();
        if(det == 0) throw Error("Only Non-Singular Matrices have inverse");
        let CofM = Matrix.of(this.rows,this.columns);
        for(let rows = 1; rows <= this.rows;rows++)
        {
            for(let columns = 1;columns<=this.columns;columns++)
            {
                let e = this.cofactorSign(rows,columns) * this.minor(rows,columns).determinant();
                CofM.to(rows,columns,e);
            }
        }
        let AdjM = CofM.transpose();
        AdjM.transform((v) => new Fraction(v,det));
        return AdjM;
    }

    toString()
    {
        let str = "";
        str += "[\n";
        for(let i = 0; i < this.rows;i++)
        {
            str += " "
            for(let j = 0; j < this.columns;j++)
            {
                let v = this.data[i][j];
                if(v instanceof Construct) str += v.toString();
                else str += v;
                str += " "
            }
            str += "\n";
        }
        str += "]";
        return str;
    }

    operateWith(matrix,operation)
    {
        let newMatrix = [];
        if(typeof matrix == "number" || matrix instanceof Construct)
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
        else if(matrix instanceof Matrix)
        {
            for(let row in this.data)
            {
                let r1 = this.data[row];
                let r2 = matrix[row];
                let newRow = [];
                if(typeof r1 == "number" || r1 instanceof Construct && typeof r2 == "number" || r1 instanceof Construct)
                {
                    newMatrix.push(operation(r1,r2))
                }
                else if( Array.isArray(r1) && typeof r2 == "number" || r1 instanceof Construct)
                {
                    newRow[0] = operation(r1[0],r2);
                    for(let i = 1; i < r1.length; i++)
                    {
                        newRow[i] = r1[i];
                    }
                    newMatrix.push(newRow);
                }
                else if( typeof r1 == "number" || r1 instanceof Construct && Array.isArray(r2) )
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

// m2.clone().diagonal(1,n => n * 2).row(1,n => n / 2).transform(n => n ** 2)

// const m1 = Matrix.from([
//     [10,20,30],
//     [5,6,7],
//     [11,22,33]
// ]);

// console.log(m1.determinant());
// console.log(m1.inverse());

// const m2 = Matrix.from([
//     [9,3,5],
//     [-6,-9,7],
//     [-1,-8,1]
// ]);

// console.log(m2.determinant());
// console.log(m2.inverse().toString());

// const pauliY = Matrix.from(
//     [
//         [0,new Complex(0,-1)],
//         [new Complex(0,1),0]
//     ]
// );

// console.log(pauliY.toString());

// Exports ---------------------------------------------------------------------

// Matrix
module.exports.Matrix = Matrix;
module.exports.of = Matrix.of;
module.exports.random = Matrix.random;
module.exports.from = Matrix.from;

// Vectors
module.exports.Vector = Vector;
module.exports.ColVector = ColVector;
