/********************start context****************/
//context is used to refer to the value of this
//scope refers to the visibility of variables and context refers to the value of this in the same scope
// we can chnage the context using function methods 
// in the global scope context is always the window object

console.log(this);
//// logs: Window {speechSynthesis: SpeechSynthesis, caches: CacheStorage, localStorage: Storage…}

function logFunction(){
    console.log(this)
}
logFunction(); 
// because logFunction() is not a property of an object
//if scope is in the method of an object, context will be the object the method is part of
class User{
    logName(){
        console.log(this)
    }
}
(new User).logName();//short way of sorting object in a variable


function logFunction() { 
    console.log(this);
}
new logFunction(); //logs logFunction {}

//when a function is called in strict mode the context will default to undefined
//Execution Context
executionContextObject = {
    'scopeChain': {}, // contains its own variableObject and other variableObject of the parent execution contexts
    'variableObject': {}, // contains function arguments, inner variable and function declarations
    'this': valueOfThis
}
//Changing Context with .call(), .apply() and .bind()
function hello() {
    // do something...
}

hello(); // the way you usually call it
hello.call(context); // here you can pass the context(value of this) as the first argument
hello.apply(context); // here you can pass the context(value of this) as the first argument
function introduce(name, interest) {
    console.log('Hi! I\'m '+ name +' and I like '+ interest +'.');
    console.log('The value of this is '+ this +'.')
}

introduce('Hammad', 'Coding'); // the way you usually call it
introduce.call(window, 'Batman', 'to save Gotham'); // pass the arguments one by one after the contextt
introduce.apply('Hi', ['Bruce Wayne', 'businesses']); // pass the arguments in an array after the context

//Bind doesn't itself call the function, it can only be used to bind the value of context and other arguments before calling the function
(function introduce(name, interest) {
    console.log('Hi! I\'m '+ name +' and I like '+ interest +'.');
    console.log('The value of this is '+ this +'.')
}).bind(window, 'Hammad', 'Cosmology')();

// logs:
// Hi! I'm Hammad and I like Cosmology.
// The value of this is [object Window].
//Bind is like the call function, it allows you pass the rest of the arguments one by one separated by a comma and not like apply,
// in which you pass the arguments in an array.
/********************end context****************/