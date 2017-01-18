var environment;
var CANVAS_WIDTH = 1400;
var CANVAS_HEIGHT = 800;
var selection;
var wind;
var flowField;

var INITIAL_POPULATION = 50;
var FLOW_FIELD_RESOLUTION = 20;

var randomTarget;
var centerVector;
var debug = false;
var separation = false;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    environment = new Environment(CANVAS_WIDTH, CANVAS_HEIGHT);
    environment.createNewPopulation(INITIAL_POPULATION);
    environment.wrapEdges();

    selection = 0;
    centerVector = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    flowField = new FlowField(CANVAS_WIDTH, CANVAS_HEIGHT, FLOW_FIELD_RESOLUTION);
}

function draw() {
    background(255);

    switch (selection) {
        case 0:
            environment.randomize();
            break;
        case 1:
            environment.applyForce(wind);
            if (debug) {
                environment.drawForce(wind);
            }
            break;
        case 2:
            var currPos = createVector(mouseX, mouseY);
            var v = currPos.sub(centerVector);
            v.setMag(2);
            environment.applyForce(v);
            if (debug) {
                environment.drawForce(v);
            }
            break;
        case 3:
            environment.applyFlowField(flowField);
            
            // TODO: Flow field drawing needs debug.
            /*
            if (debug) {
                flowField.display();
            }
            */
            break;
        case 4:
            environment.seekTarget(randomTarget);
            if (debug) {
                fill(90, 33, 128);
                ellipse(randomTarget.x, randomTarget.y, 30, 30);
            }
            break;
        case 5:
            var mousePos = createVector(mouseX, mouseY);
            environment.blob(mousePos);
            break;
        case 6:
            environment.flock();
            break;
    }
    
    if (separation) {
        environment.separate();
    }
    console.log(5);
    environment.applyEdges();
    environment.update();
    resetGraphics();
    environment.display();
}

// WORKING ON EDGES
// Trying to get all possibilities for quick switching with buttons.

function randomizeMovement() {
    environment.edgeType = 1;
    selection = 0;
}

function randomWind() {
    environment.edgeType = 1;
    wind = p5.Vector.random2D();
    selection = 1;
}

function directedWind() {
    environment.edgeType = 1;
    selection = 2;
}

function getFlowField() {
    environment.edgeType = 1;
    console.log("flow");
    selection = 3;
    flowField.randomize();
}

function newTargetPosition() {
    environment.edgeType = 2;
    selection = 4;
    randomTarget = createVector(random(0, width), random(0, height));
}

function changePopulation(popSize) {
    environment.changePopulation(popSize);
}

function seekMouse() {
    selection = 5;
}

function toggleVehicleShape() {
    environment.toggleVehicleShape();
}

function flockVehicles() {
    environment.edgeType = 1;
    selection = 6;
}

function toggleDebug() {
    debug = !debug;
}

function toggleSeparation() {
    separation = !separation;
}

function resetGraphics() {
    strokeWeight(1);
    stroke(1);
    fill(0);
}
