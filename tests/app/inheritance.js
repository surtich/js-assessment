/*jshint expr:true */
/*globals describe:true, it:true, expect:true, beforeEach:true, console:true */
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
if (typeof expect !== 'function') {
  var expect = require('expect.js');
}

define([
  'app/inheritance'
  ], function(answers) {
    describe('inheritance', function () {
    
      it('should extend an object from other whith prototype inheritence', function () {
        var a = Math.random(), b = Math.random(), B = Math.random(), x = Math.random(), y = Math.random(),
        child = {
          b: b,
          x: x,
          z: {
            a: a,
            b: b
          }
        },
        parent = {
          a: a,
          b: B,
          x: {
            a: a
          },
          y: {
            b: b
          }
        },
        c = child,
        p = parent;
        answers.deepExtend(c, p);
        expect(parent === p).to.eql(true);
        expect(child === c).to.eql(true);      
        expect(p.a).to.eql(a);
        expect(c.a).to.eql(a);
        expect(c.b).to.eql(B);
        expect(typeof c.z).to.eql('object');
        expect(c.z.a).to.eql(a);
        expect(c.x).to.eql(p.x);
        expect(c.x.a).to.eql(a);
        expect(c.x === p.x).to.eql(false);
        expect(c.y).to.eql(p.y);
        expect(c.y === p.y).to.eql(false);
  
      });
    
      it('should extend a class from other whith classical inheritence', function () {
        var a = Math.random(), b = Math.random(), B = Math.random(), x = Math.random(), y = Math.random();
      
        function Parent(a, b) {
          this.a = a;
          this.b = b;
        }
      
        Parent.prototype.getA = function() {
          return this.a;
        };
      
        Parent.prototype.getB = function() {
          return this.b;
        };
        
        Parent.prototype.getY = function() {
          return y;
        };
      
        function Child(a, b, x) {
          Parent.prototype.constructor.apply(this, [a, b]);
          this.x = x;
        }
      
        answers.inherits(Child, Parent);
      
        Child.prototype.getX = function() {
          return this.x;
        };
      
        var child = new Child(a, b, x),
            child2 = new Child(b, a, x);
      
        expect(child instanceof Object).to.eql(true); //Trivial
        expect(child instanceof Child).to.eql(true);
        expect(child instanceof Parent).to.eql(true);
        expect(child.constructor === Child).to.eql(true);
        expect(Object.getPrototypeOf(child) === Child.prototype).to.eql(true);
        expect(Child.prototype.constructor === Child).to.eql(true);
      
        expect(child.x).to.eql(x);
        expect(child.a).to.eql(a);
        expect(child.getA()).to.eql(a);
        expect(child.x).to.eql(x);
        expect(child.getX()).to.eql(x);
        expect(child.__super__ !== undefined).to.eql(true);
        
        expect(child2.a).to.eql(b);
        expect(child.getY === child2.getY).to.eql(true);
        expect(child.getY()).to.eql(child2.getY());
      
        Child.prototype.getB = function () {
          return this.__super__.getB.call(this) + B;
        };
        
        expect(child.getB()).to.eql(b + B);
        
        expect(child.__super__.getB.call(child)).to.eql(b);
      
      });
    
    });
  });
