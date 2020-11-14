var express = require('express');
var router = express.Router();

const MusicalInfo = require('../models/MusicalInfo');

router.post('/registData', (req,res)=>{
    const data  = req.body;
    const {name,summary,link,start_date,end_date,img_path} = data;
    const infoset = new MusicalInfo({
      'name' : name,
      'summary' : summary,
      'link': link,
      'start_date':start_date,
      'end_date':end_date,
      'img_path':img_path,
    })
    infoset.save()
    .then(()=>{
      res.status(200).json({
          success: true
      });
    })
    .catch((err)=>{
      console.log(err);
      res.json({ success: false, err});
    })
})

/**
 * 전항목 취득
 */
router.get('/selectData', (req,res)=>{
  MusicalInfo.find() 
  .then((result)=>{
    const sendData = [];
    result.map(data=>{
      const {name,summary,link,start_date,end_date,img_path} = data;
      const setData = {name,summary,link,start_date,end_date,img_path};
      sendData.push(setData);
    })
    res.status(200).json(
      sendData
    );
  })
  .catch((err)=>{
    console.log(err);
    res.json({ success: false, err})
  })
})


/**
 * 페이지 표시항목 취득
 */
router.get('/pagelist', (req,res)=>{
  
  const LIMIT_DEFAULT = 20;
  const PAGE_DEFAULT = 1;

  const data  = req.body;
  const page = data.page || PAGE_DEFAULT;
  const limitCount = data.limitCount || LIMIT_DEFAULT;

  //카테고리 
  const findSet = data.category ? {"category" : data.category, "del_flg":{$ne:1}} : {"del_flg":{$ne:1}};

  MusicalInfo.find(findSet,{
    _id:false,
    musical_id:true,
    name:true,
    category:true,
    createAt:true,
    start_date:true,
    end_date:true}
  ).skip((page-1)*limitCount).limit(limitCount)
  .then((result)=>{
    res.status(200).json(
      result
    );
  })
  .catch((err)=>{
    console.log(err);
    res.json({ success: false})
  });
});


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


/**
 * 뮤지컬 데이터 삭제
 * 삭제시 데이터 자세를 삭제하는게 아닌 삭제플래그로서 비표시처리
 */
router.patch('/delMusicalData', (req,res)=>{
  
  const data  = req.body;
  
  MusicalInfo.updateOne({musical_id:data.musical_id},{del_flg:1}) 
  .then((result)=>{
    res.status(200).json(
      result
    );
  })
  .catch((err)=>{
    console.log(err);
    res.json({ success: false, err})
  })
})



module.exports = router;