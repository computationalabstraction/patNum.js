const Construct = require("./Protocols").Construct;

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
    constructor(n,d=1)
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
            let temp = new Fraction();
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
            let temp = new Fraction();
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

// let f1 = new Fraction(0.75);
// console.log(f1.toString());

// let f2 = recurringToFraction(0,undefined,3);
// console.log(f2.toString());

module.exports = Fraction; 

// let f1 = new Fraction(5,2);
// let f2 = new Fraction(7,3);

// console.log(f1.toString());
// console.log(f2.toString());
// console.log(f1.add(f2).toString());


// f1 = new Fraction(4,6);
// f2 = new Fraction(2,5);

// console.log(f1.toString());
// console.log(f1.reduce().toString());
// console.log(f2.toString());
// console.log(f1.substract(f2).toString());