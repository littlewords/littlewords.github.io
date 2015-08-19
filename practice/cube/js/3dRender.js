// 世界坐标系像摄影坐标系转换
var translateTo2d = function (vector, dis) {
    var w = (vector[2]-dis)/dis;
    w = Math.abs(w);
    var arr = [];
    arr[0] = vector[0]/w;
    arr[1] = vector[1]/w;
    return arr;
}
var translateToCenter = function(vector2d){

}
var dis = -1200;