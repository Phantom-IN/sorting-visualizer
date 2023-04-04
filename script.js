const inpt = document.getElementById("size");
const btn = document.getElementById("btn");
inpt.addEventListener("input", function () {
  if (inpt.value.trim() !== "") {
    btn.removeAttribute("disabled");
  } else {
    btn.setAttribute("disabled", "");
  }
});

let arr = []

function init() {
  var parent = document.getElementById('container')
  parent.innerHTML = "";
  var num = 0;
  num = document.getElementById('size').value;
  if (num <= 0 || num > 100) {
    alert("Enter the number in range 1-99.")
    return;
  }
  else {
    arr = [];
    for (let i = 0; i < num; i++) {
      arr[i] = Math.floor(Math.random() * (arr.length - 1 + 1) + 1);;
    }
    var lable = document.getElementById('text');
    lable.innerHTML = '';
    lable.innerHTML += "The generated array is: " + arr;
    generateBar();
    document.getElementById("bs").removeAttribute('hidden');
    document.getElementById("qs").removeAttribute('hidden');
    document.getElementById("hs").removeAttribute('hidden');
  }
}

function generateBar(indices) {
  container.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement('div');
    bar.style.height = arr[i] * 10 + "px";
    bar.classList.add('bar')

    if (indices && indices.includes(i)) {
      bar.style.backgroundColor = "red";
    }
    container.appendChild(bar);
  }
}

function animate(swaps) {
  if (swaps.length == 0) {
    generateBar();
    return;
  }
  const [i, j] = swaps.shift();
  [arr[i], arr[j]] = [arr[j], arr[i]];
  generateBar([i, j]);
  setTimeout(function () {
    animate(swaps);
  }, 100);
}

function bubbleSort(copy) {
  const swaps = [];
  const arr2 = copy;
  do {
    var swapped = false;
    for (let i = 1; i < arr2.length; i++) {
      if (arr2[i - 1] > arr2[i]) {
        swapped = true;
        swaps.push([i - 1, i]);
        [arr2[i - 1], arr2[i]] = [arr2[i], arr2[i - 1]];
      }
    }
  } while (swapped)
  var lable = document.getElementById('text');
  lable.innerHTML = '';
  lable.innerHTML += "The sorted array is: " + arr2;
  return swaps;
}

function quickSort(copy) {
  const arr3 = copy;
  const swaps = [];
  var len = arr3.length;
  if (len < 2) {
    return arr3;
  }
  var stack = [[0, len - 1]];
  while (stack.length) {
    var [lo, hi] = stack.pop();
    var i = lo;
    var j = hi;
    var pivot = arr3[Math.floor((lo + hi) / 2)];
    while (i <= j) {
      while (arr3[i] < pivot) {
        i++;
      }
      while (arr3[j] > pivot) {
        j--;
      }
      if (i <= j) {
        swaps.push([i, j]);
        [arr3[i], arr3[j]] = [arr3[j], arr3[i]];
        i++;
        j--;
      }
    }
    if (lo < j) {
      stack.push([lo, j]);
    }
    if (i < hi) {
      stack.push([i, hi]);
    }
  }
  var lable = document.getElementById('text');
  lable.innerHTML = '';
  lable.innerHTML += "The sorted array is: " + arr3;
  return swaps;
}

function heapSort(arr) {
  const n = arr.length;
  const swaps = [];

  // Heapify the array
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, swaps);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i >= 0; i--) {
    // Move the root (maximum) element to the end of the array
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps.push([0, i]);

    // Heapify the remaining elements
    heapify(arr, i, 0, swaps);
  }

  return swaps;
}

function heapify(arr, n, i, swaps) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Find the largest element among i, left and right
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    // Swap the elements at i and largest
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    swaps.push([i, largest]);

    // Recursively heapify the affected subtree
    heapify(arr, n, largest, swaps);
  }
}

function hs() {
  const copy = [...arr];
  const swap = heapSort(copy);
  animate(swap);
}

function bs() {
  const copy = [...arr];
  const swap = bubbleSort(copy);
  animate(swap);
}

function qs() {
  const copy = [...arr];
  const swap = quickSort(copy);
  // console.log(swap);
  animate(swap);
}

