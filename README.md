# <img src="./patnumlogo.png">

### A Library for Mathematics in Javascript

### patNum.js provides constructs and utilites to work with-
### 1. `Statistics`
### 2. `Matrices`
### 3. `Fractions`
### 4. `Polynomials`
### 5. `Complex Numbers`
### 6. `Waves`
### 7. `Game Theory`

## Statistics

#### `Min (Lowest Observation)`
``` javascript
pn.Min( [ 13, 22, 26, 38, 36, 42 ] ); // Returns - 13
```

#### `Max (Highest Observation)`
``` javascript
pn.Max( [ 49, 50, 77, 81, 98, 110 ] ); // Returns - 110
```

#### `Range (Span of Data)`
``` javascript
// Range = Max - Min
pn.Range( [ 49, 50, 77, 81, 98, 110 ] ); // Returns - 61
```

#### `AFrequency (Frequency of A Specific Number)`
``` javascript
pn.AFrequency( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] , 2 );
// Returns - { Value: 2 , Occurance: 2 }
```

#### `SomeFrequencies (Frequency of Some Numbers)`
``` javascript
pn.SomeFrequencies( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] , [ 4, 2 ] );
// Returns - [ { Value: 4 , Occurance: 2 } , { Value: 2 , Occurance: 2 } ]
```

#### `AllFrequencies (Frequency of All the Numbers)`
``` javascript
pn.AllFrequencies( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - Frequencies of all the Numbers
```

#### `Mean (Central Tendency)`
``` javascript
pn.Mean( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - 8.63
```

#### `Medain (Central Tendency)`
``` javascript
pn.Median( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - 4
```

#### `Mode (Central Tendency)`
``` javascript
pn.Mode( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - 11
```

#### `SampleStandardDeviation (Deviation)`
``` javascript
pn.SampleStandardDeviation( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - 12.46
```

#### `PopulationStandardDeviation (Deviation)`
``` javascript
pn.PopulationStandardDeviation( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - 11.88
```

#### `MeanAbsoluteDeviation (Deviation)`
``` javascript
pn.MeanAbsoluteDeviation( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - 7.47
```

#### `MedianAbsoluteDeviation (Deviation)`
``` javascript
pn.MedianAbsoluteDeviation( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - 2
```

### Other Operations

#### - `GeometricMean`
#### - `HarmonicMean`
#### - `RootMeanSquare`
#### - `SampleVariance`
#### - `PopulationVariance`
#### - `BernoulliDistribution`


## Matrix
> All Operations also work with Scalars

#### `Matrix Creation`
``` javascript
const m1 = pn.matrix([
    [1000,2000,3000,4000],
    [100,200,300,400]
]);
```

#### `Matrix Addition`
``` javascript
const m1 = pn.matrix([
    [1000,2000,3000,4000],
    [100,200,300,400]
]);

const m2 = pn.matrix([
    [100,200,300,400],
    [1000,2000,3000,4000]
]);

const m3 = m1.add(m2); // Returns a New Matrix
```

#### `Matrix Subtraction`
``` javascript
const m1 = pn.matrix([
    [10,20],
    [100,200]
]);

const m2 = pn.matrix([
    [100,200,300,400],
    [1000,2000,3000,4000]
]);

const m3 = m1.subtract(m2); // Returns a New Matrix
```

#### `Matrix Hadamard Multiply`
``` javascript
const m1 = pn.matrix([
    [1,2],
    [10,20]
]);

const m2 = pn.matrix([
    [5,10],
    [50,100]
]);

const m3 = m1.multiply(m2); // Returns a New Matrix
```

#### `Matrix Dot Product (Matrix Linear Multiplication)`
``` javascript
const m1 = pn.matrix([
    [10,20],
    [30,40],
    [50,60]
])

const m2 = pn.matrix([
    [10,20,30],
    [40,50,60]
])

const m3 = m1.dot(m2); // Returns a New Matrix
```

#### `Matrix Divide`
``` javascript
const m1 = pn.matrix([
    [1,2],
    [10,20]
]);

const m2 = pn.matrix([ 2 , 20 ]);

const m3 = m1.divide(m2); // Returns a New Matrix
```

