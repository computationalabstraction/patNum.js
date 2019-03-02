const Construct = require("./Protocols").Construct;
const Matrix = require("./Matrix").Matrix;
const Fraction = require("./Fraction");
const Complex = require("./Complex");
// const Polynomial = require("./Polynomial");

// Polynomial to be introduced later
// First Prirority Matrix 
// Second Priority Complex
// Third Priority Fraction
// Fourth Priority Number
function coerse(x,y)
{
    if(typeof x == "Number" && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        }
    }
    else if(typeof x == "Number" && y instanceof Complex)
    {
        return {
            x:new Complex(x,0),
            y:y
        }
    }
    else if(typeof x == "Number" && y instanceof Fraction)
    {
        return {
            x:new Fraction(x),
            y:y
        }
    }
    else if(typeof y == "Number" && x instanceof Matrix)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        }
    }
    else if(typeof y == "Number" && x instanceof Complex)
    {
        return {
            x:x,
            y:new Complex(y,0)
        }
    }
    else if(typeof y == "Number" && x instanceof Fraction)
    {
        return {
            x:x,
            y:new Fraction(y)
        }
    }
    else if(x instanceof Matrix && y instanceof Fraction)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        }
    }
    else if(x instanceof Fraction && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        }
    }
    else if(x instanceof Complex && y instanceof Fraction)
    {
        return {
            x:x,
            y:new Complex(y,0)
        }
    }
    else if(x instanceof Fraction && y instanceof Complex)
    {
        return {
            x:new Complex(x,0),
            y:y
        }
    }
    else if(x instanceof Matrix && y instanceof Complex)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        }
    }
    else if(x instanceof Complex && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        }
    }
}

// let out = coerse(new Fraction(1,3),new Complex(1,4));
// console.log(out);
// console.log(out.x.toString());
// console.log(out.y.toString());


module.export = coerse;