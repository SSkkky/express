/*
react hook 처럼 불러오고
get, res send

패스경로에 따라 콜백함수가 실행
    - 첫번째 자리 : request(데이터, 파라미터 값 ... )
    - 두번째 자리 : request responce
    - res.send : 사용자에게 보여줄 것
*/

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
let data = JSON.parse(fs.readFileSync('./data.json'));



// bodyParser 사용 선언
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors 사용 선언
app.use(cors())



// 전체 가져오기
app.get('/test', function (req, res) {
    res.send(data.test);
})

// id값으로 가져오기
app.get('/test/:id', function (req, res) {
    const { id } = req.params;
    const findData = data.test.find(obj => obj.id == id);
    res.send(findData);
})


app.post('/test', function (req, res) {
    /*
        1. front에서 정보를 받아서(req.body)
        2. json을 저장한 변수((const data), 실제 파일 아님)에 넣고
        3. json형태로 바꿔서 data.json(실제 파일)에 덮음
    */
    data.test.push(req.body);
    const body = JSON.stringify((data));
    const dataInsert = fs.writeFileSync('./data.json', body);
    // res.send(data);
    res.send(data.test);
})

app.put('/test/', function (req, res) {
    const updateBody = req.body;

    data.test = data.test.map(obj => {
        if (obj.id == updateBody.id) {
            obj = updateBody;
        }
        return obj;
    });

    const body = JSON.stringify(data);
    fs.writeFileSync('./data.json', body);

    res.send(data.test);
})
app.delete('/test/:id', function (req, res) {
    const { id } = req.params;
    data.test = data.test.filter(obj => obj.id != id)
    const body = JSON.stringify(data);
    fs.writeFileSync('./data.json', body);
    res.send(data.test);
})





const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server running... port :${PORT}`)
})
