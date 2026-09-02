 function snowFall(t) {
    t = t || {};
    this.maxFlake = Math.floor((window.innerWidth + window.innerHeight) / 5)*0.2;
    this.flakeSize = t.flakeSize || 5;
    this.fallSpeed = (t.fallSpeed || 1);
    this.lineWidth = t.lineWidth || 0.5;
    this.windForce = t.windForce || -0.01; // 风力大小
    this.windDirection = t.windDirection || Math.PI / 180 * 45;
}

function snowCanvas() {
    var canvas = document.createElement("canvas");
    canvas.id = "snowfall";
    canvas.width = window.innerWidth*2; // 设置画布宽度为窗口宽度的两倍
    canvas.height = window.innerHeight;
    canvas.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: 1; pointer-events: none;");
    document.getElementsByTagName("body")[0].appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    window.onresize = function () {
        canvas.width = window.innerWidth*2; // 在窗口大小变化时，更新画布宽度为窗口宽度的两倍
        canvas.height = window.innerHeight;
    };
}

function flakeMove(t, e, i, a, windForce, windDirection) {
    this.x = Math.floor(Math.random() * t);
    this.y = Math.floor(Math.random() * e);
    this.size = Math.random() * i + 2;
    this.maxSize = i;
    this.speed = Math.random() + a;
    this.fallSpeed = a;
    this.velY = this.speed;
    this.velX = 0;
    this.stepSize = Math.random() / 30;
    this.step = 0;
    this.windForce = windForce;
    this.windDirection = windDirection;
}

flakeMove.prototype.update = function () {
    this.velX += Math.cos(this.windDirection) * this.windForce;
    this.velX *= 0.98;
    this.velY <= this.speed && (this.velY = this.speed);
    // this.velX += Math.cos(this.step += 0.05) * this.stepSize; // 雪花个体的左右摆动
    // this.velX += Math.cos(this.step*Math.random()*this.windForce) * this.stepSize;
    this.y += this.velY;
    this.x += this.velX;

    if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
        this.reset(canvas.width, canvas.height);
    }
};

flakeMove.prototype.reset = function (t, e) {
    this.x = Math.floor(Math.random() * t);
    this.y = 0;
    this.size = Math.random() * this.maxSize + 2;
    this.speed = Math.random() + this.fallSpeed;
    this.velY = this.speed;
    this.velX = 0;
};

flakeMove.prototype.render=function(t){var e=t.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size);e.addColorStop(0,"rgba(255, 255, 255, 0.9)"),e.addColorStop(.5,"rgba(255, 255, 255, 0.5)"),e.addColorStop(1,"rgba(255, 255, 255, 0)"),t.save(),t.fillStyle=e,t.beginPath(),t.arc(this.x,this.y,this.size,0,2*Math.PI),t.fill(),t.restore()}

function createFlakes() {
    for (var t = this.maxFlake, e = this.flakes = [], i = this.canvas, a = 0; a < t; a++) {
        e.push(new flakeMove(i.width, i.height, this.flakeSize, this.fallSpeed, this.windForce, this.windDirection));
    }
}

function drawSnow() {
    var t = this.maxFlake, e = this.flakes;
    ctx = this.ctx, canvas = this.canvas, that = this;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = this.lineWidth;

    for (var i = 0; i < t; i++) {
        e[i].update();
        e[i].render(ctx);
    }

    this.loop = requestAnimationFrame(function () {
        drawSnow.apply(that);
    });
}

snowFall.prototype.start = function () {
    snowCanvas.call(this);
    createFlakes.call(this);
    drawSnow.call(this);
};

// 在这调整参数
var snow = new snowFall({
    flakeSize: 7,
    fallSpeed: 0.5,
    lineWidth: 0.5,
    windForce: -0.015,
    windDirection: Math.PI / 180 * 45
});

snow.start();