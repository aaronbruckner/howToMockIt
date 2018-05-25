'use strict';

/**
 * Mocking out instances of classes that are created at require is the hardest kind of dependency to mock. It's
 * important to understand how modules are loaded/reset and what variables remain between each test.
 */

describe('mocking class instances that were created at require', () => {

  /**
   * This option wipes the slate clean between every test. The modules are reloaded every time (which allows static code
   * to at the module level to execute again). Order of mocking and module loading is extremely important or your mock
   * instances will not be properly injected into the module under test.
   */
  describe('Option A - Reset modules between every test', () => {
    let mockClassDependency;
    let moduleUnderTest;
    let ClassDependency;

    beforeEach(() => {
      // Clear the module cache between every test. When modules are required, all static code at the module will execute again.
      jest.resetModules();

      // Declare that this Class Dependency will be mocked.
      jest.mock('../src/dependencies/ClassDependency');
      ClassDependency = require('../src/dependencies/ClassDependency');
      // Create mock instance of class
      mockClassDependency = {
        alwaysReturnOne: jest.fn()
      };
      // Force the class constructor to return your mock instance.
      ClassDependency.mockImplementation(() => mockClassDependency);

      moduleUnderTest = require('../src/moduleWithDependenciesCreatedAtRequire');
    });

    test('assert that instance was created and created with correct params', () => {
      moduleUnderTest.useClassDependencyCreatedAtRequire();

      expect(ClassDependency).toHaveBeenCalledTimes(1);
      expect(ClassDependency).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('assert that a class dependency was invoked', () => {
      moduleUnderTest.useClassDependencyCreatedAtRequire();

      // At this point we are running expects against the mock class instance we created that is returned when the
      // mocked ClassDependency constructor is ran.
      expect(mockClassDependency.alwaysReturnOne).toHaveBeenCalledTimes(1);
    });

    test('assert that class dependency return behavior can be changed', () => {
      mockClassDependency.alwaysReturnOne.mockReturnValue(2);

      expect(moduleUnderTest.useClassDependencyCreatedAtRequire()).toEqual(2);
    });

    test('assert that class dependency return behavior can be changed again', () => {
      mockClassDependency.alwaysReturnOne.mockReturnValue(42);

      expect(moduleUnderTest.useClassDependencyCreatedAtRequire()).toEqual(42);
    });
  });

  /**
   * This this option, you load the modules a single time and continually clear your mock instance between tests.
   * If you are using import/es6 modules, this option might be your only way of importing classes and mocking them
   * (as imports cannot be done anywhere within the file like require).
   */
  describe('Option B - Inject dependency instances once and do not reload modules', () => {

    // This code can be done at the top of your test spec and doesn't need to be nested in a describe block.
    const mockClassDependency = {
      alwaysReturnOne: jest.fn()
    };
    jest.mock('../src/dependencies/ClassDependency', function () {
      return jest.fn().mockImplementation(() => mockClassDependency);
    });
    const ClassDependency = require('../src/dependencies/ClassDependency');
    const moduleUnderTest = require('../src/moduleWithDependenciesCreatedAtRequire');

    beforeEach(() => {
      // Clear instance mock usages between ever test but not the mock ClassDependency constructor itself.
      mockClassDependency.alwaysReturnOne.mockClear();
    });

    test('assert that instance was created and created with correct params', () => {
      moduleUnderTest.useClassDependencyCreatedAtRequire();

      expect(ClassDependency).toHaveBeenCalledTimes(1);
      expect(ClassDependency).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('assert that the class constructor mock isn\'t cleared between tests', () => {
      moduleUnderTest.useClassDependencyCreatedAtRequire();

      expect(ClassDependency).toHaveBeenCalledTimes(1);
      expect(ClassDependency).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('assert that a class dependency was invoked', () => {
      moduleUnderTest.useClassDependencyCreatedAtRequire();

      // At this point we are running expects against the mock class instance we created that is returned when the
      // mocked ClassDependency constructor is ran.
      expect(mockClassDependency.alwaysReturnOne).toHaveBeenCalledTimes(1);
    });

    test('assert that class dependency return behavior can be changed', () => {
      mockClassDependency.alwaysReturnOne.mockReturnValue(2);

      expect(moduleUnderTest.useClassDependencyCreatedAtRequire()).toEqual(2);
    });

    test('assert that class dependency return behavior can be changed again', () => {
      mockClassDependency.alwaysReturnOne.mockReturnValue(42);

      expect(moduleUnderTest.useClassDependencyCreatedAtRequire()).toEqual(42);
    });
  });
});