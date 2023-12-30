
const trace_malloc_1 = require('simple-trace-malloc')


async function trace_malloc(func, options, ...args) {
  return await trace_malloc_1(func, { memoryUsage() {
    return performance.memory
  }, force_gc: 0, ...options }, ...args)
}

window.trace_malloc = module.exports = trace_malloc
