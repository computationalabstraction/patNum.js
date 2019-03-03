class Construct 
{
    toString(){}
    add(){}
    substract(){}
    divide(){}
    multiply(){}
}

function gcd(a,b)
{
    if(b == 0) return a; 
    else return gcd(b, a % b);
}

function lcm(a,b)
{
    return a / gcd(a,b) * b
}

function decToInt(n)
{
    return parseInt((""+n).split(".").reduce((acc,v) => acc+v));
}

function digitsAfterDot(n)
{
    return (""+n).split(".")[1].length;
}

function digits(n)
{
    if(n == 0) return 0;
    return 1 + digits(n/10);
}

class Fraction extends Construct
{
    constructor(n=1,d=1)
    {
        super();
        if(d == 0) throw new Error("Cannot Divide by Zero");
        let flag1 = false;
        let flag2 = false;
        if(!Number.isInteger(n))
        {
            flag1 = true;
            this.n = decToInt(n);
        }
        else this.n = n;
        if(!Number.isInteger(d))
        {
            flag2 = true;
            this.n = decToInt(n);
        }
        else this.d = d;
        if(flag1 || flag2)
        {
            if(flag1)
            {
                this.d *= 10**digitsAfterDot(n);
            }
            if(flag2)
            {
                this.n *= 10**digitsAfterDot(d);
            }
            this.reduce();
        }
    }

    add(x)
    {
        if(x instanceof Fraction)
        {
            let temp = new Fraction(1,1);
            if(this.d == x.d) 
            {
                temp.n = this.n + x.n;
                temp.d = this.d;
            }
            else
            {
                temp.n = (x.d * this.n) + (this.d * x.n);
                temp.d = (this.d * x.d);
            }
            console.log()
            return temp;
        }
    }

    substract(x)
    {
        if(typeof(x) == "Number")
        {
            x = new Fraction(x,1);
        }
        if(x instanceof Fraction)
        {
            let temp = new Fraction(1,1);
            if(this.d == x.d) 
            {
                temp.n = this.n - x.n;
                temp.d = this.d;
            }
            else
            {
                temp.n = (x.d * this.n) - (this.d * x.n);
                temp.d = (this.d * x.d);
            }
            return temp;
        }
    }
    
    multiply(x)
    {
        if(typeof(x) == "Number")
        {
            x = new Fraction(x,1);
        }
        if(x instanceof Fraction)
        {
            let temp = new Fraction(1,1);
            temp.n = (this.n * x.n);
            temp.d = (this.d * x.d);
            return temp;
        }
    }

    divide(x)
    {
        if(typeof(x) == "Number")
        {
            x = new Fraction(1,x);
        }
        if(x instanceof Fraction)
        {
            x = new Fraction(x.d,x.n);
            return this.multiply(x);
        }
    }

    reduce()
    {
        const gcf = gcd(this.n,this.d);
        this.n /= gcf;
        this.d /= gcf;
        return this;
    }

    gcf()
    {
        return gcd(this.n,this.d);
    }

    toDecimal()
    {
        return this.n/this.d;
    }

    toString()
    {   
        return `${this.n}/${this.d}`;
    }
}

function recurringToFraction(bd,nrd,rd)
{
    let whole;
    let wholenr;
    let nd;
    let ndr;
    if(nrd != undefined)
    {
        whole = parseInt("" + bd + nrd + rd);
        wholenr = parseInt("" + bd + nrd);
        nd = 10**(("" + nrd + rd).length);
        ndr = 10**(("" + nrd).length);
    }
    else 
    {   
        whole = parseInt("" + bd + rd);
        wholenr = parseInt("" + bd);
        nd = 10**(("" + rd).length);
        ndr = 10**0;
    }
    return new Fraction(whole-wholenr,nd-ndr);
}

class Complex extends Construct
{
    constructor(...val)
    {
        super();
        if(val)
        {
            if(val.length > 1)
            {
                this.a = val[0];
                this.b = val[1];
            }
            else if(val.length == 1)
            {
                this.a = 0;
                this.b = val[0];
            }
            else
            {
                this.a = 0;
                this.b = 0;
            }
        }
    }

    add(n)
    {
        if(n instanceof Complex)
        {
            var temp = new Complex();
            if(typeof(this.a) == "number" && typeof(n.a) == "number")
            {
                temp.a = this.a + n.a;
            }
            else
            {
                let {x,y} = coerse(this.a,n.a);
                temp.a = x.add(y);
            }
            if(typeof(this.b) == "number" && typeof(n.b) == "number")
            {
                temp.b = this.b + n.b;
            }
            else
            {
                let {x,y} = coerse(this.b,n.b);
                temp.b = x.add(y);
            }
            return temp;
        }
        else
        {
            let {x,y} = coerse(this,n);
            return x.add(y);
        }
    }

