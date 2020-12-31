const MusicalInfo = require('../models/MusicalInfo');
const {startSession} = require('mongoose')

const img = require('../services/img');

const STATIC_IMG_PATH = '/img';
const IMG_DEFAULT_NAME = 'main';

const registData = async(req,res)=>{
    const data  = req.body;
    const {name,summary,category,link,start_date,end_date,img_data} = data;
    
    //트랜잭션
    const session = await startSession();

    try{
      //트랜잭션 개시
      session.startTransaction();

      const infoset = new MusicalInfo({
        'name' : name,
        'summary' : summary,
        'category' : category,
        'link': link,
        'start_date':start_date,
        'end_date':end_date,
      })
      const saveResult = await infoset.save();

      const forder_name = saveResult.musical_id

      if(!img.upload(img_data,forder_name,IMG_DEFAULT_NAME)){
        throw 'image upload err';
      }

      //업데이트
      await MusicalInfo.updateOne({musical_id:saveResult.musical_id},{img_path:`${STATIC_IMG_PATH}/${forder_name}/${IMG_DEFAULT_NAME}.jpg`}).exec()

      //트랜잭션종료 
      await session.commitTransaction()
      session.endSession()

      res.status(200).json({
        success: true
      })

    }catch(e){
      await session.abortTransaction();
      session.endSession();
      res.json({ success: false, err});
    }
};

const updateData = (req,res)=>{
  const {musical_id,name,category,summary,link,start_date,end_date,img_path} = req.body;
  
  MusicalInfo.updateOne({musical_id:musical_id},{
    'name' : name,
    'summary' : summary,
    'category' : category,
    'link': link,
    'start_date':start_date,
    'end_date':end_date,
    'img_path':img_path,
  }) 
  .then((result)=>{
    res.status(200).json(
      {success: true}
    );
  })
  .catch((err)=>{
    console.log(err);
    res.json({ success: false, err})
  })
}


const pageList = async(req,res)=>{
  
    const LIMIT_DEFAULT = 20;
    const PAGE_DEFAULT = 1;
  
    const data  = req.query;
    let {nowPage,search} = {...req.cookies.adminPage};
    const limitCount = Number(data.limitCount) || LIMIT_DEFAULT; //한페이지에 표시할 건수 
    const pageControl = data.pageControl; //페이지 컨트롤 바 조작
    
    nowPage = Number(nowPage) || 1; //현재 표시중인 페이지

    //페이지 관련
    let toPage = Number(data.toPage) || PAGE_DEFAULT; //이동할 페이지

    //검색 조건 설정
    let findSet = {"del_flg":{$ne:1}}
    
    //카테고리 
    if(data.category != 'all' && data.category){
      findSet = {...findSet, "category" : data.category};
    }

    //검색내용설정 
    if(data.findData){
      findData = data.findData
      findSet = {...findSet, name : new RegExp(findData)};
    }else if(search){
      findData = search
      findSet = {...findSet, name : new RegExp(findData)};
    }

    //전체 항목개수 
    const fullCount = await MusicalInfo.find(findSet).countDocuments();

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

    try{
      const searchData = await MusicalInfo.find(findSet,{
        _id:false,
        musical_id:true,
        name:true,
        link:true,
        summary:true,
        img_path:true,
      }).skip((toPage-1)*limitCount).limit(limitCount).exec();

      nowPage = toPage ? toPage : nowPage;
      
      res.cookie('adminPage',{nowPage:nowPage,search:findData}, {
        sameSite: true,
        maxAge: 3000,
      });
      res.status(200).json(
        {data:[...searchData], lastPageNum}
      );
    }catch(err){
      console.log(err);
      res.json({ success: false})
    }
};  

const musicalData = async (req,res)=>{
      
  try{
    const result = await MusicalInfo.find({musical_id:req.params.id},{
      _id:false,
      musical_id:true,
      name:true,
      summary:true,
      img_path:true,
      category:true,
      start_date:true,
      end_date:true,
    }); 
    res.cookie('adminPage',req.cookies.adminPage, {
      maxAge: 3000,
      sameSite: 'lax',
    });
    res.status(200).json(
      result
    );
  }catch(err){
    console.log(err);
    res.json({ success: false, err})
  }
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

const mainList = async (req,res) =>{
  const maxCategoryCount = 5; //검색할 카테고리 개수
  const maxContentsCount = 15;//카테고리별 최대 출력개수

  const randCatSet = (data) =>{
    const num = data.length;
    const arr = [];
    //랜덤숫자 생성
    const randomNum = (num)=>Math.floor(Math.random() * num + 1);
    
    if(maxCategoryCount < num){
      while(arr.length < maxCategoryCount){
        const pushNum = randomNum(num);
        if(arr.includes(pushNum)){
          continue;
        }else{
          arr.push(pushNum);
        }
      }   
    }else{
      data.map(item => {
        arr.push(item);
      })
    }
    const list = arr.map(item=>data[item]);
    return list;

  };

  try{
    // 전체 카테고리 확인(중복제거)
    const catData = await MusicalInfo.distinct('category').where({"del_flg":{$ne:1}}).exec(); 
    
    //표시할 카테고리를 랜덤 취득
    const setCat = randCatSet(catData);

    const result = await MusicalInfo.find().where({category:setCat},{      
      _id:false,
      musical_id:true,
      name:true,
      summary:true,
      img_path:true,
      category:true
    }).exec(); 
    
    
      console.log(result)
    //카테고리별 12항목 취득
    // 최대 12개 보여줄것
    // 개수 랜덤화해서 랜덤으로 표시
  }catch(err){
    console.log(err);
  }
}


module.exports ={
    pageList,
    delData,
    registData,
    musicalData,
    updateData,
    mainList
}
