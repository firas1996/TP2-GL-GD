let a = 5;
let b = "abc";
let c = [1, 2, 3];
let d = {
  abc: "aaa",
};
let e = { ...d };
e.abc = "azerty";

console.log(d);
