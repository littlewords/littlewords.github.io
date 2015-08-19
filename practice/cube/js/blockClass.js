var BlockClass = function(context){
	var cube1 = [
		[-20,200,-11],
		[0,200,-11],
		[-20,180,-11],
		[0,180,-11],
		[-20,200,100],
		[0,200,100],
		[-20,180,100],
		[0,180,100]
	];
	var cube2 = [
		[0,200,-11],
		[20,200,-11],
		[0,180,-11],
		[20,180,-11],
		[0,200,100],
		[20,200,100],
		[0,180,100],
		[20,180,100]
	];
	var cube3 = [
		[20,200,-11],
		[40,200,-11],
		[20,180,-11],
		[40,180,-11],
		[20,200,100],
		[40,200,100],
		[20,180,100],
		[40,180,100]
	];
	var cube4 = [
		[-20,180,-11],
		[0,180,-11],
		[-20,160,-11],
		[0,160,-11],
		[-20,180,100],
		[0,180,100],
		[-20,160,100],
		[0,160,100]
	];
	var cube5 = [
		[0,180,-11],
		[20,180,-11],
		[0,160,-11],
		[20,160,-11],
		[0,180,100],
		[20,180,100],
		[0,160,100],
		[20,160,100]
	];
	var cube6 = [
		[20,180,-11],
		[40,180,-11],
		[20,160,-11],
		[40,160,-11],
		[20,180,100],
		[40,180,100],
		[20,160,100],
		[40,160,100]
	];
	var cube7 = [
		[-20,160,-11],
		[0,160,-11],
		[-20,140,-11],
		[0,140,-11],
		[-20,160,100],
		[0,160,100],
		[-20,140,100],
		[0,140,100]
	];
	var cube8 = [
		[0,160,-11],
		[20,160,-11],
		[0,140,-11],
		[20,140,-11],
		[0,160,100],
		[20,160,100],
		[0,140,100],
		[20,140,100]
	];
	var cube9 = [
		[20,160,-11],
		[40,160,-11],
		[20,140,-11],
		[40,140,-11],
		[20,160,100],
		[40,160,100],
		[20,140,100],
		[40,140,100]
	];
	var cube100 = [
		[-20,140,-11],
		[0,140,-11],
		[-20,120,-11],
		[0,120,-11],
		[-20,140,100],
		[0,140,100],
		[-20,120,100],
		[0,120,100]
	];
	var cube11 = [
		[0,140,-11],
		[20,140,-11],
		[0,120,-11],
		[20,120,-11],
		[0,140,100],
		[20,140,100],
		[0,120,100],
		[20,120,100]
	];
	var cube12 = [
		[20,140,-11],
		[40,140,-11],
		[20,120,-11],
		[40,120,-11],
		[20,140,100],
		[40,140,100],
		[20,120,100],
		[40,120,100]
	];
	var oCube1 = new CubeClass(cube1,context);
	var oCube2 = new CubeClass(cube2,context);
	var oCube3 = new CubeClass(cube3,context);
	var oCube4 = new CubeClass(cube4,context);
	var oCube5 = new CubeClass(cube5,context);
	var oCube6 = new CubeClass(cube6,context);
	var oCube7 = new CubeClass(cube7,context);
	var oCube8 = new CubeClass(cube8,context);
	var oCube9 = new CubeClass(cube9,context);
	var oCube100 = new CubeClass(cube100,context);
	var oCube11 = new CubeClass(cube11,context);
	var oCube12 = new CubeClass(cube12,context);


	this.block = [];
	var rand = Math.round(Math.random()*4);
	switch(rand){
		// L
		case 0:
			this.block.push(oCube1);
			this.block.push(oCube4);
			this.block.push(oCube7);
			this.block.push(oCube8);
			break;
		// N
		case 1:
			this.block.push(oCube2);
			this.block.push(oCube5);
			this.block.push(oCube4);
			this.block.push(oCube7);
			break;
		// T
		case 2:
			this.block.push(oCube1);
			this.block.push(oCube2);
			this.block.push(oCube3);
			this.block.push(oCube5);
			break;
		// O
		case 3:
			this.block.push(oCube1);
			this.block.push(oCube2);
			this.block.push(oCube4);
			this.block.push(oCube5);
			break;
		default:
			this.block.push(oCube1);
			this.block.push(oCube4);
			this.block.push(oCube7);
			this.block.push(oCube100);
			break;
	}
	this.context = context;
}
BlockClass.prototype.paint = function () {
	for(var i=0;i<4;i++){
		this.block[i].paintCube();
	}
}
BlockClass.prototype.moveDown = function () {
	for(var i=0;i<4;i++){
		this.block[i].translation([0,-20,0]);
	}
	this.paint();
}
BlockClass.prototype.moveLeft = function () {
	for(var i=0;i<4;i++){
		this.block[i].translation([-20,0,0]);
	}
	this.paint();
}
BlockClass.prototype.moveRight = function () {
	for(var i=0;i<4;i++){
		this.block[i].translation([20,0,0]);
	}
	this.paint();
}
BlockClass.prototype.change = function () {
	for(var i=0;i<4;i++){
		this.block[i].translation([0,20,0]);
	}
	this.paint();
}
BlockClass.prototype.G = function () {
	var x=0,y=0,z=0;
	for(var i=0;i<4;i++){
		x+=this.block[i].G()[0];
		y+=this.block[i].G()[1];
		z+=this.block[i].G()[2];
	}
	return [x/4, y/4, z/4];
}
BlockClass.prototype.rotato = function (vector) {
	// console.log('-------------vector-----------')
	// console.log(vector);
	console.log('-------------G-----------')
	var g = this.G();
	for(var i=0;i<4;i++){
		this.block[i].translation([
			-g[0],
			-g[1],
			-g[2]
		]);
	}
	for(var i=0;i<4;i++){
		this.block[i].rotate(vector,90);
	}
	for(var i=0;i<4;i++){
		this.block[i].translation(g);
	}
}

