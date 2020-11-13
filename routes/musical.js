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