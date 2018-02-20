# patNum.js
### A Mathematics/Statistics Library in Javascript

### Example Usage
>patNum.js provides Statistics and Matrix Operations

## Statistics

### `Min (Lowest Observation)`
``` javascript
pn.Min( [ 13, 22, 26, 38, 36, 42 ] ) // Returns - 13
```

### `Max (Highest Observation)`
``` javascript
pn.Max( [ 49, 50, 77, 81, 98, 110 ] ) // Returns - 110
```

### `Range (Span of Data)`
``` javascript
// Range = Max - Min
pn.Range( [ 49, 50, 77, 81, 98, 110 ] ) // Returns - 61
```

### `AFrequency (Frequency of A Specific Number)`
``` javascript
pn.AFrequency( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] , 2 ) // Returns - { Value: 2 , Occurance: 2 }
```

### `SomeFrequencies (Frequency of some Numbers)`
``` javascript
pn.SomeFrequencies( [ 11, 2, 45, 5, 3, 2, 4, 11, 4, 3, 5 ] , [ 4, 2 ] ) // Returns - { Value: 2 , Occurance: 2 }
```
