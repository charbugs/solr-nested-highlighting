const benchmark = require("./benchmark")
// @ponicode
describe("benchmark.default", () => {
    test("0", () => {
        let callFunction = () => {
            benchmark.default(() => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            benchmark.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
