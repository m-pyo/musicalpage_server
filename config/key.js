if(process.env.NODE_ENV === 'procduction'){
    module.exports = require('./prod');
} else{
    module.exports = require('./dev');
}