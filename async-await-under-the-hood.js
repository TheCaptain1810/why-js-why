function asyncGenerator(generatorFunc) {
    return function () {
        const generator = generatorFunc();

        function handle(result) {
            if (result.done) return Promise.resolve(result.value);

            return Promise.resolve(result.value).then(
                res => handle(generator.next(res)),
                err => handle(generator.throw(err))
            );
        }

        return handle(generator.next());
    };
}


const fetchData = asyncGenerator(function* () {
    const data = yield new Promise(resolve => setTimeout(() => resolve("Data Loaded!"), 1000));
    console.log(data);
});

fetchData(); // After 1 sec: "Data Loaded!"
