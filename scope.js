const message ='hello'
console.log(message); //hello

/******************start scope ****************************/
//scope provides some level of security to code
//scope is an encapsulation mechanism for code blocks, functions and modules

if(true){
    const message = 'hello';//The scope manages variables accessibility
          // the accessibility of variables is limited by the scope where they're created 
          // you're free to access the variable defined within its scope 
          // but outside of its scope the variable is inaccessible

}
console.log(message);// ReferenceError : message is not defined

/******************end scope ****************************/


/******************start block scope ****************************/
//code block defines scope for variables using let, const
if(true){
    //if block scope
    const message = 'Hello';
    console.log(message);
}
console.log(message);//throws ReferenceError
//for, while loop also creates a scope
for(const color of ['green','red','blue']){
    //for block scope
    const message = 'Hi'
    console.log(color);
    console.log(message);
}
while(true){
    //while block scope
    const message = 'Hi';
    console.log(message);

}
//standalone code block
{
    //block scope
    const message = 'Hi';
    console.log(message);
}
console.log(color);// throws ReferenceError
console.log(message);// throws ReferenceError
//var is not block scoped, code block doesn't create a scope for var variables,
//but a function body does create a block scope for var
if(true){
    //if block scope
    var count=0;
    console.log(count);//0
}
console.log(count)//0
/******************end block scope ****************************/


/******************start function scope ****************************/

function run(){
    //run function scope
    var message = "Run, Forrest, Run";
    console.log(message)
}

run();
console.log(message); // throws referenceError
//also creates a scope for let, const and inner functions declarations

function run(){
    const two =2;
    let count = 0;
    function run2(){}
    console.log(two);
    console.log(count)
    console.log(run2) // function
}
run();
console.log(two)// throws referenceError
console.log(count)// throws referenceError
console.log(run2) // throws referenceError
/******************end function scope ****************************/


/******************start module scope ****************************/
//modules also creates a scope for variables, functions, classes 
//the module circle defines a constant pi 
const pi = 3.14159;
console.log(pi);

//pi is not exported so we can't access it outside of its module scope
import './circle'
console.log(pi) //throws reference error
/******************end module scope ****************************/



/******************start nesting scope ****************************/

function run(){
    //run function scope
    //outer scope
    const message = "Run, Forrest, Run!";

    if(true){
        //if code block scope, scope of run is nested here
        //inner scope
        const friend = 'Bubba'
        console.log(message);//"Run, Forrest, Run!"
    }
    console.log(friend)// throws ReferenceError
}
run();
/******************end nesting scope ****************************/


/******************start global scope ****************************/

//it's the outermost scope it's accessible from any inner scope
//in a browser environment the topmost scope of js file loaded using script tag is a global scope
<script src="myScript.js"></script>

let counter = 1; //global variable
//window, document are global variables
// you can access process object as a global variable

(function () {
    // private scope
  })();//The parenthesis at the end of the function,
  // tells the interpreter to execute it as soon as it reads it without invocation.


  //Module pattern 
  var Module = (function() {
    function privateMethod() {
        // do something
    }

    return {
        publicMethod: function() {
            // can call privateMethod();
        }
    };
})();
Module.publicMethod(); // works
Module.privateMethod(); // Uncaught ReferenceError: privateMethod is not defined

(function(window) {
    // do anything
})(this);
//Immediately-Invoked Function Expression (IIFE)
/******************end global scope ****************************/


/******************start lexical scope ****************************/
//lets have 2 functions inner inside outer function
//lexical scoping : the inner function scope can access variables from the outer function scope
//the lexical scope consists of outer scopes determined statically
//in this example the lexical scope of innerFunc() consists of the scope of outerFunc()
//moreover innerFunc() is a closure bec it captures the variable outerVar from the lexical scope
//This means that the child functions are lexically bound to the execution context of their parents.
//Lexical scope is sometimes also referred to as Static Scope.
function outerFunc(){
    // the outer scope
    let outerVar = 'I am from the outside';

    function innerFunc(){
        //the inner scope
        console.log(outerVar);//I am from the outside
    }
    return innerFunc;
}

const inner = outerFun();//to call inner function immediately outerFun()();
inner();//invocation of inner happens outside of outerfunc 
/******************end lexical scope ****************************/


/******************start Variable isolation ****************************/
//scope isolates the variables
// different scopes can have variables with the same name
function foo() {
    let count = 0;
    console.log(count); //0
}
function bar() {
    let count = 0;
    console.log(count); //1
}
foo();
bar();

/******************end variable isolation scope ****************************/


/***** var scoped by functions and modules
 * let ,const scoped by codeblocks , functions, modules
 * scopes can be nested
 * lexical scope consists of outer sunction scope determined statically 
 * Any function, no matter the place where being executed, 
 * can access the variables of its lexical scope (this is the concept of closure).
 */