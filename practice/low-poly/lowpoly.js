window.onload = function () {
    var canvas = document.getElementById('low_poly');
    var context = canvas.getContext('2d');
    var l = new LowPoly(config_data, context);
    setInterval(function(){
        canvas.width = 1000;
        // l.randMap();
        // l.light
        l.rotate([0,1,0],2)
        l.rendTriangle();
    },100)
}
// test example
var config_data = {
    width:1000,
    height:400,
    row:25,
    col:10,
    light:[0,cos(180),sin(180)]
}
function LowPoly (objConfig,context) {
    this.light = objConfig.light;
    this.context = context;
    this.row = objConfig.row || 20;
    this.col = objConfig.col || 20;
    this.width = objConfig.width || 400;
    this.height = objConfig.height || 400;
    this.pointMap = Array(this.row);
    for(var i=0;i<this.row;i++){
        this.pointMap[i] = Array(this.col);
    }
    this.init();
}
LowPoly.prototype.init = function () {
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    this.randMap();
    this.rendTriangle();
}
LowPoly.prototype.randMap = function () {
    var ceilx = this.width/this.row;
    var ceily = this.height/this.col;
    var arrRow = [];
    var arrCol = [];

    var tempx,tempy,tempz;
    var randx,randy,randz;

    for (var i=0;i<this.row;i++) {
        for (var j=0;j<this.col;j++) {
            tempx = (i*ceilx) - (this.width/2);
            tempy = (this.height/2) - (j*ceily);
            tempz = 0;
            if(i!==0 && j!==0 && i!==this.row-1 && j!==this.col-1){
                randx = (Math.random()-0.5);
                randy = (Math.random()-0.5);
                tempx = randx*ceilx + tempx;
                tempy = randy*ceily + tempy;
                randz = (Math.random()-0.5);
                tempz = randz;
            }
            this.pointMap[i][j] = [tempx, tempy, tempz];
        }
    }
}
LowPoly.prototype.rendTriangle = function () {
    var map = this.pointMap;
    // console.log(map)
    var p1,p2,p3;
    for(var i=0;i<this.row-1;i++){
        for(var j=0;j<this.col-1;j++){
            p1 = map[i][j];
            p2 = map[i+1][j+1];
            p3 = map[i][j+1];
            this.paintTriangle([p1,p2,p3]);
            p1 = map[i][j];
            p2 = map[i+1][j];
            p3 = map[i+1][j+1];
            this.paintTriangle([p1,p2,p3]);
        }
    }
}
LowPoly.prototype.paintTriangle = function (triangle) {
    // console.log(triangle);
    var t2d = [];
    t2d[0] = translateTo2d(triangle[0],-1000);
    t2d[1] = translateTo2d(triangle[1],-1000);
    t2d[2] = translateTo2d(triangle[2],-1000);
    t2d = this.moveToCenter(t2d);
    // 镜面反射分量
    var rmm = this.mirrorV(triangle);
    // console.log(rmm[2])
    var color;
    if(rmm[2]>0){
        color = 0;
    }else{
        color = -255*rmm[2];
    }

    var r = Math.round(color*0x42).toString(16);
    var g = Math.round(color*0x42).toString(16);
    var b = Math.round(color*0x6f).toString(16);
    var rgb = Math.round(color).toString(16);

    // console.log(color);
    // console.log('#'+r+g+b);
    
    this.context.beginPath();
    this.context.moveTo(t2d[0][0],t2d[0][1]);
    this.context.lineTo(t2d[1][0],t2d[1][1]);
    this.context.lineTo(t2d[2][0],t2d[2][1]);
    this.context.closePath();

    this.context.fillStyle = '#'+r+g+b;
    this.context.strokeStyle = '#'+r+g+b;
    this.context.fill();
    this.context.stroke();
}
LowPoly.prototype.moveToCenter = function (t2d) {
    for(var i=0;i<3;i++){
        t2d[i] = dotProduct2d(t2d[i],mirro2d([0,1]));
        t2d[i][1] +=200;
        t2d[i][0] += 500;
    }
    return t2d;
}
// 计算镜面反射分量 
LowPoly.prototype.mirrorV = function (triangle) {
    // 法向量
    // console.log(triangle);
    var n = this.sN(triangle);
    var l = this.light;
    // r = 2(n·l)n-l
    var nl = xVProduct3d(n,l);
    var nl2 = 2*nl;
    // console.log(n)
    // console.log(l)
    var nl2n = [
        n[0]*nl2,
        n[1]*nl2,
        n[2]*nl2
    ];
    var r = [
        nl2n[0] - l[0],
        nl2n[1] - l[1],
        nl2n[2] - l[2]
    ];
    var rm =  xVProduct3d(r,[0,0,-1]);

    var rmm = [0,0,-rm];
    // console.log(rmm);
    return rmm;
}
// 计算法向量
LowPoly.prototype.vectorN = function (triangle) {
    var p1 = triangle[0];
    var p2 = triangle[1];
    var p3 = triangle[2];
    var n = xProduct3d(vectorMinus(p2,p1),vectorMinus(p3,p2));
    return n;
}
// 计算单位法向量
LowPoly.prototype.sN = function (triangle) {
    var n = this.vectorN(triangle);
    var n2 = (n[0]*n[0]) + (n[1]*n[1]) + (n[2]*n[2]);
    n_abs = Math.sqrt(n2);
    return [n[0]/n_abs, n[1]/n_abs, n[2]/n_abs];
}
LowPoly.prototype.rotate = function (vector, θ) {
    for (var i=0;i<this.row;i++) {
        for (var j=0;j<this.col;j++) {
            this.pointMap[i][j] = dotProduct (this.pointMap[i][j], R3d(vector, θ));
            // this.pointMap[i][j] = [tempx, tempy, tempz];
        }
    }
}
LowPoly.prototype.selfRotate = function (vector, θ) {
    var ceilx = this.width/this.row;
    var ceily = this.height/this.col;
    var tempx,tempy,tempz=0;
    for (var i=0;i<this.row;i++) {
        for (var j=0;j<this.col;j++) {
            if(i!==0 && j!==0 && i!==this.row-1 && j!==this.col-1){
                tempx = (i*ceilx) - (this.width/2);
                tempy = (this.height/2) - (j*ceily);
                vectorR = vectorMinus(this.pointMap[i][j], [tempx,tempy,tempz]);
                vectorR = dotProduct (vectorR, R3d(vector, θ));
                tempx += vectorR[0];
                tempy += vectorR[1];
                tempz += vectorR[2];
                this.pointMap[i][j] = [tempx, tempy, tempz];
                console.log(this.pointMap[i][j])
            }
        }
    }
}
