function make_array(size) {
  let arr = []
  for(let i = 0; i < size; i++)
    arr.push(i)
  return arr
}


(async function() {
  console.log(1, trace_memory)

  await trace_memory( () => {
    make_array(100)
  }, { verbose: true, unit: 'B' })

  /*
  let memoryUsage = await trace_memory( () => {
    make_array(10000000)
  }, { unit: 'MB' })
  console.log(memoryUsage)
  */

  // to get this object instead of using verbose for console.log
  let memoryUsage1 = await trace_memory( () => {
    make_array(1000000)
  }, { unit: 'MB' })
  console.log(memoryUsage1)

  let memoryUsage2 = await trace_memory( () => {
    make_array(5000000)
  }, { unit: 'MB' })
  console.log(memoryUsage2)

  // console.log(performance.measureUserAgentSpecificMemory())
  console.log(performance.memory)
  make_array(10000)
  console.log(performance.memory)
  /*
  let memoryUsage3 = await trace_memory( () => {
    make_array(100000)
   // make_array(1)
  }, { unit: 'MB' })
  */
  //  console.log(memoryUsage3)
  // console.log(performance.measureUserAgentSpecificMemory())

})()
/*
//import trace_memory from "../simple-memory-trace-browser.js"
import('../simple-memory-trace-browser.js').then((out) => {
  console.log(out)
});
*/
