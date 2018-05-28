'use strict';

/**
 * Mocking out instances of classes that are created at require is the hardest kind of dependency to mock. It's
 * important to understand how modules are loaded/reset and what variables remain between each test.
 */
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const assert = require('chai').assert;
const ClassDependency = require('../src/dependencies/ClassDependency');

describe('mocking class instances that were created at require', () => {

  describe('Reload modules and inject stub instances with proxyquire before every test', () => {
    let ClassDependencySpy;
    let mockClassDependency;
    let moduleUnderTest;

    beforeEach(() => {
      // Create mock instance of class that will be used by test module.
      mockClassDependency = {
        alwaysReturnOne: sinon.stub()
      };
      // Provide a spied constructor for the ClassDependency so you can assert how it was used.
      ClassDependencySpy = sinon.spy(function () {
        return mockClassDependency;
      });
      // Before every test, load test module and use proxyquire to inject mocked out constructors.
      moduleUnderTest = proxyquire('../src/moduleWithDependenciesCreatedAtRequire', {
        './dependencies/ClassDependency': ClassDependencySpy
      });
    });

    it('assert that instance was created and created with correct params', () => {
      moduleUnderTest.useClassDependencyCreatedAtRequire();

      assert.isTrue(ClassDependencySpy.calledOnce);
      assert.isTrue(ClassDependencySpy.calledWithExactly('arg1', 'arg2'));
    });

    it('assert that a class dependency was invoked', () => {
      moduleUnderTest.useClassDependencyCreatedAtRequire();

      // At this point we are running expects against the mock class instance we created that is returned when the
      // mocked ClassDependency constructor is ran.
      assert.equal(mockClassDependency.alwaysReturnOne.callCount, 1);
    });

    it('assert that class dependency return behavior can be changed', () => {
      mockClassDependency.alwaysReturnOne.returns(2);

      assert.equal(moduleUnderTest.useClassDependencyCreatedAtRequire(), 2);
    });

    it('assert that class dependency return behavior can be changed again', () => {
      mockClassDependency.alwaysReturnOne.returns(42);

      assert.equal(moduleUnderTest.useClassDependencyCreatedAtRequire(), 42);
    });
  });
});