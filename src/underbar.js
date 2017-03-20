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


  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  _.every = function(collection, iterator) {
    return _.reduce(collection, function(allPass, item) {
      if (!allPass) {
        return false;
      }
      return iterator === undefined ? _.identity(item) : Boolean(iterator(item));
    }, true);
  };


  _.some = function(collection, iterator) {
    return _.reduce(collection, function(onePass, item) {
      if (onePass) {
        return true;
      }
      return iterator === undefined ? _.identity(item) : Boolean(iterator(item));
    }, false);
  };


  _.extend = function(object) {
    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, prop) {
        object[prop] = value;
      });
    }
    return object;
  };


  _.defaults = function(object) {
    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, prop) {
        object[prop] === undefined ? object[prop] = value : null;
      });
    }
    return object;
  };


  _.once = function(func) {
    var alreadyCalled = false;
    var result;
    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };


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


  _.delay = function(func, wait) {
    setTimeout(arguments[0], arguments[1], arguments[2], arguments[3]);
  };


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
    if (iterator === 'length') {
      collection.sort( function(a, b) { return a.length - b.length; } );
    } else if (typeof collection[0] === 'object' && !Array.isArray(collection[0])) {
      collection.sort(iterator);
    } else {
      collection.sort( function(a, b) { return a - b; } );
    }
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var output = [];
    var args = Array.from(arguments);
    var longest = args[0].length;
    _.each(args, function(array) {
      for (var i = 0; i < longest; i++) {
        output[i] = output[i] || [];
        output[i].push(array[i]);
        output[i].length === longest;
      }
    });
    return output;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = [];
    var addToResult = function(array) {
      _.each(array, function(element) {
        if (Array.isArray(element)) {
          addToResult(element);
        } else {
          result.push(element)
        }
      });
    }
    addToResult(nestedArray);
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result = [];
    var potentialSharedItems = Array.from(arguments[0])
    var args = Array.from(arguments);
    function addSharedToResult() {
      _.each(potentialSharedItems, function(element) {
        var counter = 0;
        _.each(args, function (subArray) {
          if (_.contains(subArray, element)) {
            counter++;
          }
          if (counter === args.length) {
            result.push(element);
          }
        });
      });
    };
    addSharedToResult();
    return result;
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
