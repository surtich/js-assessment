if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function() {
  return {
    listFiles: function(data, dirName) {
      function listFiles(data, dirName, files, isSubdir) {
        files = files || [];
        if (data.files) {
          data.files.forEach(function(file) {
            if (typeof file === "string") {
              if (isSubdir || !dirName || data.dir === dirName) {
                files.push(file);
              }
            } else {
              listFiles(file, dirName, files, data.dir === dirName);
            }
          });
        }
        return files;
      }

      return listFiles(data, dirName, []);
    },
    permute: function(arr) {
      function permute(arr, pre, results) {
        if (arr.length < 2) {
          results.push(pre.concat(arr));          
        } else {
          for (var i = 0; i < arr.length; i++) {
            var clone = arr.slice(0);
            var item = clone.splice(i, 1);
            permute(clone, pre.concat(item), results);
          }
        }
        return results;

      }
      return permute(arr, [], []);
    }
  };
});
