# patNum.js
### A Mathematics/Statistics Library in Javascript

### Example Usage
>patNum.js provides Statistics and Matrix Operations

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
// Returns - 11.88
```

#### `PopulationStandardDeviation (Deviation)`
``` javascript
pn.PopulationStandardDeviation( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] );
// Returns - 12.46
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
#### - `BernoulliDistribution`


## Matrix
> All Operations also work with Scalars

#### `Matrix Creation`
``` javascript
const m1 = new pn.Matrix([
    [1000,2000,3000,4000],
    [100,200,300,400]
]);
```

#### `Matrix Addition`
``` javascript
const m1 = new pn.Matrix([
    [1000,2000,3000,4000],
    [100,200,300,400]
]);

const m2 = new pn.Matrix([
    [100,200,300,400],
    [1000,2000,3000,4000]
]);

const m3 = m1.add(m2); // Returns a New Matrix
```

#### `Matrix Subtraction`
``` javascript
const m1 = new pn.Matrix([
    [10,20],
    [100,200]
]);

const m2 = new pn.Matrix([
    [100,200,300,400],
    [1000,2000,3000,4000]
]);

const m3 = m1.subtract(m2); // Returns a New Matrix
```

#### `Matrix Hadamard Multiply`
``` javascript
const m1 = new pn.Matrix([
    [1,2],
    [10,20]
]);

const m2 = new pn.Matrix([
    [5,10],
    [50,100]
]);

const m3 = m1.multiply(m2); // Returns a New Matrix
```

#### `Matrix Dot Product (Matrix Linear Multiplication)`
``` javascript
const m1 = new pn.Matrix([
    [10,20],
    [30,40],
    [50,60]
])

const m2 = new pn.Matrix([
    [10,20,30],
    [40,50,60]
])

const m3 = m1.dot(m2); // Returns a New Matrix
```

#### `Matrix Divide`
``` javascript
const m1 = new pn.Matrix([
    [1,2],
    [10,20]
]);

const m2 = new pn.Matrix([ 2 , 20 ]);

const m3 = m1.divide(m2); // Returns a New Matrix
```

#### `Matrix Modify`
``` javascript
const m1 = new pn.Matrix([
    [10,20],
    [30,40],
    [50,60]
]);

m1.at(1,1,100); // It will change 10 -> 100
```

#### `Matrix Map`
``` javascript
const m1 = new pn.Matrix([
    [10,20],
    [30,40],
    [50,60]
]);

const m2 = m1.map(e => e ** 2); // It will return a new Matrix
```

#### `Matrix Transpose`
``` javascript
const m1 = new pn.Matrix([
    [10,20],
    [30,40],
    [50,60]
]);

const m2 = m1.transpose(); // Returns a New Matrix
```

#### `Matrix Clone`
``` javascript
const m1 = new pn.Matrix([
    [1,2],
    [10,20]
]);

const m2 = m1.clone(); // Returns a New Matrix
```

#### `Matrix Randomize`
``` javascript
const m1 = new pn.Matrix([
    [10,20],
    [30,40],
    [50,60]
]);

m1.randomize(0,10); // Will choose a random value from 0 to 10 for all the elements of the Matrix
m1.randomize(); // By Default range is from -1 to 1
```

#### `Matrix Flatten`
``` javascript
const m1 = new pn.Matrix([
    [10,20],
    [30,40],
    [50,60]
]);

let am1 = m1.flatten(); // It will flatten the Matrix to [10,20,30,40,...] and return the Array
```

#### `Matrix FlatMap`
``` javascript
const m1 = new pn.Matrix([
    [10,20],
    [30,40],
    [50,60]
]);

let am1 = m1.flatMap( e => e * 2 ); 
// It will flatten [10,20,30,40,...] and then apply the operation to each element [20,40,60,80,...] and return the Array
```

#### `Row Vector`
``` javascript
const m1 = pn.Vector([ 10, 20, 30 ]);
```

#### `Column Vector`
``` javascript
const m1 = pn.ColVector([ 10, 20, 30 ]);
```
###### `Vector` is internally a Matrix and supports all the operation which are supported on Matrix
