import { SynchronousPromise } from 'synchronous-promise';

describe('Promises', () => {
    let callback;
    beforeEach(() => {
        callback = jest.fn();
    });
    describe('issues', () => {
        /**
         * Promises do not resolve then clauses synchronously (the moment the parent promise is resolved). This is in their spec. No time mocking will
         * prevent this behavior.
         */
        it('don\'t resolve when expected', () => {
            function codeUnderTest(callback) {
                return Promise.resolve()
                    .then(() => {
                        // Will this resolve before getting returned?
                        callback();
                    });
            }

            codeUnderTest(callback);
            
            expect(callback).toHaveBeenCalledTimes(0);
            // This test would fail
            // expect(callback).toHaveBeenCalledTimes(1);
        });

        /**
         * Promise implementations usually are configured in a way to avoid mocked time.
         */
        it('mocking time doesn\'t work', () => {
            jest.useFakeTimers();
            function codeUnderTest(callback) {
                return Promise.resolve()
                    .then(() => {
                        callback();
                    });
            }

            codeUnderTest(callback);
            
            jest.runAllTimers();

            expect(callback).toHaveBeenCalledTimes(0);
            // This test would fail
            // expect(callback).toHaveBeenCalledTimes(1);
        });

        it('how do we assert behavior in a then clause?', () => {
            // BAD SOLUTION
            function codeUnderTest(callback) {
                return Promise.resolve()
                    .then(() => {
                        callback();
                    });
            }

            codeUnderTest(callback);
            
            // Ewwwww... Works for a single promise but gets really out of hand with cascading thens! 
            return Promise.resolve()
                .then(() => {
                    expect(callback).toHaveBeenCalledTimes(1);
                });
        });
    });

    describe('testing functions that return their promise', () => {
        it('just return the promise', () => {
            function codeUnderTest(callback) {
                return Promise.resolve()
                    .then(() => {
                        callback();
                    });
            }
    
            expect.assertions(1); // Make sure we fail if our test then clause is never ran.
            return codeUnderTest(callback)
                .then(() => {
                    expect(callback).toHaveBeenCalledTimes(1);
                });
        });
    });

    /**
     * It's very common to invoke a function that uses promises to resolve network data. It doesn't make sense to return these promises
     * when the caller has no need to access them. However there might be logic you wish to test that is contained in the then clauses
     * (like how does a UI update after a network response is returned via a resolving promise).
     */
    describe('testing code that doesn\'t return promises', () => {
        it('lots of functions start promises in the background that are not returned', () => {
            /* 
             * "api" and "codeUnderTest" would normally be separate modules. The api module would isolate the complex network logic of interacting
             * with your backend and provide a clean interface to other modules (which makes writing and testing code easier).
             * You will have to look at other examples to see how you would mock out the api instance in the "codeUnderTest" module.
             */
            let api = {
                getUserData: jest.fn()
            }

            function codeUnderTest(callback) {
                api.getUserData()
                    .then((result) => {
                        /* 
                         * In real life we would be doing something more complex than invoking a callback. We might change the 
                         * UI to reflect the returned data from the promise. However simple callbacks are easy to demonstrate if our assertions
                         * are running in the correct order relative to the promise code.
                         */
                        callback(result);
                    })
                    .catch(() => {
                        callback('Error');
                    });
                
            }

            let getUserDataPromise = SynchronousPromise.unresolved();
            api.getUserData.mockReturnValue(getUserDataPromise);

            codeUnderTest(callback);

            // Nothing has resolved yet! Test state of application before the network response has returned.
            // Any pending messages show to the user while waiting?
            expect(callback).toHaveBeenCalledTimes(0);

            // Return mock response that looks like how the backend would response.
            getUserDataPromise.resolve('test response');

            // Assert how the state should now look that the response has been returned.
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith('test response');
        });

        /**
         * Using synchronous promises in you tests allow them to flow from one assert to another without having complex state management.
         */
        it('you can also test negative flows!', () => {
            let api = {
                getUserData: jest.fn()
            }

            function codeUnderTest(callback) {
                api.getUserData()
                    .then((result) => {
                        callback(result);
                    })
                    .catch(() => {
                        callback('Error');
                    });
            }

            let getUserDataPromise = SynchronousPromise.unresolved();
            api.getUserData.mockReturnValue(getUserDataPromise);

            codeUnderTest(callback);

            expect(callback).toHaveBeenCalledTimes(0);

            getUserDataPromise.reject();

            // Assert how the state should now look with a failed request.
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith('Error');
        });
    });
});