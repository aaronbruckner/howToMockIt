const ClassDependency = require('./dependencies/ClassDependency');

let instance = new ClassDependency('arg1', 'arg2');
/**
 * It is very common to test code that uses class instances which were created when the module was required. This
 * is frequently the most difficult thing to mock in javascript.
 * @return {*}
 */
function useClassDependencyCreatedAtRequire() {
  return instance.alwaysReturnOne();
}

module.exports = {
  useClassDependencyCreatedAtRequire
};