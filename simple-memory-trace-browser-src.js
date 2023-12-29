
const trace_memory_1 = require('simple-memory-trace')


async function trace_memory(func, options, ...args) {
  return await trace_memory_1(func, { memoryUsage() {
    return performance.memory
  }, force_gc: 0, ...options }, ...args)
}


window.trace_memory = module.exports = trace_memory

