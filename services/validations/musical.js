const common = require('../common');

/**
 * 입력확인 최종결과 리턴
 * @param {object} valid 결과값이 boolean형으로 들어있는 오브젝트를 전달 
 * @return {boolean} 성공 실패결과를 리턴
 */
const validResult = (valid)=>{
    for(result in valid){
        if(valid[result] === false){
            return false
        }
    }
    return true
}

/**
 * musical_id 입력형식검사
 * 미입력체크, 문자형체크
 * @param {String} _id 
 * @return {object} 성공 실패결과를 result로 실패시는 msg를 추가하여 리턴
 */
exports.musicalIdValid = (checkData)=>{
    let valid = {};
    const setType = 'String';

    valid.nullChk = common.isNull(checkData);
    valid.typeChk = common.typeSetCheck(checkData,setType);

    return validResult(valid) ? {result:true} : {result:false, msg:'뮤지컬 번호 입력을 확인해주세요'};
};

/**
 * name 입력형식검사
 * 미입력체크
 * @param {String} checkData 체크할 데이터
 * @return {object} 성공 실패결과를 result로 실패시는 msg를 추가하여 리턴
 */
exports.nameValid = (checkData)=>{
    let valid = {};
    const setType = 'String';

    valid.nullChk = common.isNull(checkData);
    valid.typeChk = common.typeSetCheck(checkData,setType);

    return validResult(valid) ? {result:true} : {result:false, msg:'이름 입력을 확인해주세요'};
};

/**
 * category 입력형식검사
 * 미입력체크
 * @param {String} checkData 체크할 데이터
 * @return {object} 성공 실패결과를 result로 실패시는 msg를 추가하여 리턴
 */
exports.categoryValid = (checkData)=>{
    let valid = {};
    const setType = 'String';

    valid.nullChk = common.isNull(checkData);
    valid.typeChk = common.typeSetCheck(checkData,setType);

    return validResult(valid) ? {result:true} : {result:false, msg:'카테고리 입력을 확인해주세요'};
};

/**
 * summary 입력형식검사
 * 미입력체크
 * @param {String} checkData 체크할 데이터
 * @return {object} 성공 실패결과를 result로 실패시는 msg를 추가하여 리턴
 */
exports.summaryValid = (checkData)=>{
    let valid = {};
    const setType = 'String';

    valid.nullChk = common.isNull(checkData);
    valid.typeChk = common.typeSetCheck(checkData,setType);

    return validResult(valid) ? {result:true} : {result:false, msg:'내용 입력을 확인해주세요'};
};

/**
 * 링크 입력형식검사
 * @param {String} checkData 체크할 데이터
 * @return {object} 성공 실패결과를 result로 실패시는 msg를 추가하여 리턴
 */
exports.linkValid = (checkData)=>{
    let valid = {};
    const setType = 'String';

    if(common.isNull(checkData)){
        valid.linkChk = common.urlPatternCheck(checkData);
    }

    return validResult(valid) ? {result:true} : {result:false, msg:'링크의 형식을 확인해주세요'};
};

/**
 * 날짜 입력형식검사
 * 'hhhh-mm-dd'형식에 일치하는지를 판정
 * @param {String} checkData 체크할 데이터
 * @return {object} 성공 실패결과를 result로 실패시는 msg를 추가하여 리턴
 */
exports.dateValid = (checkData)=>{
    let valid = {};

    if(common.isNull(checkData)){
        valid.dateChk = common.datePatternCheck(checkData);
    }

    return validResult(valid) ? {result:true} : {result:false, msg:'날짜 형식을 확인해주세요'};
};

/**
 * 이미지형식검사
 * base64형식에 일치하는지를 판정
 * @param {String} checkData 체크할 데이터
 * @return {object} 성공 실패결과를 result로 실패시는 msg를 추가하여 리턴
 */
exports.imgValid = (checkData)=>{
    let valid = {};

    if(common.isNull(checkData)){
        valid.imgChk = common.base64PatternCheck(checkData);
    }

    return validResult(valid) ? {result:true} : {result:false, msg:'이미지 형식을 확인해주세요'};
};