#### `Matrix Modify`
``` javascript
const m1 = pn.matrix([
    [10,20],
    [30,40],
    [50,60]
]);

m1.at(1,1,100); // It will change 10 -> 100
```

#### `Matrix Map`
``` javascript
const m1 = pn.matrix([
    [10,20],
    [30,40],
    [50,60]
]);

const m2 = m1.map(e => e ** 2); // It will return a new Matrix
```

#### `Matrix Transpose`
``` javascript
const m1 = pn.matrix([
    [10,20],
    [30,40],
    [50,60]
]);

const m2 = m1.transpose(); // Returns a New Matrix
```

#### `Matrix Clone`
``` javascript
const m1 = pn.matrix([
    [1,2],
    [10,20]
]);

const m2 = m1.clone(); // Returns a New Matrix
```

#### `Matrix Randomize`
``` javascript
const m1 = pn.matrix([
    [10,20],
    [30,40],
    [50,60]
]);

m1.randomize(0,10); // Will choose a random value from 0 to 10 for all the elements of the Matrix
m1.randomize(); // By Default range is from -1 to 1
```

#### `Matrix Flatten`
``` javascript
const m1 = pn.matrix([
    [10,20],
    [30,40],
    [50,60]
]);

let am1 = m1.flatten(); // It will flatten the Matrix to [10,20,30,40,...] and return the Array
```

#### `Matrix FlatMap`
``` javascript
const m1 = pn.matrix([
    [10,20],
    [30,40],
    [50,60]
]);

let am1 = m1.flatMap( e => e * 2 );
// It will flatten [10,20,30,40,...] and then apply the operation to each element [20,40,60,80,...] and return the Array
```

#### `Row Vector`
``` javascript
const m1 = pn.vector([ 10, 20, 30 ]);
```

#### `Column Vector`
``` javascript
const m1 = pn.colVector([ 10, 20, 30 ]);
```
###### `Vector` is internally a Matrix and supports all the operations which are supported on Matrix


## Fractions

#### `Creating Fractions`
``` javascript
const f1 = pn.fraction(2,7);
```

#### `Printing Fractions`
``` javascript
const f1 = pn.fraction(3,9);
console.log(f1.toString());
```

#### `Adding Fractions`
``` javascript
const f1 = pn.fraction(5,2);
const f2 = pn.fraction(7,3);
const f3 = f1.add(f2);
console.log(f3.toString());
```

#### `Substracting Fractions`
``` javascript
const f1 = pn.fraction(4,3);
const f2 = pn.fraction(8,9);
const f3 = f1.add(f2);
console.log(f3.toString());
```

#### `Multiplying Fractions`
``` javascript
const f1 = pn.fraction(5,2);
const f2 = pn.fraction(4,8);
const f3 = f1.add(f2);
console.log(f3.toString());
```

#### `Dividing Fractions`
``` javascript
const f1 = pn.fraction(5,10);
const f2 = pn.fraction(2,5);
const f3 = f1.add(f2);
console.log(f3.toString());
```

## Complex Numbers

#### `Complex Number Creation`
```javascript
const c1 = pn.complex(10,2); // 10(Real) , 2(Coefficient of i)
```

#### `Complex toString`
```javascript
const c1 = pn.complex(10,2);
console.log(c1.toString()); // -> 10 + 2i
```

### `Note:` Any Operation which transforms Complex Number in any way returns a new Complex Object

#### `Complex add`
```javascript
const c1 = pn.complex(10,2);
const c2 = pn.complex(5,3);
console.log(c1.add(c2).toString()); 
```

#### `Complex substract`
```javascript
const c1 = pn.complex(10,2);
const c2 = pn.complex(5,3);
console.log(c1.substract(c2).toString()); 
```

#### `Complex multiply`
```javascript
const c1 = pn.complex(5,7);
const c2 = pn.complex(-6);
console.log(c1.multiply(c2).toString());
```

