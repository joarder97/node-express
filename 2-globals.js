//global variables - anywhere in application we can access the variable

// __dirname  - a global variable that contains the path to the directory
// __filename - a global variable that contains the path and filename of the file
// require    - function to use modules
// module     - info about the module
// process    - info about the environment where the application is executed

console.log(__dirname);
console.log(__filename);

setInterval(() => {
    console.log("Hello World");
},1000)

console.log(process);