
function max(dataArr){
    return dataArr.reduce((acc, cur) => acc > cur ? acc : cur);
}

function min(dataArr){
    return dataArr.reduce((acc, cur) => acc < cur ? acc : cur);
}

//param：求数组中对象指定属性值的和
function sum(numArr, param){
    return numArr.reduce((accu, cur) => {
        if(param) {
            return accu + cur[param];
        }else{
            return accu + cur;
        }
    }, 0);
}

function average(dataArr, param){
    return sum(dataArr, param) / dataArr.length;
}

//对数组元素根据指定条件进行计数
function countByParam(numberArr, param){
    return numberArr.reduce((accum, cur) => {
        accum[cur[param]] ? accum[cur[param]]++ : accum[cur[param]] = 1;
        return accum;
    }, {});
}

module.exports = {
    max,
    min,
    sum,
    average,
    countByParam
};