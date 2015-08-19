var context;
var canvas;
var cute2d = [];
window.onload = function(){
    canvas = document.getElementById('camera');
    context = canvas.getContext('2d');
    var cubeIn = new CubeClass(cute3d,context);
    // var block = new BlockClass(context);
    // block.paint();
    // setInterval(function(){
    //     canvas.width = 400;
    //     block.moveDown();
    // },1000);
    // document.onkeydown = function(e){
    //     canvas.width = 400;
    //     var keyMap = {
    //         right:39,
    //         left:37,
    //         down:40,
    //         change:38
    //     }
    //     var keyMap2 = {
    //         roUp:87,
    //         roLeft:65,
    //         roRight:68,
    //         roDown:83
    //     }
    //     var event = e || window.event;
    //     // alert(e.keyCode);
    //     switch(e.keyCode){
    //         case keyMap2.roUp:
    //             block.rotato([1,0,0]);
    //             break;
    //         case keyMap2.roLeft:
    //             block.rotato([0,1,0]);
    //             break;
    //         case keyMap2.roRight:
    //             block.rotato([0,1,0]);
    //             break;
    //         case keyMap2.roDown:
    //             block.rotato([1,0,0]);
    //             break;
    //         case keyMap.left:
    //             block.moveLeft();
    //             break;
    //         case keyMap.right:

    //             block.moveRight();
    //             break;
    //         case keyMap.change:
    //             block.rotato([0,0,1]);
    //             break;
    //         default:
    //             block.moveDown();
    //             break;
    //     }
    // }



    // 每次旋转10度
    setInterval(function(){
        // 旋转10度
        cubeIn.rotate([sin(45), sin(45), 0], 1);
        // cubeIn.rotate([1, 0, 0], 1);
        // 平移1像素
        // cubeIn.translation([0, -10, 0]);
        canvas.width = 400;
        cubeIn.paintCube();
    },10)

}
var cute3d = [
    [-100,100,0],
    [100,100,0],
    [-100,-100,0],
    [100,-100,0],
    [-100,100,100],
    [100,100,100],
    [-100,-100,100],
    [100,-100,100]
];

// var cute3d = [
//     [-10,10,-10],
//     [10,10,-10],
//     [-10,-10,-10],
//     [10,-10,-10],
//     [-10,10,10],
//     [10,10,10],
//     [-10,-10,10],
//     [10,-10,10]
// ];
