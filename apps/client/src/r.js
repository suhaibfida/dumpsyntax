const run = send();
function hello() {
  console.log("cd");
}
function send(fn, delay) {
  let bool = true;
  return function (...args) {
    if (!bool) return;
    bool = false;
    setTimeout(() => {
      fn(...args);
      console.log("hello");
    }, delay);
  };
}
