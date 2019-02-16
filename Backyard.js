// var lr = require("./Regression");
// var LinearRegression = lr.LinearRegression;
// var LinearGradientDescent = lr.LinearGradientDescent;
// var predict = lr.predict;
// var LinearModel = lr.LinearModel;

// // Linear Regression using Functions
// let  myline = LinearRegression([ [5,10] , [10,20] , [20,40] ]);

// console.log(myline);
// console.log(predict(myline,30));
// console.log(predict(myline,40));
// console.log(predict(myline,80));


// // Linear Model as Object
// let ml1 = new LinearModel([ [5,10] , [10,20] , [20,40] ]);

// ml1.train();

// console.log(ml1.predict(30));
// console.log(ml1.predict(40));
// console.log(ml1.predict(80));

// ml1.add([100,200]);

// ml1.train();

// console.log(ml1.predict(30));
// console.log(ml1.predict(40));
// console.log(ml1.predict(80));


// // Linear Regression with Stohcastic Gradient Descent using Functions
// let  myline2 = LinearGradientDescent( [ [5,10] , [10,20] , [20,40] ] , 0.01);

// console.log(myline2);
// console.log(predict(myline2,30));
// console.log(predict(myline2,40));
// console.log(predict(myline2,80));

            // if(this.a && this.b && n.a && n.b)
            // {
            // ...
            // }
            // else if(this.b && n.a && n.b)
            // {
            //     temp.a = ((n.b * this.b) * -1);
            //     temp.b = n.a * this.b;
            // }
            // else if(this.a && this.b && n.b)
            // {
            //     temp.a = ((this.b * n.b) * -1);
            //     temp.b = this.a * n.b;
            // }
            // else if(this.b && n.b)
            // {
            //     temp.a = ((this.b * n.b) * - 1);
            // }