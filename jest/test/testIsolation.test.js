'use strict';

const moduleWithNoDependenciesCreatedAtRequire = require('../src/moduleWithNoDependenciesCreatedAtRequire');
const ClassDependency = require('../src/dependencies/ClassDependency');

/**
 * Sanity check to confirm mocks in other test files are not leaking and poisoning other tests
 */
describe('Mocks isolation', () => {
  test('module should behave as expected (should not be mocked)', () => {
    expect(moduleWithNoDependenciesCreatedAtRequire.createClassDependencyAndUseIt()).toEqual(1);
  });

  test('class dependency should behave as expected (should not be mocked)', () => {
    expect(new ClassDependency().alwaysReturnOne()).toEqual(1);
  });
});