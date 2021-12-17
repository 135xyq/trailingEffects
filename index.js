canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let arrList = [];

const context = canvas.getContext("2d");

canvas.addEventListener('mousemove', e => {
    arrList.push(new Circle(e.clientX, e.clientY))
})

function Circle(x, y) {
    this.x = x;
    this.y = y;

    // - 创建一个随机的速度值
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;

    // 颜色
    this.color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    console.log(this.color)

    // 透明度
    this.a = 1;
}

Circle.prototype = {
    // 画圆
    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.globalAlpha = this.a;
        context.globalCompositeOperation = 'lighter'
        context.arc(this.x, this.y, 30, 0, Math.PI * 2);
        context.fill()
        this.update();
    },
    // 运动
    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.a *= 0.98;
    }
}

//- 渲染函数

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    arrList.forEach((circleData, index) => {
        circleData.draw();
        if (circleData.a < 0.05) {
            arrList.splice(index, 1)
        }
    })
    requestAnimationFrame(render);
}

render();