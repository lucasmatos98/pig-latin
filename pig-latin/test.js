const b = 11;
const c = Math.floor(b / 2);
// const c = ~~(b / 2);
console.log(c);
// binary search for first element in array that is equal to target
// return index of element or -1 if not found
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
// array with random 10 sorted integers between 0 and 100
const arr = [2, 5, 7, 7, 7, 7, 15, 17, 19, 21];


