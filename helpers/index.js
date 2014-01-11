module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper('obj_val', function(object, property) {
    return object ? object[property] : property;
  });

  Handlebars.registerHelper('json_to_str', function(object) {
    return JSON.stringify(object);
  });

  Handlebars.registerHelper('randomNumber', function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  Handlebars.registerHelper('startsWith', function(str, substr, content) {
    if (str && substr && str.indexOf(substr) === 0) {
      return content.fn(this);
    } else {
      return content.inverse(this);
    }
  });

  Handlebars.registerHelper('get', function(object/* ... */) {
    for (var i = 1; i < arguments.length - 1; i++) {
      if (object.hasOwnProperty(arguments[i])) {
        object = object[arguments[i]];
      } else {
        return 'null';
      }
    }
    if (typeof(object) === 'string') {
      return object;
    } else {
      return JSON.stringify(object);
    }
  });

  Handlebars.registerHelper('selfIncrementCounter', function(counter, index) {
    counter[index] += 1;
    return counter[index];
  });

  Handlebars.registerHelper('isMarkdownFile', function(filename, content) {
    if (filename && /\.md$/i.test(filename)) {
      return content.fn(this);
    } else {
      return content.inverse(this);
    }
  });

  Handlebars.registerHelper('inArray', function(array, value, content) {
    if (typeof(array) === 'string') {
      array = JSON.parse(array);
    }
    if (array.indexOf(value) >= 0) {
      return content.fn(this);
    } else {
      return content.inverse(this);
    }
  });

  Handlebars.registerHelper('eachReverse', function(context) {
    var options = arguments[arguments.length - 1];
    var ret = '';

    if (context && context.length > 0) {
        for (var i = context.length - 1; i >= 0; i--) {
            ret += options.fn(context[i]);
        }
    } else {
        ret = options.inverse(this);
    }

    return ret;
  });

  Handlebars.registerHelper('eachPropertyReverse', function(context, options) {
    var content = (function () {
      var keys = [];
      for (var key in context) {
        keys.unshift(key);
      }
      var results = [];
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = context[key];
        results.push(options.fn({
          key: key,
          value: value
        }));
      }
      return results;
    })();
    return content.join('');
  });
};
