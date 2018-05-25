'use strict';

/**
 * This test shows how to mock a class dependency which is created when the test function is invoked and used immediately.
 * Because the class instance isn't created at
 */

// Jest requires module or class mocks to be declared in the same block and before the require/import.
jest.mock('../src/dependencies/ClassDependency');

let moduleUnderTest = require('../src/moduleWithNoDependenciesCreatedAtRequire');
const ClassDependency = require('../src/dependencies/ClassDependency');

describe('stub out class instance created when test module function is invoked', () => {

  let mockClassDependency;

  beforeEach(() => {
    mockClassDependency = {
      alwaysReturnOne: jest.fn()
    };

    ClassDependency.mockImplementation(() => mockClassDependency);
  });

  test('assert that instance was created and created with correct params', () => {
    moduleUnderTest.createClassDependencyAndUseIt();

    expect(ClassDependency).toHaveBeenCalledTimes(1);
    expect(ClassDependency).toHaveBeenCalledWith('arg1', 'arg2');
  });

  test('assert that a class dependency was invoked', () => {
    moduleUnderTest.createClassDependencyAndUseIt();

    // At this point we are running expects against the mock class instance we created that is returned when the
    // mocked ClassDependency constructor is ran.
    expect(mockClassDependency.alwaysReturnOne).toHaveBeenCalledTimes(1);
  });

  test('assert that class dependency return behavior can be changed', () => {
    mockClassDependency.alwaysReturnOne.mockReturnValue(2);

    expect(moduleUnderTest.createClassDependencyAndUseIt()).toEqual(2);
  });

  test('assert that class dependency return behavior can be changed again', () => {
    mockClassDependency.alwaysReturnOne.mockReturnValue(42);

    expect(moduleUnderTest.createClassDependencyAndUseIt()).toEqual(42);
  });

});