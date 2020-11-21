const valid = require('../../services/validations/musical');

exports.musicalRegist = (req,res,next) =>{
    const {name,category,summary,link,start_date,end_date,img_data} = req.body;
    
    const runValid = [
        valid.nameValid(name),
        valid.categoryValid(category),
        valid.summaryValid(summary),
        valid.linkValid(link),
        valid.dateValid(start_date),
        valid.dateValid(end_date),
        valid.imgValid(img_data)
    ]

    //에러발생시 전달되는 메시지 배열
    let msgArr = [];

    //결과 확인후 메시지 저장
    runValid.map(set=>{
        if(!set.result){
            msgArr.push(set.msg);
        }
    });

    //실패 항목이 있을경우 메시지 전달
    if(msgArr.length > 0){
        res.status(200).json({
            success : false,
            msg : msgArr
        })
    }else{
        next();
    }
}