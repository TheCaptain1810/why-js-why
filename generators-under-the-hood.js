// This is manually simplified version of how generators work under the hood
class MyGenerator {
    constructor(generatorFunc) {
        this.generatorFunc = generatorFunc;
        this.iterator = this.generatorFunc();
        this.state = 'suspendedStart';  // Generator starts in suspended state
    }

    next(value) {
        // Pauses the function execution
        if (this.state === 'suspendedStart') {
            this.state = 'executing';
            return this._invoke('next', value);
        }
        // Continues where it left off after `yield`
        if (this.state === 'executing') {
            return this._invoke('next', value);
        }
    }

    _invoke(method, value) {
        try {
            // Call the generator function's next or throw method
            const result = this.iterator[method](value);
            return { value: result.value, done: result.done };
        } catch (err) {
            return { value: err, done: true };
        }
    }
}

// Example of a generator function
function* myGen() {
    const x = yield 'First';
    console.log(x);  // 'Second'
    yield 'Second';
    const y = yield 'Third';
    console.log(y);  // 'Fourth'
    return 'Done';
}

const gen = new MyGenerator(myGen);

// Start the generator and get the first value
console.log(gen.next()); // { value: 'First', done: false }

// Send a value back to the generator after it yielded
console.log(gen.next('Second')); // Logs 'Second', returns { value: 'Second', done: false }

// Continue the generator with another value
console.log(gen.next('Fourth')); // Logs 'Fourth', returns { value: 'Done', done: true }


// closer to the actual implementation
function MyGeneratorFunc() {
    const generator = (function* () {
        let value = 0;
        while (true) {
            value += 1;
            const increment = yield value;  // Pauses here and waits for input
            if (increment) value += increment;  // If input is provided, increase the value
        }
    })();

    return {
        next(value) {
            return generator.next(value);
        },

        throw(err) {
            return generator.throw(err);
        },

        return(value) {
            return generator.return(value);
        }
    };
}

const genReal = MyGeneratorFunc();
console.log(genReal.next()); // { value: 1, done: false }
console.log(genReal.next(2)); // { value: 3, done: false }
console.log(genReal.next(3)); // { value: 6, done: false }
console.log(genReal.return('Finished!')); // { value: 'Finished!', done: true }
