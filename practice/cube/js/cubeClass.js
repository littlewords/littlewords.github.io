var CubeClass = function(cube3d, context){
    if(!(this instanceof CubeClass)){
        new CubeClass;
        return;
    }
    // 平行光照向量  向左
    this.light = [-sin(45),0,sin(45)]
    this.dis = 1000;
    this.cube3d = cube3d;
    this.cube2d = [];
    this.context = context;
    // 三角网格次序
    this.triangleGrid = [
        [0,3,2],
        [0,1,3],
        [1,7,3],
        [1,5,7],
        [5,6,7],
        [5,4,6],
        [4,2,6],
        [4,0,2],
        [4,5,0],
        [5,1,0],
        [2,3,6],
        [3,7,6]
    ]
}
CubeClass.prototype.eraseCube = function(){

}
CubeClass.prototype.translation = function(vector){
    // console.log(this.cube3d);
    for(var i=0;i<8;i++){
        this.cube3d[i] = translation(this.cube3d[i], vector);
    }
    // console.log(this.cube3d);
}
CubeClass.prototype.translateTo2d = function(){
    for(var i=0;i<8;i++){
        this.cube2d[i] = translateTo2d(this.cube3d[i], this.dis);
    }
}
CubeClass.prototype.rotate = function (vector, θ) {
    for(var i = 0;i<8;i++){
        this.cube3d[i] = dotProduct (this.cube3d[i], R3d(vector, θ));
    }
}
CubeClass.prototype.lineto = function (point) {
    this.context.lineTo(point[0],point[1]);
}
CubeClass.prototype.moveCenter = function () {
    for(var i=0;i<8;i++){
        this.cube2d[i] = dotProduct2d(this.cube2d[i],mirro2d([0,1]));
        this.cube2d[i][1] +=200;
        this.cube2d[i][0] += 200;
    }
}
// 绘制立方体
CubeClass.prototype.paintCube = function(){
    var cube2d;

    this.translateTo2d();
    this.moveCenter();
    cube2d = this.cube2d;
    
    for(var i=0; i<this.triangleGrid.length; i++){
        // 检查可见性
        if(this.checkSee(this.triangleGrid[i])){
            // 渲染三角形
            this.paintTriangle(this.triangleGrid[i]);
        }
    } 
}
// 绘制三角形
CubeClass.prototype.paintTriangle = function (triangle) {
    var cube2d;

    this.translateTo2d();
    this.moveCenter();
    cube2d = this.cube2d;

    this.context.beginPath();
    this.context.moveTo(cube2d[ triangle[0] ][0],cube2d[ triangle[0] ][1]);
    this.lineto(cube2d[ triangle[1] ]);
    this.lineto(cube2d[ triangle[2] ]);
    this.context.closePath();
    // 镜面反射分量
    var rmm = this.mirrorV(triangle);
    // console.log(rmm[2])
    var color;
    if(rmm[2]>0){
        color = 0;
    }else{
        color = -255*rmm[2];
    }
    var rgb = Math.round(color).toString(16);
    // console.log(color);
    console.log('#'+rgb+rgb+rgb);
    this.context.fillStyle = '#'+rgb+rgb+rgb;
    this.context.fill();
    // this.context.strokeStyle = '#'+rgb+rgb+rgb;
    // this.context.stroke();
}
// 检查可见 
CubeClass.prototype.checkSee = function (triangle) {
    var p1 = this.cube3d[triangle[0]];
    var p2 = this.cube3d[triangle[1]];
    var p3 = this.cube3d[triangle[2]];
    // 计算法向量
    var n = xProduct3d(vectorMinus(p2,p1),vectorMinus(p3,p2));
    var eyeV = vectorMinus(p1,[0,0,this.dis]);

    if(xVProduct3d(n,eyeV)<0){
        return true;
    }else{
        return false;
    }
}
// 计算镜面反射分量 
CubeClass.prototype.mirrorV = function (triangle) {
    // 法向量
    // console.log(triangle);
    var n = this.sN(triangle);
    var l = this.light;
    // r = 2(n·l)n-l
    var nl = xVProduct3d(n,l);
    var nl2 = 2*nl;
    console.log(n)
    console.log(l)
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
CubeClass.prototype.vectorN = function (triangle) {
    var p1 = this.cube3d[triangle[0]];
    var p2 = this.cube3d[triangle[1]];
    var p3 = this.cube3d[triangle[2]];
    var n = xProduct3d(vectorMinus(p2,p1),vectorMinus(p3,p2));
    return n;
}
// 计算单位法向量
CubeClass.prototype.sN = function (triangle) {
    var n = this.vectorN(triangle);
    var n2 = (n[0]*n[0]) + (n[1]*n[1]) + (n[2]*n[2]);
    n_abs = Math.sqrt(n2);
    return [n[0]/n_abs, n[1]/n_abs, n[2]/n_abs];
}
// 获取重心
CubeClass.prototype.G = function(){
    var x=0,y=0,z=0;
    
    for(var i=0;i<8;i++){
        x += this.cube3d[i][0];
        // console.log(x)
        y += this.cube3d[i][1];
        z += this.cube3d[i][2];
    }
    // console.log('--------------x--------------')
    // console.log(x)
    return [x/8,y/8,z/8];
}