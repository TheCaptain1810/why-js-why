
for (var i = 1; i <= 10; i++) {
    (function iffy(j) {
      setTimeout(() => console.log(j), 1000);
    })(i);
}