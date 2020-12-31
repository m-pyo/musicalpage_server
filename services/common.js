/**
 * null확인
 * @param {*} checkData 확인할데이터
 * @return {boolean} 확인결과
 */
exports.isNull = (checkData)=>{
    try{
        if(!checkData){
            return false  
        }else{
            return true
        }
    }catch(e){
        return false
    }
};

/**
 * 최대 문자수 확인
 * @param {*} checkData 확인할데이터
 * @param {Number} maxNum 최대문자개수
 * @return {boolean} 확인결과
 */
exports.maxLengthCheck = (checkData,maxNum) =>{
    try{
        if(checkData.length > maxNum){
            return false
        }else{
            return true
        }
    }catch(e){
        return false
    }
};

/**
 * 최초 문자수 확인
 * @param {*} checkData 확인할데이터
 * @param {Number} minNum 최소문자개수
 * @return {boolean} 확인결과
 */
exports.minLengthCheck = (checkData,minNum) =>{
    try{
        if(checkData.length > minNum){
            return false
        }else{
            return true
        }
    }catch(e){
        return false
    }
};

/**
 * 문자 타입 확인
 * 부족한 타입은 차후 추가
 * @param {*} checkData 확인할데이터
 * @param {String} type 일치하는지 확인할 타입
 * @return {boolean} 확인결과 
 */
exports.typeSetCheck = (checkData,type) =>{
    try{
        switch(type){
            case 'String':
                return typeof(checkData) === 'string'
            case 'Number':
                return typeof(checkData) === 'number'
            case 'Object':
                return typeof(checkData) === 'object'
            default :
                return false
        }
    }catch(e){
        return false
    }
};

/**
 * url 형식 확인
 * http(s):// 입력이 포함되어있을것
 * @param {*} checkData 확인할데이터
 * @return {boolean} 확인결과 
 */
exports.urlPatternCheck = (checkData) =>{
    try{
        urlReg = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi
        return urlReg.test(checkData);
    }catch{
        return false
    }
}

/**
 * base64 형식 확인
 * @param {*} checkData 확인할데이터
 * @return {boolean} 확인결과 
 */
exports.base64PatternCheck = (checkData) =>{
    try{
        reg = /(.+base64\,)(?<=base64\,)(.+)/g
        return reg.test(checkData);
    }catch{
        return false
    }   
}

/**
 * 날짜 형식 확인
 * hhhh-mm-dd형식의 날짜입력확인
 * 추가 패턴확인 필요할경우 추가
 * @param {*} checkData 확인할데이터
 * @return {boolean} 확인결과 
 */
exports.datePatternCheck = (checkData) =>{
    try{
        reg = /(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][1-9]|3[0-1])?/
        return reg.test(checkData);
    }catch{
        return false
    }   
}