#### `Complex divide`
```javascript
const c1 = pn.complex(5,10);
console.log(c1.divide(2).toString());
```

#### `Complex pow`
```javascript
const c1 = pn.complex(5,10);
console.log(c1.pow(2).toString());
```

#### `Complex sqrt`
```javascript
const c1 = pn.complex(4,4);
console.log(c1.sqrt().toString());
```

#### `Complex exp`
```javascript
const c1 = pn.complex(4,4);
console.log(c1.exp().toString());
```

#### `Complex log`
```javascript
const c1 = pn.complex(10,10);
console.log(c1.log().toString());
```

#### `Complex sin`
```javascript
const c1 = pn.complex(8,9);
console.log(c1.sin().toString());
```

#### `Complex cos`
```javascript
const c1 = pn.complex(1,7);
console.log(c1.cos().toString());
```

#### `Complex sinh`
```javascript
const c1 = pn.complex(8,9);
console.log(c1.sinh().toString());
```

#### `Complex cosh`
```javascript
const c1 = pn.complex(1,7);
console.log(c1.cosh().toString());
```

#### `Complex angle (Angle of Complex Number in Degrees)`
```javascript
const c1 = pn.complex(6,2);
console.log(c1.angle());
```

#### `Complex mod`
```javascript
const c1 = pn.complex(-5,10);
console.log(c1.mod().toString());
```

#### `Complex conjugate`
```javascript
const c1 = pn.complex(5,10);
console.log(c1.conjugate().toString());
```

#### `Complex addinv (Additive Inverse)`
```javascript
const c1 = pn.complex(5,10);
console.log(c1.addinv().toString());
```

#### `Complex mulinv (Multiplicative Inverse)`
```javascript
const c1 = pn.complex(5,10);
console.log(c1.mulinv().toString());
```

#### `Complex toArray`
```javascript
const c1 = pn.complex(5,10);
console.log(c1.toArray());
```

## Waves

#### `Simple Harmonic Motion Wave`
```javascript
const y = pn.oscillatorWave({ 
    amplitude:0.5,
    period:3.2
});
console.log(y.of(4)); 
```

#### `General Wave (One Dimensional Harmonic Motion Wave which Propogates)`
```javascript
const z = pn.wave({
    amplitude:3,
    wavelength:4,
    period:8,
    start:3
});
console.log(z.of(2,1)); 
```

#### `Superpostion of General Waves`
```javascript
const z = pn.wave({
    amplitude:3,
    wavelength:4,
    period:8,
    start:3
});

// You can pass variable number of waves as paramenters while calling superimpose
const sz = z.superimpose(z); 
// superimpose method returns a Superposition Object which will be internally an amalgamation of all the waves imposed on the original wave

// Superposition Object internally keeps a list with references to all the waves of which then combine to create Superposition. Superposition follows the same protocol/interface as Wave so it can be used in a composite fashion shown in the next example

// Will amplify the original wave by the factor of 2
console.log(sz.of(2,1)); 
```

#### `Composite Superpostion`
```javascript
const x = pn.wave({
    amplitude:3,
    wavelength:4,
    period:8,
    start:3
});

const sx = x.superimpose(x); // Will amplify the original wave by the factor of 2

const z = pn.wave({
    amplitude:5,
    wavelength:2,
    period:4,
    start:5
});

const sz = z.superimpose(z,sx); // Can also pass Superpositions Instances 

console.log(sz.of(2,1)); 
```

### `Composite Superpostion example with phase shift`
```javascript
const w1 = pn.wave({
    amplitude:3,
    wavelength:4,
    period:8,
    start:1
});

const w2 = pn.wave({
    amplitude:3,
    wavelength:4,
    period:8,
    start:1,
    shift:180
});

const sw = w1.superimpose(w1,w1,w2);

const w3 = pn.wave({
    amplitude:5,
    wavelength:2,
    period:3,
    start:1
});

const ssw = w3.superimpose(w3,sw);

console.log(ssw.of(2,0)); // It will be 3 + 3 + 3 - 3 + 5 + 5 = 16 ( Adding the Amplitudes )
```