    substract(n)
    {
        if(n instanceof Complex)
        {
            var temp = new Complex();
            if(typeof(this.a) == "number" && typeof(n.a) == "number")
            {
                temp.a = this.a - n.a;
            }
            else
            {
                let {x,y} = coerse(this.a,n.a);
                temp.a = x.substract(y);
            }
            if(typeof(this.b) == "number" && typeof(n.b) == "number")
            {
                temp.b = this.b - n.b;
            }
            else
            {
                let {x,y} = coerse(this.b,n.b);
                temp.b = x.substract(y);
            }
            return temp;
        }
        else
        {
            let {x,y} = coerse(this,n);
            return x.substract(y);
        }
    }

    multiply(n)
    {
        if(typeof(n) == "number" || n instanceof Construct)
        {
            n = new Complex(n,0);
        }
        var temp = new Complex();
        if(this.a instanceof Construct && this.b instanceof Construct)
        {
            temp.a = this.a.multiply(n.a).add(this.b.multiply(n.b).multiply(-1));
            temp.b = this.a.multiply(n.b).add(this.b.multiply(n.a));
        }
        else if(n.a instanceof Construct && n.b instanceof Construct)
        {
            temp.a = n.a.multiply(this.a).add(this.b.multiply(n.b).multiply(-1));
            temp.b = n.a.multiply(this.b).add(this.b.multiply(n.a));
        }
        else
        {
            temp.a = (this.a * n.a) + ((this.b * n.b) * -1);
            temp.b = (this.a * n.b) + (this.b * n.a);
        }
        return temp;
    }

    divide(n)
    {
        var temp;
        if(n instanceof Complex)
        {
            let denom = (n.a * n.a) - ( (n.b * n.b) * -1 );
            if(denom != 0)
            {
                temp = this.multiply(n);
                temp.a /= denom;
                temp.b /= denom;
            }
        }
        else
        {
            if(n != 0)
            {
                temp = new Complex();
                temp.a = this.a / n;
                temp.b = this.b / n;
            }
            else throw new Error("Cannot Divide by Zero");
        }
        return temp;
    }

    conjugate()
    {
        return new Complex(this.a,-this.b);
    }

    toArray()
    {
        return [this.a,this.b];
    }

    addinv()
    {
        return new Complex(-this.a,-this.b);
    }

    mulinv()
    {
        return new Complex( 
            ( this.a / (this.a ** 2) + (this.b ** 2) ) , 
            ( -this.b / (this.a ** 2) + (this.b ** 2) ) 
        );
    }

    mod()
    {
        return Math.sqrt(this.a ** 2 + this.b ** 2);
    }

    pow(n)
    {
        const r = this.mod();
        const iv = Math.atan(this.b/this.a);
        let temp = r ** n;
        let a = temp * (Math.cos(n * iv));
        let b = temp * (Math.sin(n * iv));
        return new Complex(a,b);
    }

    sqrt(n = 2)
    {
        return this.pow(1/n);
    }

    exp()
    {
        // Source for the Algorithm
        // https://math.stackexchange.com/questions/9770/understanding-imaginary-exponents
        const x = Math.exp(this.a);
        return new Complex(
            (x * Math.cos(this.b)),
            (x * Math.sin(this.b)) 
        );
    }

    log()
    {
        // Source for the Algorithm
        // http://www.chemistrylearning.com/logarithm-of-complex-number/
        return new Complex(
            Math.log10(this.mod()),
            Math.atan(this.b/this.a)
        );
    }

    sin()
    {
        // Source for the Algorithm
        // http://www.milefoot.com/math/complex/functionsofi.htm
        return new Complex(
            Math.sin(this.a) * Math.cosh(this.a),
            Math.cos(this.a) * Math.sinh(b)
        );
    }

    cos()
    {
        // Source for the Algorithm
        // http://www.milefoot.com/math/complex/functionsofi.htm
        return new Complex(
            Math.cosh(this.a) * Math.cos(this.a),
            Math.sinh(this.a) * Math.sin(b)
        );
    }

    sinh()
    {
        // Source for the Algorithm
        // http://www.milefoot.com/math/complex/functionsofi.htm
        return new Complex(
            Math.sinh(this.a) * Math.cos(this.a),
            Math.cosh(this.a) * Math.sin(b)
        );
    }

