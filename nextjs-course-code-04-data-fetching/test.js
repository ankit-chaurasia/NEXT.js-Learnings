const arr = [1, 2, 3, 4, 5];
// Map
if (typeof Array.prototype.customMap !== 'function') {
  Array.prototype.customMap = function (callback) {
    var arr = this;
    if (typeof callback !== 'function') {
      console.error('Callback should be function');
    }
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(callback(arr[i], i));
    }
    return out;
  };
}
console.log(
  'Map',
  arr.map((item, index) => item * index)
);
console.log(
  'customMap',
  arr.customMap((item, index) => item * index)
);

// Filter
if (typeof Array.prototype.customFilter !== 'function') {
  Array.prototype.customFilter = function (callback) {
    var arr = this;
    if (typeof callback !== 'function') {
      console.error('Callback should be function');
    }
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i], i)) {
        out.push(arr[i]);
      }
    }
    return out;
  };
}
console.log(
  'Filter',
  arr.filter((item, index) => item % 2)
);
console.log(
  'customFilter',
  arr.customFilter((item, index) => item % 2)
);

// Reduce
if (typeof Array.prototype.customReduce !== 'function') {
  Array.prototype.customReduce = function (callback, initialValue) {
    var arr = this;
    if (typeof callback !== 'function') {
      console.error('Callback should be function');
    }
    let acc = null;
    let index = 0;
    if (initialValue) {
      acc = initialValue;
    } else {
      acc = arr[index];
      index++;
    }
    for (let i = index; index < arr.length; index++) {
      acc = callback(acc, arr[index], index, arr);
    }
    return acc;
  };
}
console.log(
  'Reduce',
  arr.reduce((acc, currentValue, index, arr) => {
    acc[currentValue] = `${currentValue}__${index}`;
    return acc;
  }, {})
);
console.log(
  'customReduce',
  arr.customReduce((acc, currentValue, index, arr) => {
    acc[currentValue] = `${currentValue}__${index}`;
    return acc;
  }, {})
);

console.log(
  'Reduce SUM',
  arr.reduce((a, b) => a + b)
);
console.log(
  'customReduce SUM ',
  arr.customReduce((a, b) => a + b)
);

// array flat
const flatMe = [1, 2, [3, 4, [5]]];
if (typeof Array.prototype.customFlat !== 'function') {
  Array.prototype.customFlat = function (level = Infinity) {
    const arr = this;
    const flatten = (arr) => {
      return arr.reduce((acc, curr) => {
        // 1 => [1]
        // 2 => [1, 2]
        // 3 => [1, 2, customFlat([3, 4, [5]])]
        // [1, 2, 3, 4, customFlat([5])]
        // [1, 2, 3, 4, 5]
        return Array.isArray(curr)
          ? acc.concat(flatten(curr))
          : acc.concat(curr);
      }, []);
    };
    return flatten(arr);
  };
}
console.log('Flat', flatMe.flat(Infinity));
console.log('customFlat', flatMe.customFlat(Infinity));

// bind
function bindTest(a, b, c) {
  console.log('Bind Test', this.name, this.age, a, b, c);
}
if (Function.prototype.customBind !== 'function') {
  Function.prototype.customBind = function () {
    const invokingFunction = this;
    const thisval = arguments[0];
    thisval.invokingFunction = invokingFunction;
    const params = Array.prototype.slice.call(arguments, 1);

    return function () {
      const newParams = Array.prototype.slice.call(arguments);
      const fullParams = params.concat(newParams);
      return invokingFunction.apply(thisval, fullParams);
    };
  };
}
const bindMethod = bindTest.bind({ name: 'ankit', age: 30 }, 'firstParam');
bindMethod(10, 20, 30);
const customBindMethod = bindTest.customBind(
  { name: 'ankit', age: 30 },
  'firstParam'
);
customBindMethod(10, 20, 30);

// call
function printName(city, country) {
  console.log(this.firstName, this.lastName, city, country);
}
const obj = {
  firstName: 'Ankit',
  lastName: 'Chaurasia',
};
Function.prototype.myCall = function (thisVal, ...args) {
  thisVal.myFunction = this;
  thisVal.myFunction(...args);
};

console.log('From myCall');
printName.myCall(obj, 'Jhansi', 'India')

// apply
Function.prototype.myApply = function (thisVal, args) {
  thisVal.myFunction = this;
  thisVal.myFunction(...args);
};
console.log('From myApply');
printName.myApply(obj, ['Jhansi', 'India']) // "Ankit", "Chaurasia", "Jhansi", "India"

// json.stringyfy
// redux connect
// React useState patterns


// debounce

// throttling

