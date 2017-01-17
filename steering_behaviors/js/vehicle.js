var Vehicle = function(posVec, velVec, maxS, maxF) {
    this.position = posVec;
    this.velocity = velVec;
    this.acceleration = createVector(0, 0);

    this.maxSpeed = maxS;
    this.maxForce = maxF;
    this.radius = 12;

    this.SIZE = 10;
    
    this.geometry = 1;
};

Vehicle.prototype.applyForce = function(force) {
    force.limit(this.maxForce);
    this.acceleration.add(force);
};

Vehicle.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position);
    desired.limit(this.maxSpeed);
    
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
};

Vehicle.prototype.separation = function(otherVehicles) {
    var desiredSep = this.radius * 2;
    var sum = createVector(0, 0);
    var count = 0;
    
    for (var i = 0; i < otherVehicles.length; i++) {
        var v = otherVehicles[i];
        //console.log(v);
        var d = p5.Vector.dist(this.position, v.position);
        if ((d > 0) &&(d < desiredSep)) {
            
            var diff = p5.Vector.sub(this.position, v.position);
            diff.normalize();
            diff.div(d);
            sum.add(diff);
            count++;
        }
    }
    if (count > 0) {
        sum.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(sum, this.velocity);
        this.applyForce(steer);
    }
};

Vehicle.prototype.align = function(otherVehicles) {
    var desiredSep = this.radius * 2;
    var sum = createVector(0, 0);
    var count = 0;
    
    for (var i = 0; i < otherVehicles.length; i++) {
        var v = otherVehicles[i];
        var d = p5.Vector.dist(this.position, v.position);
        if ((d > 0) &&(d < desiredSep)) {
            
            sum.add(v.velocity);
            count++;
        }
    }
    if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxSpeed);
        sum.add(this.velocity);
        this.applyForce(sum);
    }
};

Vehicle.prototype.cohesion = function(otherVehicles) {
    var desiredSep = this.radius * 2;
    var sum = createVector(0, 0);
    var count = 0;
    
    for (var i = 0; i < otherVehicles.length; i++) {
        var v = otherVehicles[i];
        //console.log(v);
        var d = p5.Vector.dist(this.position, v.position);
        if ((d > 0) &&(d < desiredSep)) {
            
            var diff = p5.Vector.sub(this.position, v.position);
            diff.normalize();
            diff.div(d);
            sum.add(diff);
            count++;
        }
    }
    if (count > 0) {
        sum.div(count);
        sum.mult(3);
        this.applyForce(sum);
    }
};

Vehicle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    
    this.position.add(this.velocity);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
};

Vehicle.prototype.display = function() {
    if (this.geometry == 1) {
        var tempVector;
        if (this.velocity.x === 0 && this.velocity.y === 0) {
            tempVector = p5.Vector.random2D();
        } else {
            tempVector = this.velocity.copy();
        }

        tempVector.normalize();
        tempVector.mult(-this.SIZE);

        var rightWing = tempVector.copy();
        var leftWing = tempVector.copy();
        rightWing.rotate(PI/8);
        leftWing.rotate(-PI/8);
        rightWing.add(this.position);
        leftWing.add(this.position);

        triangle(this.position.x, this.position.y, rightWing.x, rightWing.y, leftWing.x, leftWing.y);
    } else {
        ellipse(this.position.x, this.position.y, this.SIZE, this.SIZE);
    }
};
