//Preparing canvas
const canvas = document.querySelector("#ui-layer");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

//utiliy functions
function isArray(object) {
    return Object.prototype.toString.call(object) == "[object Array]";
}

function isNumber(object) {
    return typeof object == "number";
}

function random(min, max) {
    if (isArray(min)) return min[~~(Math.random() * min.length)];
    if (!isNumber(max)) (max = min || 1), (min = 0);
    return min + Math.random() * (max - min);
}

//Circle class for circle objects
class Circle {
    constructor(x, y, radius) {
        this.alive = true;

        this.radius = radius;
        this.wander = 0.15;
        this.theta = random(2 * Math.PI);
        this.drag = 0.92;
        this.color = "#092140";

        this.x = x || 0.0;
        this.y = y || 0.0;

        this.vx = 0.0;
        this.vy = 0.0;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= this.drag;
        this.vy *= this.drag;

        this.theta += random(-0.5, 0.5) * this.wander;
        this.vx += Math.sin(this.theta) * 0.1;
        this.vy += Math.cos(this.theta) * 0.1;

        this.radius *= 0.95;
        this.alive = this.radius > 0.5;
        this.draw();
    }
}

window.addEventListener("mousemove", function(event) {
    if (event.target.classList[0] !== "fab"
        && event.target.id !== "social"
        && event.target.classList[0] !== "buttons-ul"
        && event.target.classList[0] !== "resume-li"
        && event.target.classList[0] !== "portf-btn") {
        init(event.x, event.y, 40);
    }
});

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let circles = []

// const COLORS = ["#004B8D", "#0074D9", "#4192D9", "#7ABAF2", "#D40D12", "#FF1D23"];

// const COLORS = [
//   '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', // Blue 50->900
//   '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00' // Amber 50->900
// ];

const COLORS = [
  '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', // Blue 50->900
  '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#CC3B58', '#C93A29', '#FF3932', '#ED2938', '#C03A4C' // Amber 50->900
];


function init(x, y, maxRadius) {
    let circle, theta, force;

    circle = new Circle(x, y, random(12, maxRadius));
    circle.wander = random(0.5, 2.0);
    circle.drag = random(0.9, 0.99);
    theta = random(2 * Math.PI);
    force = random(2, 8);
    circle.vx = Math.sin(theta) * force;
    circle.vy = Math.cos(theta) * force;
    circle.color = random(COLORS);
    circles.push(circle);
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    let temp = [];
    for(let i = 0; i<circles.length; i++){
        if(circles[i].alive) temp.push(circles[i]);
    }
    circles = temp;
    for(let i = circles.length-1; i >= 0;i--) {
        circles[i].move();
    }
}

animate();
