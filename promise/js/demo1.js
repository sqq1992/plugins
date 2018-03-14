
//1
// console.log("test-1")
// new Promise(resolve=>{
//
//     setTimeout(()=>{
//         resolve("hello");
//     },2000)
//
// }).then(value=>{
//     console.log(value + "world");
// })
//
// //2
// let promise = new Promise(resolve=>{
//     setTimeout(()=>{
//         console.log("2. 1111")
//         resolve("w")
//     },1000)
// })
// setTimeout(() => {
//     promise.then(value=>{
//         console.log(value+"22222")
//     })
// }, 3000);

//3
new Promise(resolve=>{
    console.log('step-1')
    setTimeout(()=>{
        resolve(100);
    },1000)
})
.then(value=>{
    return new Promise(resolve=>{
        console.log('step-2')
        setTimeout(() => {
            resolve(110);
        }, 1000);
    })
})
.then(value=>{
    console.log('step-3')
    console.log(value)
})