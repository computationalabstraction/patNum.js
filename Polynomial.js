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
                    temp.push(this.coeffs[i][0] + p.coeffs[i][0]);
                }
            }
            else
            {
                let bigger = 0;
                let smaller = 0;
                if(this.degree()>p.degree()) 
                {
                    bigger = this;
                    smaller = p;
                }
                else
                {
                    bigger = p;
                    smaller = this
                }
                let offset = bigger.degree()-smaller.degree();
                for(let i = 0;i < offset;i++)
                {
                    temp.push([bigger.coeffs[i][0],bigger.degree()-i-1]);
                }
                for(let i = 0;i < smaller.degree();i++)
                {
                    let rec = [0,smaller.degree()-i-1];
                    if(bigger.coeffs[i+offset] != undefined)
                    {
                        rec[0] = bigger.coeffs[i+offset][0];
                    }
                    if(smaller.coeffs[i] != undefined)
                    {
                        rec[0] = rec[0] + smaller.coeffs[i][0];
                    }
                    temp.push(rec);
                }
            }
            const rp = new Polynomial();
            rp.coeffs = temp;
            return rp;
        }

    }

    substract(p)
    {
        const temp = [];
        for(let c in p.coeffs)
        {
            if(c == 0) temp.push(-p.coeffs[c][0]);
            else temp.push(p.coeffs[c][0]);
        }
        return this.add(new Polynomial(...temp));
    }

    multiply(p)
    {
        let temp = [];
        for(let c of this.coeffs)
        {

        }
    }

    toString()
    {
        let str = "";
        for(let i = 0;i < this.coeffs.length;i++)
        {
            let c = this.coeffs[i][0];
            let pow = this.coeffs[i][1];
            if(i != 0) str += (c>=0?"+":"") + (c==1?"":c) + (pow==0?"": (pow==1?"x":`x^${pow}`));
            else str += (c==1?"":c) + (pow==0?"": (pow==1?"x":`x^${pow}`));
        }
        return str;
    }
}

const p1 = new Polynomial(1,-4,7);
console.log(p1.toString());
const p2 = new Polynomial(2,4,2,4);
console.log(p2.toString());
console.log(`${p1.toString()} + ${p2.toString()} = ${p1.add(p2).toString()}` );
console.log(`${p1.toString()} - ${p2.toString()} = ${p1.substract(p2).toString()}` );