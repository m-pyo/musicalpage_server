const fs = require('fs');

const upload = (imgData,forderName,fileName)=>{

    //이미지 생성작업 
    if(imgData){ 
        const dir = `./public/images/${forderName}`;
    
        try{
            //파일 디렉토리 생성 
            !fs.existsSync(dir) && fs.mkdirSync(dir);
    
            //파일 작성
            const bitmap = Buffer.from(imgData.split(';base64,').pop(), 'base64');
            fs.writeFileSync(`${dir}/${fileName}.jpg`,bitmap);
        
        }catch(e){
            return false;
        }  
    }
    
    return true;
}

module.exports = {upload};