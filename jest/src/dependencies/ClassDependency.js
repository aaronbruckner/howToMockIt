class ClassDependency {
  constructor(arg1, arg2){
    console.log(arg1, arg2);
  }

  alwaysReturnOne() {
    return 1;
  }
}

module.exports = ClassDependency;