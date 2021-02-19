video = "";
status = "";
var filter_selected = "Normal";
var volume_value = 0;
objects = [];

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(450, 450);
    canvas.parent('canvas_holder');
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

document.getElementById('volume_inp').oninput = ()=>{
    volume_value = document.getElementById('volume_inp').value / 100;
    video.volume(volume_value);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Detecting objects..."
}
document.getElementById('filter_group').oninput = () => {
    filter_selected = document.getElementById('filter_group').value;
    console.log(filter_selected);
}
function modelLoaded() {
    console.log('Model Initialized');
    status = true;
    video.loop();
    video.volume(volume_value);
    video.speed(1);
}
function draw() {
    image(video, 0, 0, 450, 450)
    if (filter_selected == "Normal") {
    } else if (filter_selected == "GRAY") {
        filter(GRAY);
    } else if (filter_selected == "THRESHOLD") {
        filter(THRESHOLD);
    } else if (filter_selected == "OPAQUE") {
        filter(OPAQUE);
    } else if (filter_selected == "INVERT") {
        filter(INVERT);
    } else if (filter_selected == "POSTERIZE") {
        filter(POSTERIZE);
    } else if (filter_selected == "BLUR") {
        filter(BLUR);
    } else if (filter_selected == "ERODE") {
        filter(ERODE);
    } else if (filter_selected == "DILATE") {
        filter(DILATE);
    }
    if (status != "") {
        objectDetector.detect(video, gotResults)
        var objectLength = objects.length;
        for (let i = 0; i < objectLength; i++) {
            document.getElementById('objs_count').innerHTML = objectLength;
            document.getElementById('status').innerHTML = "Objects Detected";
            fill('coral');
            var txt = objects[i].label;
            text(txt, objects[i].x + 10, objects[i].y +10);
            noFill();
            stroke('coral')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            strokeWeight(2)
            rect(objects[i].x+10, objects[i].y+18, 100, 20, 20)
            var accuracy = floor(objects[i].confidence * 100);
            rect(objects[i].x+10, objects[i].y+18, 100, 20, 20)
            fill('coral')
            rect(objects[i].x+10, objects[i].y+18, accuracy, 20, 20, 0, 0, 20)
            fill('#fff')
            text(String(accuracy)+'%', objects[i].x+20, objects[i].y+28)
        }
    }
}

