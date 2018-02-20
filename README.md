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
