const Construct = require("./Protocols").Construct;
const Matrix = require("../Matrix").Matrix;
const Fraction = require("./Fraction");
// const Polynomial = require("./Polynomial");

// Polynomial to be introduced later
// First Prirority Matrix 
// Second Priority Complex
// Third Priority Fraction
// Fourth Priority Number
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
            else
            {
                this.a = 0;
                this.b = val[0];
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
        if(typeof(n) == "number" || n instanceof Construct)
        {
            n = new Complex(n,0);
        }
        var temp = new Complex();
        if(this.a instanceof Construct) temp.a = this.a.substract(n.a);
        else if(n.a instanceof Construct) {
            if(n.a instanceof Fraction)
            {
                temp.a = new Fraction(this.a).substract(n.a);
            }
        }
        else temp.a = this.a - n.a;
        if(this.b instanceof Construct) temp.b = this.b.substract(n.b);
        else if(n.b instanceof Construct){
            if(n.b instanceof Fraction)
            {
                temp.b = new Fraction(this.b).substract(n.b);
            }
        }
        else temp.b =  this.b - n.b;
        return temp;
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


const next = new Complex(1,4).add(new Fraction(1,3));
console.log(next);
console.log(next.toString());

const next2 = new Complex(1,4).add(Matrix.from([ [1,2] , [3,4] ]));
console.log(next2);
console.log(next2.toString());

// Remeber to add this to SHM lib and combine it with patnum.js
// ********************************************************
// https://www.acs.psu.edu/drussell/demos/superposition/superposition.html
// ********************************************************

// Tests Taken and Results verified from Khan Academy
// https://www.khanacademy.org/math/algebra2/introduction-to-complex-numbers-algebra-2/multiplying-complex-numbers-algebra-2/a/multiplying-complex-numbers

// // Multiply -> −4(13+5i)
// console.log("Calculating −4(13+5i)");
// const c1 = new Complex(13,5);
// console.log(c1.toString());
// console.log(c1.multiply(-4).toString());

// // Multiply -> 2i(3−8i)
// console.log("Calculating 2i(3−8i)");
// const c2 = new Complex(3,-8);
// const c3 = new Complex(2);
// console.log(c2.toString());
// console.log(c3.toString());
// console.log(c2.multiply(c3).toString());

// // Multiply 3(-2+10i) 
// console.log("Calculating 3(-2+10i)");
// const c4 = new Complex(-2,10);
// console.log(c4.toString());
// console.log(c4.multiply(3).toString());

// // Multiply -> −6i(5+7i)
// console.log("Calculating −6i(5+7i)");
// const c5 = new Complex(5,7);
// const c6 = new Complex(-6);
// console.log(c5.toString());
// console.log(c6.toString());
// console.log(c5.multiply(c6).toString());

// // Multiply -> (1+4i)(5+i)
// console.log("Calculating (1+4i)(5+i)");
// const c7 = new Complex(1,4);
// const c8 = new Complex(5,1);
// console.log(c7.toString());
// console.log(c8.toString());
// console.log(c7.multiply(c8).toString());

// // Multiply -> (1+2i)(3+i)
// console.log("Calculating (1+2i)(3+i)");
// const c9 = new Complex(1,2);
// const c10 = new Complex(3,1);
// console.log(c9.toString());
// console.log(c10.toString());
// console.log(c9.multiply(c10).toString());

// // Multiply -> (4+i)(7−3i)
// console.log("Calculating (4+i)(7−3i)");
// let c11 = new Complex(4,1);
// let c12 = new Complex(7,-3);
// console.log(c11.toString());
// console.log(c12.toString());
// console.log(c11.multiply(c12).toString());

// // Multiply -> (2−i)(2+i)
// console.log("Calculating (2−i)(2+i)");
// c11 = new Complex(2,-1);
// c12 = new Complex(2,1);
// console.log(c11.toString());
// console.log(c12.toString());
// console.log(c11.multiply(c12).toString());

// // Multiply -> (1+i)(1+i)
// console.log("Calculating (1+i)(1+i)");
// c11 = new Complex(1,1);
// c12 = new Complex(1,1);
// console.log(c11.toString());
// console.log(c12.toString());
// console.log(c11.multiply(c12).toString());

// // Multiply -> (1+3i)^2 ⋅ (2+i)
// console.log("Calculating (1+3i)^2 ⋅ (2+i)");
// c11 = new Complex(1,3);
// c12 = new Complex(2,1);
// console.log(c11.toString());
// console.log(c12.toString());
// console.log(c11.multiply(c11).multiply(c12).toString());

// console.log("(3 + 3i)");
// console.log(new Complex(3,3).pow(5).toString());

// Exports ---------------------------------------------------------------------
module.exports = Complex;
