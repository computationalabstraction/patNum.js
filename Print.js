var beautify = require('prettyjson');

function print(data){
  console.log(beautify.render(data));
}

module.exports = print;
