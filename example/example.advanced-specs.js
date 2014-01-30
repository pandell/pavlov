pavlov.specify("Pavlov Advanced Examples", function(){

    describe("Testing global timeout", function() {

        before(function(){
            // TODO: figure out how to set this per module / testEnvironment in
            // pavlov.
            QUnit.config.testTimeout = 500;
        });

        after(function() {
            QUnit.config.testTimeout = undefined;
        });

        it("can time out async functions gracefully even if they never resume", async(function(){
            // Just wait for global timeout.
            if (window.console) { window.console.log(1); }
        }));
        it("can time out async functions gracefully even if they never resume", async(function(){
            // Just wait for global timeout.
            if (window.console) { window.console.log(2); }
        }));
    });

    describe("Testing global timeout 2", function() {

        before(function(){
            QUnit.config.testTimeout = 10;
        });

        after(function() {
            QUnit.config.testTimeout = undefined;
        });

        it("can time out async functions gracefully even if they never resume", async(function(){
            // Just wait for timeout.
            if (window.console) { window.console.log(3); }
        }));


        it("can time out async functions gracefully even if they never resume", async(function(){
            // Just wait for timeout.
            if (window.console) { window.console.log(4); }
        }));
    });




    describe("A feature that is being described", function(){

        var foo;

        before(function(){
            foo = "bar";
        });

        after(function(){
            foo = "baz";
        });

        it("can show clearly when a variable is undefined", function(){
            var undef;

            assert(undef).equals('bar');
            assert(undef, 'a silly variable').equals('bar');
            assert(undef).isUndefined('undef should be undefined');
            assert(undef).isUndefined();
            assert(undef, 'an undefined variable').isUndefined();
            assert(undef).isUndefined('bar');
            assert(undef, 'an undefined variable').isUndefined();
        });

        it("can check types of things", function(){
            var undef,
                arr = [1, 2, 3, 4, true, {x: 'hello'}];

            assert(undef).isOfType('undefined');
            assert(undef, 'an undefined variable').isOfType('array');
            assert(undef).isFunction();

            assert(arr).isOfType('array');
            assert(arr, 'arr').equals([1, 2, 3, 'fail']);
            assert(arr, 'arr').isSameAs([1, 2, 3, 'fail']);
            assert(arr, 'arr').equals('should fail');

        });

        given([2,2,4], [5,2,7], [6,-4,2]).
            it("can generate row data tests", function(a, b, c) {
                assert(c).equals(a + b);
                assert(c - 1, 'c - 1').equals(a + b);
            });

        it("can catch exceptions", function(){
            assert(function(){
                throw new Error("Error with message!");
            }).throwsErrorWithMessage("Error with message!");

            assert(function(){
                throw "Lazy exception";
            }).throwsException("Lazy exception");

            assert(function(){
                throw new Error("Error whatever");
            }).throwsException();

            assert(function(){
                throw "Whatever";
            }).throwsException();
        });

        it("can specify asynchronous features", async(function(){
            // an async spec implementation will pause the test runner until 'resume()'
            setTimeout(function(){
                assert.pass();
                resume();
            }, 500);
        }));
    });

});
