class PSet
{
    constructor(...values)
    {
        this.data = [];
        this.length = 0;
        for(let v of values)
        {
            if(!(v in this.data))
            {
                this.data.push(v);
                length++;
            }
        }
    }

    get(index)
    {
        if(index<0) index = this.length - index;
        if(index < this.length)
        {
            return this.data[index];
        }
    }

    add(v)
    {
        if(!(v in this.data)) this.data.push(v);
    }

    has(v)
    {
        if(v in this.data) return true;
        return false;
    }

    subset(s)
    {
        if(s instanceof PSet)
        {
            let decider = false;
            for(let v of s.data)
            {
                if(!(v in this.data)) decider = false;
            }
            return decider;
        }
        throw new TypeError("Please send a PSet Object");
    }

    powerset()
    {
        
    }

    union(s)
    {
        if(s instanceof PSet)
        {
            let data = [];
            for(let v of this.data) data.push(v);
            for(let v of s.data) !(v in data)?data.push(v):0;
            return new PSet(...data);
        }
        throw new TypeError("Please send a PSet Object");
    }

    intersect(s)
    {
        if(s instanceof PSet)
        {
            
        }
        throw new TypeError("Please send a PSet Object");
    }

    complement(u)
    {
        if(s instanceof PSet)
        {
            
        }
        throw new TypeError("Please send a PSet Object");
    }

    cartesian(s)
    {
        if(s instanceof PSet)
        {
            
        }
        throw new TypeError("Please send a PSet Object");
    }

    substract(s)
    {
        if(s instanceof PSet)
        {
            
        }
        throw new TypeError("Please send a PSet Object");
    }
}