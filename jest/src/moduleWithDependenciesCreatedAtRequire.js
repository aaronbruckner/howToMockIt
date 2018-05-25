const ClassDependency = require('./dependencies/ClassDependency');

/**
 * This function creates a class dependency, invokes a function on it, and returns a value depending on the dependency.
 * @return {*}
 */
function createClassDependencyAndUseIt() {
  let instance = new ClassDependency('arg1', 'arg2');
  return instance.alwaysReturnOne();
}

module.exports = {
  createClassDependencyAndUseIt
};