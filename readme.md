# How To Mock It ???

This repo contains examples of how to mock complex dependencies (which are usually classes in javascript) for frameworks
I've worked with.
 
Such examples include:
* mocking the function of a singleton module dependency (very easy).
* mocking a class dependency that is created when the test function is invoked (medium difficulty).
* mocking a class dependency that is created then the test module is required (most difficult to achieve in javascript).

### Promise Mocking
In jestES6/test/promise.test.js, I have examples of how to test promises. Promise testing can be very 
difficult due to how then blocks are resolved. 

Video Presentation on Promise Mocking: https://youtu.be/nz9CwRfWPg4


### Completed Frameworks
* Jest (require)
* Jest (ES6 modules/import)
* Mocha with Sinon/proxyquire

### Keywords
mock promise
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