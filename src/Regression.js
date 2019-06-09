var Mean = require("./Stats").mean;

function Separate(data)
{
    let x_points = [];
    let y_points = [];
    for(let [x,y] of data)
    {
        x_points.push(x);
        y_points.push(y);
    }
    return [x_points,y_points];
}

function M(x,y)
{
    let num = 0;
    let den = 0;
    let xmean = Mean(x);
    let ymean = Mean(y);    
    for(let i in x)
    {
        num += (x[i] - xmean) * (y[i] - ymean);
        den += (x[i] - xmean) ** 2;
    }
    let slope = num / den;
    return slope;
}

function B(xmean,ymean,m)
{  
    return ymean - m * xmean;
}

function Y(m,b,x)
{
    return m * x + b;
}

function predict(line,x)
{
    return Y(line.m,line.b,x);
}

function LinearRegression(points)
{
    let [x,y] = Separate(points);
    let m = M(x,y);
    let b = B(Mean(x),Mean(y),m);
    return  {
                m: m,
                b: b
            };
}

function LinearGradientDescent(points,learning_rate)
{
    let [x,y] = Separate(points);
    let m = 1;
    let b = 0;
    for(let i in x)
    {
        let xi = x[i];
        let yi = y[i];

        // Guessing the Value
        let guess = m * xi + b;

        // Calculating the error
        let error = yi - guess;

        m += (error * xi) * learning_rate;
        b += (error) * learning_rate;
    }
    return  {
                m: m,
                b: b
            };
}

class LinearModel
{
    constructor(points)
    {
        [this.x,this.y] = Separate(points);
        this.xmean = Mean(this.x);
        this.ymean = Mean(this.y);
        this.m = 1;
        this.b = 0;
    }

    add(point)
    {
        this.x.push(point[0]);
        this.y.push(point[1]);
    }

    predict(x)
    {
        return this.m * x + this.b;
    }

    train()
    {
        this.m = this.train_mean();
        this.b = this.train_intercept();
    }

    train_mean()
    {
        let num = 0;
        let den = 0; 
        for(let i in this.x)
        {
            num += (this.x[i] - this.xmean) * (this.y[i] - this.ymean);
            den += (this.x[i] - this.xmean) ** 2;
        }
        return num / den;
    }

    train_intercept()
    {
        return this.ymean - this.m * this.xmean;
    }
}


// Exports ---------------------------------------------------------------------

// Line Operations

// Spliting Array of Points in X points and Y points
module.exports.separate = Separate;

// Calculating Slope using 2 Arrays of X Points and Y Points
module.exports.M = M;

// Calculating Intercept using X Mean , Y Mean and Slope
module.exports.B = B;

// Calculating Y using Y = MX + B
module.exports.Y = Y;

// Linear Regression Operations

// Predicting Values using predict  
module.exports.predictLinear = predict;

// Linear Regression using Array of Points it will return Model Object can predict values using predict function
module.exports.linearRegression = LinearRegression;

// Linear Regression with Gradient Descent using Array of Points it will return Model Object can predict values using predict function
module.exports.linearGradientDescent = LinearGradientDescent;

// Complete Model
module.exports.LinearModel = LinearModel;