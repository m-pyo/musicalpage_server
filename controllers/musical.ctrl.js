const MusicalInfo = require('../models/MusicalInfo');

const registData = (req,res)=>{
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
};


const pageList = async(req,res)=>{
  
    const LIMIT_DEFAULT = 20;
    const PAGE_DEFAULT = 1;
  
    const data  = req.body;
    
    
    const limitCount = data.limitCount || LIMIT_DEFAULT; //한페이지에 표시할 건수 
    const nowPage = data.nowPage || 1; //현재 표시중인 페이지
    const pageControl = data.pageControl; //페이지 컨트롤 바 조작
    
    //페이지 관련
    let toPage = data.toPage || PAGE_DEFAULT; //이동할 페이지
  
    switch(pageControl){
      case 'first':
        toPage = 1
        break;
      case 'prev':
        topage = nowPage - 1
        break;
      case 'next':
        topage = nowPage + 1
        break;
      case 'end':
        const fullDataCount = await MusicalInfo.find().countDocuments();
        topage = Math.ceil(fullDataCount/limitCount);
        break; 
    }
  
    //검색 조건 설정
    let findSet = {"del_flg":{$ne:1}}
    
    //카테고리 
    data.category && {...findSet, "category" : data.category};
  
    MusicalInfo.find(findSet,{
      _id:false,
      musical_id:true,
      name:true,
      category:true,
    }
    ).skip((toPage-1)*limitCount).limit(limitCount)
    .then((result)=>{
      res.status(200).json(
        result
      );
    })
    .catch((err)=>{
      console.log(err);
      res.json({ success: false})
    });
};

const delData = (req,res)=>{
  
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
    
};


module.exports ={
    pageList: pageList,
    delData: delData,
    registData: registData,
}