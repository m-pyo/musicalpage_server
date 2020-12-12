var express = require('express');
var router = express.Router();

const {
  registData,
  pageList,
  delData,
  musicalData,
  updateData,
  mainList
} = require('../controllers/musical.ctrl');


//데이터 등록
router.post('/regist', registData);

//페이지 관련 표시항목 취득
router.get('/pagelist', pageList);

//뮤지컬 데이터 삭제
router.patch('/del-musical-data/:id', delData);

//데이터 취득
router.get('/musical-data/:id', musicalData);

//데이터 취득
router.patch('/updatedata', updateData);

//메인화면 카테고리별 항목취득
router.get('/main-list',mainList);


/**
 * 빠른데이터 생성
 */
router.post('/data-quick-generate', (req,res)=>{
  const setCatData = ['오리지널','가족','라이선스','창작','퍼포먼스','어린이/가족'];
  const nameDef = '뮤지컬 제목'

  const sampleDataCount = 20;
  let createData = [];
  let summaryCount = 1;

  for(category of setCatData){
    for(let i = 0; i < sampleDataCount; i ++){
      createData = [...createData,{"category": category, "name": category + nameDef+String(i), "summary" : "내용"+String(summaryCount) } ]; 
      summaryCount++;
     }
  }

  createData.map(data=>{
    const infoset = new MusicalInfo(data)
    infoset.save()
  })

  res.status(200).json(
    { success: true}
  );
})



module.exports = router;