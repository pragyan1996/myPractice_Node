//sample example to demonstrate sequential callbacks

function task1(cb) {
    asyncOperation(() => {
        task2(cb);
    })
}

function task2(cb) {
    asyncOpetation(() => {
        task2(cb);
    })
}

function task3(cb) {
    asyncOperation(() => {
        cb();
    })
}

task1(() => {
    console.log('This is the call of task 1 and task 2, 3 will be called after the completion of the task 1.')
})