var Population = function() {
    this.vehicles = [];
    this.size = 0;
};

Population.prototype.add = function(vehicle) {
    this.vehicles.push(vehicle);
    this.size++;
};

Population.prototype.getNewRandomVehicle = function() {
    var pos = createVector(random(0, width), random(0, height));
    var vel = createVector(0, 0);
    var maxspeed = random(3, 6);
    var maxforce = random(0.2, 0.5);
    var vehicle = new Vehicle(pos, vel, maxspeed, maxforce);
    return vehicle;
};

Population.prototype.createNew = function(size) {
    for (var i = 0; i < size; i++) {
        this.vehicles.push(this.getNewRandomVehicle());
    }
};

Population.prototype.changeSize = function(newSize) {
    while(newSize < this.size) {
        this.vehicles.pop();
        this.size--;
    }
    while (newSize > this.size) {
        var veh = new Vehicle();
        this.vehicles.push(this.getNewRandomVehicle());
        this.size++;
    }
};

Population.prototype.applyForce = function(force) {
    this.vehicles.forEach(function(vehicle) {
        vehicle.applyForce(force);
    });
};

Population.prototype.applyRandomForce = function() {
    this.vehicles.forEach(function(vehicle) {
        var randomForce = p5.Vector.random2D();
        randomForce.mult(2);
        vehicle.applyForce(randomForce);
    });
};

Population.prototype.applyFlowField = function(flowField) {
    this.vehicles.forEach(function(vehicle) {
        vehicle.applyForce(flowField.getVectorAt(vehicle.position));
    });
};

Population.prototype.seek = function(target) {
    this.vehicles.forEach(function(vehicle) {
        vehicle.seek(target);
    });
};

Population.prototype.separation = function() {
    var vs = this.vehicles;
    this.vehicles.forEach(function(vehicle) {
        vehicle.separation(vs);
    });
};

Population.prototype.align = function() {
    var vs = this.vehicles;
    this.vehicles.forEach(function(vehicle) {
        vehicle.align(vs);
    });
};

Population.prototype.cohesion = function() {
    var vs = this.vehicles;
    this.vehicles.forEach(function(vehicle) {
        vehicle.cohesion(vs);
    });
};

Population.prototype.applyWrapEdges = function(){
    this.vehicles.forEach(function(vehicle) {
        var vp = vehicle.position;
        if (vp.x <= 0) {
            vp.x = width;
        } else if (vp.x >= width) {
            vp.x = 0;
        }
        if (vp.y <= 0) {
            vp.y = height;
        } else if (vp.y >= height) {
            vp.y = 0;
        }
    });
};

Population.prototype.toggleVehicleShape = function() { 
    this.vehicles.forEach(function(vehicle) {
        if (vehicle.geometry == 1) {
            vehicle.geometry = 2;
        } else {
            vehicle.geometry = 1;
        }
    });
};

Population.prototype.update = function() {
    this.vehicles.forEach(function(vehicle) {
        vehicle.update();
    });
};

Population.prototype.display = function() {
    this.vehicles.forEach(function(vehicle) {
        vehicle.display();
    });
};
