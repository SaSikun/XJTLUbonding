const Mock = require('mockjs')
const result = require("element-ui/packages/result");

const Random = Mock.Random;

let Result1 = {
    status:200,
    message: 'success',
    data: {
        id:'1013',
    }
}



Mock.mock('/getImage','get',() =>{
    Result1.data.captureImage = Random.dataImage('120x40','12345')
    Result1.data.realValid = '1231'

    return Result1
})

// Mock.mock('/login','post',() =>{
//     Result1.code=200
//     return Result1
// })

Mock.mock('/login','post',() =>{
    Result1.status=200
    Result1.mcsg = '看看自己那里输错了'
    return Result1
})

Mock.mock('/register','post',() =>{
    Result1.status=408
    Result1.mcsg = '看看自己那里输错了'
    return Result1
})

