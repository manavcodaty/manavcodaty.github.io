let canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;


// Helper Functions
// Get number in the middle
function mid(){
  const args = Array.from(arguments);
  if(args.length < 3) return args[0] || 0;
  const sorted = args.slice().sort((a,b)=> a - b);
  return sorted[Math.round((sorted.length - 1) / 2)];
}
// Phytagoshananigans theory
const PY = (x,y) => Math.sqrt(Math.pow(Math.abs(x),2) + Math.pow(Math.abs(y),2),2); 
// Fps calculator
const fpsHelper = function(onSecond){
  let lastSec = Date.now();
  let frames = 0;
  let fps = 0;
  return {
    onFrame: ()=>{
      if(((Date.now() - lastSec) / 1000) > 1) {
        lastSec = Date.now();
        fps = frames;
        frames = 0;
        if(onSecond)
        onSecond(fps);
      } else {
        frames += 1;
      }
    },
    getFPS: () => {
      return fps;
    }
  }
}
// Initialization
const mouse = {
  x: W / 2,
  y: H / 2
}
// pading is in percentage
const config = {
  nPoints: 50,
  nLines: 50,
  radius: 100,
  padding: 5,
  showFPS: false,
  showPoints: false,
  maxSpeed: 40,
}
let pointsPerLine = 20;
let linesInScreen = 20;
let lines = [];
let homesX = [];
let homesY = [];
let padding = 40;
let max = 30;
let radius = 200;
let fpsObj = fpsHelper();
let debug = {
  fps: false,
  dots: false,
};

let rAF = null;

// Actual Code 
// Update Line's dots Position
function updateLine(line,homeY){
  let point, desiredX, desiredY, desiredH, desiredForce, desiredAngle, hvx, hvy, mvx, mvy, x, y, homeX, vx, vy;
  let radius = config.radius;
  let maxSpeed = config.maxSpeed;
  for(var j = line.length - 1; j >= 0; j--){
    point = line[j];
    x = point.x;
    y = point.y;
    hvx = 0, hvy = 0;
    // Home forces
    homeX = homesX[j];
    if(x !== homeX || y !== homeY) {
      desiredX = homeX - x;
      desiredY = homeY - y;
      desiredH = PY(desiredX,desiredY);
      desiredForce = Math.max(desiredH * 0.2,1);
      desiredAngle = Math.atan2(desiredY,desiredX);
      hvx = desiredForce * Math.cos(desiredAngle);
      hvy = desiredForce * Math.sin(desiredAngle);
    }
    // Mouse Forces
    mvx = 0, mvy = 0;
    desiredX = x - mouse.x;
    desiredY = y - mouse.y;
    if(!(desiredX > radius || desiredY > radius || desiredY < -radius || desiredX < -radius)) {
    desiredAngle = Math.atan2(desiredY,desiredX);
    desiredH = PY(desiredX,desiredY);
    desiredForce =  Math.max(0,Math.min(radius - desiredH,radius));
    mvx = desiredForce * Math.cos(desiredAngle);
    mvy = desiredForce * Math.sin(desiredAngle);
    }
    // Combine and limit
    vx = Math.round(mid((mvx + hvx) * 0.9, maxSpeed, -maxSpeed));
    vy = Math.round(mid((mvy + hvy) * 0.9, maxSpeed, -maxSpeed));
    
    // Dont let point get too far from home
    
    if(vx != 0) {
      point.x += vx;
    }
    if(vy != 0){
      point.y += vy;
    }
    line[j] = point;
  }
  
  return line;
}
function timer(){
  ctx.clearRect(0,0,W,H);
  if(config.showFPS){
     fpsObj.onFrame();
      ctx.fillStyle = '#282828';
      ctx.textAlign="start"; 
      ctx.textBaseline="top"; 
     ctx.font="50px Helvetica";
     ctx.fillText(fpsObj.getFPS(),50,50);
  }
  let line, xc,yc, cur, curX, curY, next, dot;
  for(var i = lines.length - 1; i >= 0; i--){
    // Update before rendering
    line = updateLine(lines[i],homesY[i]);
    lines[i] = line;
    ctx.beginPath();
    ctx.strokeStyle = '#d2d2d2';
    ctx.moveTo(line[line.length - 1].x,line[line.length - 1].y);
    for(var j = line.length - 2; j > 1; j--){
      cur  = line[j];
      curX = cur.x;
      curY = cur.y;
      next = line[j - 1];
      xc = (curX + next.x) / 2;
      yc = (curY + next.y) / 2;
      // ctx.bezierCurveTo(curX,curY,xc,yc,xc,yc);
      // ctx.bezierCurveTo(xc,yc,xc,yc,next.x,next.y);
      // ctx.bezierCurveTo(curX,curY,curX,curY,next.x,next.y);
      // ctx.bezierCurveTo(curX,curY,curX,curY,xc,yc);
      // ctx.bezierCurveTo(curX,curY,xc,yc,next.x,next.y);
      // ctx.bezierCurveTo(xc,yc,xc,yc,curX,curY);
      ctx.quadraticCurveTo(curX,curY,xc,yc);
      if(i===0){
        // console.log(cur.x, cur.y);
      }
    }
    // ctx.bezierCurveTo(line[j].x,line[j].y, line[j - 1].x, line[j - 1].y, line[j - 1].x, line[j - 1].y);
    ctx.quadraticCurveTo(line[j].x,line[j].y, line[j - 1].x, line[j - 1].y);
    ctx.stroke();
    if(config.showPoints) {
      for(j = line.length - 1; j >= 0; j--){
        dot =  line[j];
        ctx.beginPath();
        ctx.fillStyle ='red';
        ctx.arc(dot.x, dot.y, 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  
    }
  rAF = requestAnimationFrame(timer)
  
}
function point(x,y){
  return {
    x: x,
    y: y,
    hy: y,
    hx: x,
  }
}
function updateX(){
  let line, calcPad;
  if(rAF) {
    cancelAnimationFrame(rAF);
    rAF = null;
  }
  calcPad = (W * config.padding) / 100;
  homesX = [];
  for(var i = config.nLines; i >= 0; i--){
    x = calcPad + (((W - calcPad * 2) / config.nLines) * i);
    homesX.push(x);
  }
  timer();
}
function init(){
  // Cancel if neededs
  if(rAF) {
    cancelAnimationFrame(rAF);
    rAF = null;
  }
  lines = [];
  homesX = [];
  homesY = [];
  let line = [], y = 0, x = 0;
  let calcPad = (W * config.padding) / 100;
  for(var i = config.nLines; i >= 0; i--){
    line = [];
    // Include padding in calculatio
    y = calcPad + (((H - calcPad * 2) / config.nLines) * i);
    homesY.push(y);
    for(var j = config.nPoints; j >= 0; j--){
      let x = Math.round((W / config.nPoints ) * j);
      line.push(point(x,y));
      
      if(i === 0) {
        homesX.push(x);
      }
    }
    if(i == 0){
      // homesY.reverse();
    }
    lines.push(line);
  }
  timer();
}

// Input Handles

const debouncedInit = _.debounce(init, 200)
const debouncedUpdateX = _.debounce(updateX, 200)

// Events
window.addEventListener('mousemove',(e)=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', (e) => {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  init();
});

init();