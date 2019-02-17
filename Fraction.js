function gcd(a,b)
{
    if(b == 0) return a; 
    else return gcd(b, a % b);
}

function lcm(a,b)
{
    return a / gcd(a,b) * b
}

class Fraction
{
    constructor(n,d)
    {
        this.n = n;
        this.d = d;
    }

    add(x)
    {
        if(typeof(x) == "Number")
        {
            x = new Fraction(x,1);
        }
        else if(x instanceof Fraction)
         {
            let temp = new Fraction();
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
            return temp;
        }
    }

    substract(x)
    {
        if(typeof(x) == "Number")
        {
            x = new Fraction(x,1);
        }
        else if(x instanceof Fraction)
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
        else if(x instanceof Fraction)
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
        else if(x instanceof Fraction)
        {
            x = new Fraction(x.d,x.n);
            return this.multiply(x);
        }
    }

    toString()
    {   
        return `${this.n}/${this.d}`;
    }
}


let f1 = new Fraction(5,2);
let f2 = new Fraction(7,3);

console.log(f1.toString());
console.log(f2.toString());
console.log(f1.add(f2).toString());


f1 = new Fraction(4,6);
f2 = new Fraction(2,5);

console.log(f1.toString());
console.log(f2.toString());
console.log(f1.substract(f2).toString());