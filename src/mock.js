const Mock = require('mockjs')
// const result = require("element-ui/packages/result");
// const da = require("element-ui/src/locale/lang/da");
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

// Mock.mock('/user/login','post',(config) =>{
//     console.log(config)
//     Result1.status=200
//     Result1.msg = '看看自己那里输错了'
//     return Result1
// })
//
// Mock.mock('/user/register','post',(config) =>{
//     console.log(config)
//     Result1.status=408
//     Result1.msg = '看看自己那里输错了'
//     return Result1
// })

Mock.mock('/homepage',
    'get',
    () => {
        Result1.data = [{id:1,key:'a'},{id:2,key:'b'},{id:3,key:'c'}]
        return Result1
    })
var dataMock = Mock.mock({
    'data|30': [
        {
            'direction|0-359': 0, //角度0-359
            'posType|1': ['GPS', 'LBS', 'WIFI'],
            address: '@province@city@county' //省市县地址
        }
    ]
})
Mock.mock('/homepage2',
    'get',
    ()=>{
    console.log("this is in mock",typeof(dataMock))
        return {
        status: 200,
        msg: 'Mock接口模拟数据',
        dataMock
    }
})
