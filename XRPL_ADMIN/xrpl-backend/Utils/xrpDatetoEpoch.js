const currentTime = Date.now();
const epochr = 946684800 + 724074402; // Your epoch timestamp

const elapsedTime = currentTime - epochr;
const elapsedHours = elapsedTime / (60 * 60 * 1000);

console.log(elapsedTime);
console.log(epochr);

if (elapsedHours >= 24) {
  // 24 hours or more have passed
  console.log("24 hours or more have passed since the epoch timestamp");
} else {
  // Less than 24 hours have passed
  console.log("Less than 24 hours have passed since the epoch timestamp");
}
