import { sum } from "../sum"


test("Sum function",()=>{
    const result = sum(3,4)

    expect(result).toBe(7)
})