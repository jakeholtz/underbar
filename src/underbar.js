(function() {
  'use strict';

  window._ = {};

  _.identity = function(val) {
    return val;
  };


  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };


  _.last = function(array, n) {
    var len = array.length
    if (n === 0) {
      return [];
    } else if (n === undefined) {
      return array[len - 1];
    } else if (n > len) {
      return array;
    } else {
      return array.slice(len - n, len);
    }
  };


  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
  };


  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };


  _.filter = function(collection, test) {
    let output = [];
    _.each(collection, function(element) {
      if (test(element)) {
        output.push(element);
      }
    });
    return output;
  };


  _.reject = function(collection, test) {
    let output = [];
    for (var i = 0; i < collection.length; i++) {
      !test(collection[i]) ? output.push(collection[i]) : null;
    }
    return output;
  };


  _.uniq = function(array) {
    var mySet = new Set();
    _.each(array, function(item) {
      mySet.add(item);
    });
    return Array.from(mySet);
  };


  _.map = function(collection, iterator) {
    var mappedArray = [];
    _.each(collection, function(element) {
      mappedArray.push(iterator(element));
    });
    return mappedArray;
  };


  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };


  _.reduce = function(collection, iterator, accumulator) {
    var i = 0;
    if (accumulator === undefined) {
      accumulator = collection[0];
      i = 1;
    }
    if (Array.isArray(collection)) {
      for (var i; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      for (var prop in collection) {
        accumulator = iterator(accumulator, collection[prop]);
      }
    }
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    return _.reduce(collection, function(allPass, item) {
      if (!allPass) {
        return false;
      }
      return iterator === undefined ? _.identity(item) : Boolean(iterator(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    return _.reduce(collection, function(onePass, item) {
      if (onePass) {
        return true;
      }
      return iterator === undefined ? _.identity(item) : Boolean(iterator(item));
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(object) {
    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, prop) {
        object[prop] = value;
      });
    }
    return object;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(object) {
    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, prop) {
        object[prop] === undefined ? object[prop] = value : null;
      });
    }
    return object;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.


_.memoize = function(func) {
   var result;
   var cached;
   if (cached === undefined) {
     cached = {};
   }
   return function() {
     var args = JSON.stringify(arguments);
     if (cached[args] === undefined) {
       result = func.apply(this, arguments);
       cached[args] = result;
     }
     return result;
   };
 };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    setTimeout(arguments[0], arguments[1], arguments[2], arguments[3]);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var output = array.slice(0);
    output.unshift(output.pop());
    return output;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
