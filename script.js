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
    document.getElementById("ss").removeAttribute('hidden');
    document.getElementById("is").removeAttribute('hidden');
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

function heapSort(copy) {
  const arr4 = copy;
  const n = arr4.length;
  const swaps = [];
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr4, n, i, swaps);
  }
  for (let i = n - 1; i >= 0; i--) {
    [arr4[0], arr4[i]] = [arr4[i], arr4[0]];
    swaps.push([0, i]);
    heapify(arr4, i, 0, swaps);
  }
  var lable = document.getElementById('text');
  lable.innerHTML = '';
  lable.innerHTML += "The sorted array is: " + arr4;
  return swaps;
}

function heapify(arr4, n, i, swaps) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr4[left] > arr4[largest]) {
    largest = left;
  }
  if (right < n && arr4[right] > arr4[largest]) {
    largest = right;
  }
  if (largest !== i) {
    [arr4[i], arr4[largest]] = [arr4[largest], arr4[i]];
    swaps.push([i, largest]);
    heapify(arr4, n, largest, swaps);
  }
}

function selectionSort(copy) {
  const arr5 = copy;
  const n = arr5.length;
  const swaps = [];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr5[j] < arr5[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr5[i], arr5[minIndex]] = [arr5[minIndex], arr5[i]];
      swaps.push([i, minIndex]);
    }
  }
  var lable = document.getElementById('text');
  lable.innerHTML = '';
  lable.innerHTML += "The sorted array is: " + arr5;
  return swaps;
}

function insertionSort(copy) {
  const arr6 = copy;
  const n = arr6.length;
  const swaps = [];

  for (let i = 1; i < n; i++) {
    let j = i - 1;
    const current = arr6[i];
    while (j >= 0 && arr6[j] > current) {
      arr6[j + 1] = arr6[j];
      swaps.push([j, j + 1]);
      j--;
    }
    arr6[j + 1] = current;
  }

  var lable = document.getElementById('text');
  lable.innerHTML = '';
  lable.innerHTML += "The sorted array is: " + arr6;
  return swaps;
}

function is() {
  const copy = [...arr];
  const swap = selectionSort(copy);
  animate(swap);
}

function ss() {
  const copy = [...arr];
  const swap = selectionSort(copy);
  animate(swap);
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
