class Polynomial
{
    constructor(...vals)
    {
        this.coeffs = [];
        for(let i in vals) this.coeffs.push( [ vals[i] , vals.length-i-1 ] );
    }

    degree()
    {
        return this.coeffs.length;
    }

    add(p)
    {
        if(p instanceof Polynomial)
        {
            const temp = [];
            if(this.degree() == p.degree())
            {
                for(let i in this.coeffs)
                {
                    temp.push(this.coeffs[i] + p.coeffs[i]);
                }
            }
            else
            {
                const offset = this.degree() - p.degree();
                if(offset > 0)
                {
                    for(let i = 0;i<offset;i++) temp.push(this.coeffs[i]);
                    for(let i = offset; i < this.coeffs.length;i++) temp.push(this.coeffs[i] + p.coeffs[i]);
                }
                else if(offset < 0)
                {
                    for(let i = 0;i < Math.sign(offset)*offset;i++) temp.push(p.coeffs[i]);
                    for(let i = offset; i < this.coeffs.length;i++) temp.push(this.coeffs[i] + p.coeffs[i]);
                }
            }
            console.log(temp);
            return new Polynomial(...temp);
        }

    }

    toString()
    {
        let str = "";
        for(let i = 0;i < this.coeffs.length;i++)
        {
            let c = this.coeffs[i][0];
            let pow = this.coeffs[i][1];
            if(i != 0) str += (c>0?"+":"") + (c==1?"":c) + (pow==0?"": (pow==1?"x":`x^${pow}`));
            else str += (c==1?"":c) + (pow==0?"": (pow==1?"x":`x^${pow}`));
        }
        return str;
    }
}

const p1 = new Polynomial(1,-4,7);
console.log(p1.toString());
const p2 = new Polynomial(2,2,4);
console.log(p2.toString());
console.log(p1.toString() + " + " + p2.toString());
console.log(p1.add(p2).toString());