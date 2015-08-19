// 3d绕轴旋转矩阵函数
var R3d = function (vector,θ) {
    var n_x = vector[0],
        n_y = vector[1],
        n_z = vector[2],
        arr = [[],[],[]];
    arr[0][0] = n_x*n_x*(1-cos(θ)) + cos(θ);
    arr[0][1] = n_y*n_x*(1-cos(θ)) - n_z*sin(θ);
    arr[0][2] = n_z*n_x*(1-cos(θ)) + n_y*sin(θ);

    arr[1][0] = n_x*n_y*(1-cos(θ)) + n_z*sin(θ);
    arr[1][1] = n_y*n_y*(1-cos(θ)) + cos(θ);
    arr[1][2] = n_z*n_y*(1-cos(θ)) - n_x*sin(θ);

    arr[2][0] = n_x*n_z*(1-cos(θ)) - n_y*sin(θ);
    arr[2][1] = n_y*n_z*(1-cos(θ)) + n_x*sin(θ);
    arr[2][2] = n_z*n_z*(1-cos(θ)) + cos(θ);

    return arr;
}
// 世界坐标系像摄影坐标系转换
var translateTo2d = function (vector, dis) {
    var w = (vector[2]-dis)/dis;
    w = Math.abs(w);
    var arr = [];
    arr[0] = vector[0]/w;
    arr[1] = vector[1]/w;
    return arr;
}
// 2d镜像变换
var mirro2d = function(vector2d){
    var n_x = vector2d[0],
        n_y = vector2d[1],
        arr = [[],[]];
    arr[0][0] = 1 - (2*n_x*n_x);
    arr[0][1] = 0 - (2*n_x*n_y);

    arr[1][0] = 0 - (2*n_x*n_y);
    arr[1][1] = 1 - (2*n_y*n_y);
    return arr;
}
// 平移
var translation = function (point, vector) {
    // console.log('---------------------point--------------------------');
    // console.log(point);
    // console.log('---------------------vector--------------------------');
    // console.log(vector);
    if (point.length === vector.length) {
        for(var i=0; i<point.length; i++){
            point[i] += vector[i];
        }
        return point;
    } else {
        console.log('平移向量与平移点维度不同');
    }
}
// 向量函数
var vector = function (x, y, z) {
    return [x, y, z];
}
// 3d点乘
var dotProduct = function (vector,matrix) {
    var temp = [];
    temp[0] = vector[0]*matrix[0][0] + vector[1]*matrix[1][0] + vector[2]*matrix[2][0];
    temp[1] = vector[0]*matrix[0][1] + vector[1]*matrix[1][1] + vector[2]*matrix[2][1];
    temp[2] = vector[0]*matrix[0][2] + vector[1]*matrix[1][2] + vector[2]*matrix[2][2];
    return temp;
}
// 2d点乘
var dotProduct2d = function (vector2d,matrix2d){
    var temp = [];
    temp[0] = vector2d[0]*matrix2d[0][0] + vector2d[1]*matrix2d[1][0];
    temp[1] = vector2d[0]*matrix2d[0][1] + vector2d[1]*matrix2d[1][1];
    return temp;
}
// 3d 叉乘
var xProduct3d = function (vector1, vector2) {
    var temp = [];
    temp[0] = (vector1[1] * vector2[2]) - (vector1[2] * vector2[1]);
    temp[1] = (vector1[2] * vector2[0]) - (vector1[0] * vector2[2]);
    temp[2] = (vector1[0] * vector2[1]) - (vector1[1] * vector2[0]);

    return temp;
}
// 3d点乘向量 
var xVProduct3d = function (vector1, vector2) {
    return vector1[0]*vector2[0] + vector1[1]*vector2[1] + vector1[2]*vector2[2];
}
// 向量减法
var vectorMinus = function (vector1, vector2) {
    var temp = [];
    temp[0] = vector1[0] - vector2[0];
    temp[1] = vector1[1] - vector2[1];
    temp[2] = vector1[2] - vector2[2];

    return temp;
}
// 余弦角度制函数
// 
var cos = function (θ) {
    if (Math.abs(θ)%180 === 90) {
        return 0;
    }
    return Math.cos(θ*Math.PI/180);
}
// 正弦角度制函数
var sin = function (θ) {
    return Math.sin(θ*Math.PI/180);
}