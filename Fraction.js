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
                temp.n = (this.d * x.n) + (x.d * this.n);
                temp.d = this.d * x.d;
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
                temp.n = (this.d * x.n) - (x.d * this.n);
                temp.d = this.d * x.d;
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
            temp.n = this.n * x.n;
            temp.d = this.d * x.d;
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