    cosh()
    {
        // Source for the Algorithm
        // http://www.milefoot.com/math/complex/functionsofi.htm
        return new Complex(
            Math.cos(this.a) * Math.cosh(this.a),
            -(Math.sin(this.a) * Math.sinh(b))
        );
    }

    angle()
    {
        return ( Math.atan(this.b/this.a) * 180 ) / Math.PI;
    }

    toString()
    {
        if(this.a != 0 && this.b != 0)
        {
            if(this.b < 0) return `${this.a} - ${Math.abs(this.b)}i`;
            else return `${this.a} + ${(Math.abs(this.b) == 1)?(this.b == -1)?"-":"":this.b}i`;
        }
        else if(this.b != 0) return `${(Math.abs(this.b) == 1)?(this.b == -1)?"-":"":this.b}i`;
        else if(this.a != 0) return `${this.a}`;
        else return "";
    }

}

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
        if(typeof n1 == "number" && typeof n2 == "number") return n1+n2;
        else 
        {
            let {x,y} = coerse(n1,n2);
            return x.add(y);
        } 
    }

    _substract(n1,n2)
    {
        if(typeof n1 == "number" && typeof n2 == "number") return n1-n2;
        else 
        {
            let {x,y} = coerse(n1,n2);
            return x.add(y);
        } 
    }


    _multiply(n1,n2)
    {
        if(typeof n1 == "number" && typeof n2 == "number") return n1*n2;
        else return n1.multiply(n2);
    }

    _divide(n1,n2)
    {
        if(typeof n1 == "number" && typeof n2 == "number") return n1*n2;
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
        if(typeof matrix == "number" || (matrix instanceof Construct && !(matrix instanceof Matrix)))
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
                let r2 = matrix.data[row];
                let newRow = [];
                if((typeof r1 == "number" || r1 instanceof Construct) && (typeof r2 == "number" || r1 instanceof Construct))
                {
                    newMatrix.push(operation(r1,r2))
                }
                else if( Array.isArray(r1) && (typeof r2 == "number" || r2 instanceof Construct))
                {
                    newRow[0] = operation(r1[0],r2);
                    for(let i = 1; i < r1.length; i++)
                    {
                        newRow[i] = operation(r1[i],r2);
                    }
                    newMatrix.push(newRow);
                }
                else if( (typeof r1 == "number" || r1 instanceof Construct) && Array.isArray(r2) )
                {
                    // newMatrix.push(operation(r1,r2[0]));
                    newRow[0] = operation(r1,r2[0]);
                    for(let i = 1; i < r1.length; i++)
                    {
                        newRow[i] = operation(r1,r2[i]);
                    }
                    newMatrix.push(newRow);
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

function coerse(x,y)
{
    if(typeof(x) == "number" && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        };
    }
    else if(typeof(x) == "number" && y instanceof Complex)
    {
        return {
            x:new Complex(x,0),
            y:y
        };
    }
    else if(typeof(x) == "number" && y instanceof Fraction)
    {
        return {
            x:new Fraction(x),
            y:y
        };
    }
    else if(typeof(y) == "number" && x instanceof Matrix)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        };
    }
    else if(typeof(y) == "number" && x instanceof Complex)
    {
        return {
            x:x,
            y:new Complex(y,0)
        };
    }
    else if(typeof(y) == "number" && x instanceof Fraction)
    {
        return {
            x:x,
            y:new Fraction(y)
        };
    }
    else if(x instanceof Matrix && y instanceof Fraction)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        };
    }
    else if(x instanceof Fraction && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        };
    }
    else if(x instanceof Complex && y instanceof Fraction)
    {
        return {
            x:x,
            y:new Complex(y,0)
        };
    }
    else if(x instanceof Fraction && y instanceof Complex)
    {
        return {
            x:new Complex(x,0),
            y:y
        };
    }
    else if(x instanceof Matrix && y instanceof Complex)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        };
    }
    else if(x instanceof Complex && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        };
    }
}

const next = new Complex(1,4).add(new Fraction(1,3));
console.log(next);
console.log(next.toString());

const next2 = new Complex(1,4).add(Matrix.from([ [1,2] , [3,4] ]));
console.log(next2);
console.log(next2.toString());

const next3 = Matrix.from([ [new Fraction(3,4),new Fraction(5,6)] , [new Fraction(8,7),new Fraction(2,3)] ]);
console.log(next3);
console.log(next3.toString());
const next4 = next3.add(next2)
console.log(next4);
console.log(next4.toString());