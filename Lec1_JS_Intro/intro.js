// top to down
//left to right 


// java , cpp -> variables

//Datatype VariableName = value;
//int a = 10;

//ES6 -> ecma Script 6
//let -> block scoped variable 
//const -> block scoped variable

let a = 10;
let b = true;
let c = false;
let d = undefined;
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);

//variable is not assigned a value
let e; // takes up undefined
console.log(e);

if(true){
    // let f = "i am inside if block";
    // console.log(f); //o/p = aa jayega
    console.log(a);
    let a = 30;
    a++;
}
console.log(a);
console.log(f); // o/p = f is not defined


//const -> constant 
const pi = 3.14; 
pi = 20; // reassignment is not allowed in const
// console.log(pi);

const pi; //define
pi = 20; // aise bhi assign karna shi ni hota


// == (data type check nhi hota) && === (data type check hota h)
console.log(10 === "10");


//objects -> key value pairs
let movies = {}; // empty object 
let data = {
    name : "avni" , 
    place : "goel"
}

//access object keys
//dot notation
// console.log(data.name);

let key  = "name";
console.log(data.key); // o/p is undefined 
//bracket notation
// console.log(data[key]); // ab o/p aa jayega

data.key = "I am a new Value";
console.log(data);

//keys => unique
//values => duplicate

//arrays

//in java => int arr[] = new int[10];

let values = [
    10 ,
    false , 
    {
    name : "avni" , 
    place : "goel"
    } , 
    "HEY I AM A VALUE", 
    [1, 2 , 3,  4 , 5, 6]
]  ; 
// new array is defined

//acces object keys
//dot notation => literal check
//console.log(values);
//console.log(values[2].place);

//in loop 
//for(let key in data){
    //console.log(key);
//}




