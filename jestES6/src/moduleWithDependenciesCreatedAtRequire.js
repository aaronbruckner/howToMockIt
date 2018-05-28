import ClassDependency from '../src/dependencies/ClassDependency';

let instance = new ClassDependency('arg1', 'arg2');
/**
 * It is very common to test code that uses class instances which were created when the module was required. This
 * is frequently the most difficult thing to mock in javascript.
 * @return {*}
 */
export function useClassDependencyCreatedAtRequire() {
  return instance.alwaysReturnOne();
}