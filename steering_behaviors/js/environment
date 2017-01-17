var Environment = function(w, h) {
    this.population = new Population();
    this.width = w;
    this.height = h;

    this.edgeType = 0;
};

Environment.prototype.wrapEdges = function() {
    this.edgeType = 1;
};

Environment.prototype.applyEdges = function() {
    if (this.edgeType == 1) {
        this.population.applyWrapEdges();
    } else if (this.edgeType == 2) {
        // TODO: Make edges repel.
    }
};

Environment.prototype.toggleVehicleShape = function() {
    this.population.toggleVehicleShape();
};

Environment.prototype.blob = function(force) {
    this.population.seek(force);
};

Environment.prototype.createNewPopulation = function(size) {
    this.population = new Population();
    this.population.createNew(size);
};

Environment.prototype.changePopulation = function(newSize) {
    this.population.changeSize(newSize);
};

Environment.prototype.randomize = function() {
    this.population.applyRandomForce();
};

Environment.prototype.seekTarget = function(target) {
    this.edgeType = 2;
    this.population.seek(target);
};

Environment.prototype.separate = function() {
    this.population.separation();
};

Environment.prototype.applyForce = function(force) {
    this.population.applyForce(force);
};

Environment.prototype.applyFlowField = function(flowField) {
    this.population.applyFlowField(flowField);
};

Environment.prototype.flock = function() {
    this.population.align();
    this.population.cohesion();
};

Environment.prototype.display = function() {
    this.population.display();
};

Environment.prototype.update = function() {
    this.population.update();
};

Environment.prototype.drawForce = function(force) {
    var f = force.copy();
    var center = createVector(this.width / 2, this.height / 2);
    f.setMag(40);
    
    var r = f.copy();
    var l = f.copy();
    l.rotate(PI/8);
    r.rotate(-PI/8);
    r.mult(0.8);
    l.mult(0.8);
    l.add(center);
    r.add(center);
    f.add(center);
    
    strokeWeight(2);
    stroke(4);
    line(center.x, center.y, f.x, f.y);
    line(f.x, f.y, r.x, r.y);
    line(f.x, f.y, l.x, l.y);
};
