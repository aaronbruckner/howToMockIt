'use strict';

/**
 * Mocking out instances of classes that are created at require is the hardest kind of dependency to mock. It's
 * important to understand how modules are loaded/reset and what variables remain between each test.
 *
 * When using ES6 imports, you only have one option which is to declare all your mocks at the top level scope before
 * importing your test module.
 *
 * With this option, you load the modules a single time and continually clear your mock instance between tests.
 */
const mockClassDependency = {
  alwaysReturnOne: jest.fn()
};
jest.mock('../src/dependencies/ClassDependency', function () {
  return jest.fn().mockImplementation(() => mockClassDependency);
});
import ClassDependency from '../src/dependencies/ClassDependency';
const moduleUnderTest = require('../src/moduleWithDependenciesCreatedAtRequire');

describe('mocking class instances that were created at require', () => {
  describe('Only Option - Inject dependency instances once and do not reload modules', () => {
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