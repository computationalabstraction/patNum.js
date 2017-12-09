var stats = require("./Stats");
var FunctionRecord = require("./DataUnit").FunctionRecord;
var FunctionTable = require("./Function").FunctionTable;
var print = require('./Print');

data = [11,2,45,5,3,2,4,11,4,3,5];

// Min
print("Min");
print(stats.min(data));

// Max
print("Max");
print(stats.max(data));

// Range
print("Range");
print(stats.Range(data))

// Frequency for A Number
print("A Frequency");
print(stats.AFrequency(data,2));
print(stats.AFrequency(data,4));
print(stats.AFrequency(data,45));
print(stats.AFrequency(data,11));

// Frequency for Some Number
print("Some Frequencies");
print(stats.SomeFrequencies(data,[4,2]));

// Frequency for All Number
print("All Frequencies");
print(stats.AllFrequencies(data));

// Mean
print("Mean");
print(stats.Mean(data));

// Medain
print("Medain");
print(stats.Median(data));

// Mode
print("Mode");
print(stats.Mode(data));

// Sample Standard Deviation
print("Sample Standard Deviation")
print(stats.SampleStandardDeviation(data))

// Population Standard Deviation
print("Population Standard Deviation")
print(stats.PopulationStandardDeviation(data))

// Mean Absolute Deviation
print("Mean Absolute Deviation")
print(stats.MeanAbsoluteDeviation(data))

// Median Absolute Deviation
print("Median Absolute Deviation")
print(stats.MedianAbsoluteDeviation(data))

//Function Table
f1 = new FunctionTable(
    new FunctionRecord(1,10),
    new FunctionRecord(2,20),
    new FunctionRecord(3,30)
);

print(f1.of(2));

f1.table.forEach(element => {
    print(element);
});

f1.inverse().table.forEach(element => {
    print(element);
});