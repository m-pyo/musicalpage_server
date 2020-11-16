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
  
    const data  = req.query;
    
    const limitCount = Number(data.limitCount) || LIMIT_DEFAULT; //한페이지에 표시할 건수 
    const nowPage = Number(data.nowPage) || 1; //현재 표시중인 페이지
    const pageControl = data.pageControl; //페이지 컨트롤 바 조작
    
    //페이지 관련
    let toPage = Number(data.toPage) || PAGE_DEFAULT; //이동할 페이지

    //전체 항목개수 
    const fullCount = await MusicalInfo.find().countDocuments();
    
    //전체 페이지 개수 
    const lastPageNum = Math.ceil(fullCount/limitCount)

    switch(pageControl){
      case 'first':
        toPage = 1
        break;
      case 'prev':
        toPage = nowPage - 1
        break;
      case 'next':
        toPage = nowPage + 1
        break;
      case 'end':
        toPage = lastPageNum;
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
    }).skip((toPage-1)*limitCount).limit(limitCount)
    .then((result)=>{
      res.status(200).json(
        {...result, lastPageNum}
      );
    })
    .catch((err)=>{
      console.log(err);
      res.json({ success: false})
    });
};  

const musicalData = (req,res)=>{
      
    MusicalInfo.find({musical_id:req.params.id},{
        _id:false,
        musical_id:true,
        name:true,
        summary:true,
        img_path:true,
        category:true,
        start_date:true,
        end_date:true,
    }) 
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

const delData = (req,res)=>{
    
    MusicalInfo.updateOne({musical_id:req.params.id},{del_flg:1}) 
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
    pageList,
    delData,
    registData,
    musicalData
}
