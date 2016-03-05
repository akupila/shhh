module.exports = (function() {
  var patched = false;
  var original = {};

  return {
    enable: function() {
      if (patched) {
        return false;
      }

      function noop() {}

      for (var key in console) {
        original[key] = console[key];
        console[key] = noop;
      }

      patched = true;

      return true;
    },

    disable: function() {
      if (!patched) return;

      for (var key in original) {
        console[key] = original[key];
      }

      patched = false;
    }
  };
})();