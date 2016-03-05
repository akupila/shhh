var shhh = require('../index');
var sinon = require('sinon');

describe('shhh', function() {
  var methods = ['log', 'info', 'warn', 'error', 'dir', 'time', 'timeEnd', 'trace', 'assert'];

  methods.forEach(function(method) {
    it('should silence ' + method, function() {
      var spy = sinon.spy(console, method);

      shhh.enable();
      console[method]('hello');
      shhh.disable();

      sinon.assert.notCalled(spy);
      console[method].restore();
    });
  });

  it('should re-enable console', function() {
    var spy = sinon.spy(console, 'log');

    shhh.enable();
    console.log('Hidden 1');
    console.log('Hidden 2');
    console.log('Hidden 3');
    shhh.disable();
    console.log('This will show up in console'); // Visible

    sinon.assert.calledOnce(spy);
    console.log.restore();
  });

  it('should not re-patch', function() {
    var spy = sinon.spy(console, 'log');

    shhh.enable();
    shhh.enable();
    shhh.enable();
    console.log('Hidden 1');
    console.log('Hidden 2');
    console.log('Hidden 3');
    shhh.disable();
    shhh.disable();
    shhh.disable();
    console.log('This will show up in console'); // Visible

    sinon.assert.calledOnce(spy);
    console.log.restore();
  })
});