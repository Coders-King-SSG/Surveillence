video = "";
status = null;

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(450, 450);
    canvas.parent('canvas_holder');
}

function draw() {
    image(video, 0, 0, 450, 450)
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Detecting objects..."
}

function modelLoaded() {
    console.log('Model Initialized');
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}