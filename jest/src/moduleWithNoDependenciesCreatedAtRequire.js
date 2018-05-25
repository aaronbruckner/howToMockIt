const AWS = require('aws-sdk');
const ClassDependency = require('./dependencies/ClassDependency');

function createAwsSdkInstanceAndUseIt() {

}


function useClassDependencyThatWasCreatedAtRequire() {

}

/**
 * This function creates a class dependency, invokes a function on it, and returns a value depending on the dependency.
 * @return {*}
 */
function createClassDependencyAndUseIt() {
  let instance = new ClassDependency('arg1', 'arg2');
  return instance.alwaysReturnOne();
}

module.exports = {
  createAwsSdkInstanceAndUseIt,
  createClassDependencyAndUseIt,
  useClassDependencyThatWasCreatedAtRequire
};