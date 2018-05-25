'use strict';

const moduleWithNoDependenciesCreatedAtRequire = require('../src/moduleWithNoDependenciesCreatedAtRequire');
const moduleWithDependenciesCreatedAtRequire = require('../src/moduleWithDependenciesCreatedAtRequire');
const ClassDependency = require('../src/dependencies/ClassDependency');

/**
 * Sanity check to confirm mocks in other test files are not leaking and poisoning other tests. This test file contains
 * all the different modules and dependencies used as is to confirm they are not mocked from another test.
 */
describe('Mocks isolation', () => {
  test('module with no dependencies created at require should behave as expected (should not be mocked)', () => {
    expect(moduleWithNoDependenciesCreatedAtRequire.createClassDependencyAndUseIt()).toEqual(1);
  });

  test('module with dependencies created at require should behave as expected (should not be mocked)', () => {
    expect(moduleWithDependenciesCreatedAtRequire.useClassDependencyCreatedAtRequire()).toEqual(1);
  });

  test('class dependency should behave as expected (should not be mocked)', () => {
    expect(new ClassDependency().alwaysReturnOne()).toEqual(1);
  });
});