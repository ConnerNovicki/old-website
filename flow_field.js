var FlowField = function(w, h, res) {

    this.resolution = res;
    this.rows = h / res;
    this.cols = w / res;

    this.field = [];

    var xoff = 0;
    for (var x = 0; x < this.cols; x++) {
        var yoff = 0;
        var f = [];
        for (var y = 0; y < this.rows; y++) {
            var theta = map(noise(xoff, yoff), 0, 1, 0, 4 * PI);
            var vec = p5.Vector.fromAngle(theta);
            vec.mult(10);
            f.push(vec);
            yoff += 0.1;
        }
        this.field.push(f);
        xoff += 0.1;
    }
};

FlowField.prototype.randomize = function() {
    delete this.field;
    this.field = [];
    console.log("GETTING RANDOM");

    var xoff = 0;
    for (var x = 0; x < this.cols; x++) {
        var yoff = 0;
        var f = [];
        for (var y = 0; y < this.rows; y++) {
            var theta = map(noise(xoff, yoff), 0, 1, 0, 4 * PI);
            var vec = p5.Vector.fromAngle(theta);
            vec.mult(10);
            f.push(vec);
            yoff += 0.1;
        }
        this.field.push(f);
        xoff += 0.1;
    }
};


FlowField.prototype.getVectorAt = function(position) {
    var column = int(constrain(position.x / this.resolution, 0, this.cols - 1));
    var row = int(constrain(position.y / this.resolution, 0, this.rows - 1));
    return this.field[column][row].copy();
};

FlowField.prototype.display = function() {
    for (var x = 0; x < this.rows; x++) {
        for (var y = 0; y < this.cols; y++) {
            var v = this.field[x][y].copy();
            var pos = createVector(x * this.resolution, y * this.resolution);
            
            v.normalize();
            v.mult(10);
            v.add(pos);
            line(v.x, v.y, pos.x, pos.y);
        }
    }
};