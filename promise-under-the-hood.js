class MyPromise {
    constructor(executor) {
        this.state = "pending"; // "pending", "fulfilled", or "rejected"
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach(callback => callback(value));
            }
        };

        const reject = (reason) => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            if (this.state === "fulfilled") {
                resolve(onFulfilled ? onFulfilled(this.value) : this.value);
            } else if (this.state === "rejected") {
                reject(onRejected ? onRejected(this.reason) : this.reason);
            } else {
                this.onFulfilledCallbacks.push((value) => resolve(onFulfilled ? onFulfilled(value) : value));
                this.onRejectedCallbacks.push((reason) => reject(onRejected ? onRejected(reason) : reason));
            }
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("Success!"), 1000);
});

promise.then(value => console.log(value)); // After 1 sec: "Success!"
