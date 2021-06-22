var x = "global";
function f() {
    var x = "local";
    console.log(x); // local
}
f();
console.log(x); // global
//Inside the function f(), the global x is shadowed by a local x.

