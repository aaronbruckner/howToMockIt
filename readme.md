# How To Mock It ???

This repo contains examples of how to mock complex dependencies (which are usually classes in javascript) for frameworks
I've worked with.
 
Such examples include:
* mocking the function of a singleton module dependency (very easy).
* mocking a class dependency that is created when the test function is invoked (medium difficulty).
* mocking a class dependency that is created then the test module is required (most difficult to achieve in javascript).

### Completed Frameworks
* Jest (require)
* Jest (ES6 modules/import)
* Mocha with Sinon/proxyquire

### Keywords
javascript
jest
mock
mocking
class instance
stub
stubbing
mocha
sinon
proxyquire