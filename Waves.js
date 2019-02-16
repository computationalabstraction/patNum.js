class OscillatorWave
{
    constructor({ amplitude = 0 , period = 0 , start = 0 , shift = 0 , direction = false })
    {
        this.A = amplitude;
        this.T = period;
        this.omega = ( 2 * Math.PI ) / this.T;
        this.phi = shift;
        this.direction = direction
        this.f = start > 0 | start < 0 ? Math.cos : Math.sin; 
    }

    of(t)
    {
        if(this.direction) return -(this.A * this.f((this.omega * t + this.phi) * Math.PI/180));
        else return this.A * this.f(this.omega * t + (this.phi * Math.PI/180));
    }

    superimpose(...waves)
    {
        return new Superposition(this,...waves);
    }
}

class Wave
{
    constructor({ amplitude = 0 , wavelength = 0 , period = 0 , start = 0 , shift = 0 , direction = false } )
    {
        this.A = amplitude;
        this.T = period;
        this.L = wavelength;
        this.shift = shift;
        this.direction = direction;
        this.f = start > 0 | start < 0 ? Math.cos : Math.sin; 
    }

    of(x,t)
    {
        const kx = 2 * Math.PI / this.L * x;
        const wt = 2 * Math.PI / this.T * t;
        if(this.direction) return this.A * this.f((kx + wt + this.shift) * Math.PI/180);
        return this.A * this.f((kx - wt + this.shift) * Math.PI/180);
    }

    superimpose(...waves)
    {
        return new Superposition(this,...waves);
    }

}

class Superposition
{
    constructor(...waves)
    {
        for(let w of waves) if(!(w instanceof Wave || w instanceof OscillatorWave || w instanceof Superposition)) throw new Error("Superpostion only accepts Wave and Superposition instances");
        this.waves = waves;
    }

    of(x,t)
    {
        let total = 0;
        for(let wave of this.waves) total += wave.of(x,t);
        return total;
    }

    addWave(wave)
    {
        this.waves.push(wave);
    }
}

// const w2 = new Wave({
//     amplitude:3,
//     wavelength:4,
//     period:8,
//     start:1,
//     shift:180
// });

// const sw = w1.superimpose(w1,w1,w2);

// const w3 = new Wave({
//     amplitude:5,
//     wavelength:2,
//     period:3,
//     start:1
// });

// const ssw = w3.superimpose(w3,sw);

// console.log(ssw.of(0,0)); // It will be 3 + 3 + 3 - 3 + 5 + 5 = 16 ( Adding the Amplitudes )

// Exports ---------------------------------------------------------------------
module.exports.OscillatorWave = OscillatorWave;
module.exports.Wave = Wave;
module.exports.Superposition = Superposition;