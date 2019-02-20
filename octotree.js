// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// OctoTree

class Point {
  constructor(x, y, z, data) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.userData = data;
    this.octoTree = null;
  }
}

class Box {
  constructor(x, y, z, w, h, d) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
  }

  contains(point) {
    return (point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h &&
      point.z >= this.z - this.d &&
      point.z <= this.z + this.d);
  }


  intersects(range) {
    return !(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h ||
      range.z - range.d > this.z + this.d ||
      range.z + range.d < this.z - this.d);
  }
  
  
}

// circle class for a circle shaped query
class Sphere {
  constructor(x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point) {
    // check if the point is in the sphere by checking if the euclidean distance of
    // the point and the center of the sphere if smaller or equal to the radius of
    // the sphere
    let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2) + Math.pow((point.z - this.z), 2);
    return Math.sqrt(d) <= this.r;
  }

  intersects(range) {

    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);
    let zDist = Math.abs(range.z - this.z);

    // radius of the circle
    let r = this.r;

    let w = range.w;
    let h = range.h;
    let d = range.d;

    let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2) + Math.pow((zDist - d), 2);

    // no intersection
    if (xDist > (r + w) || yDist > (r + h) || zDist > (r + d))
      return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h || zDist <= d)
      return true;

    // intersection on the edge of the circle
    return Math.sqrt(edges) <= this.r;
  }
}

class OctoTree {
  constructor(boundary, capacity) {
    if (!boundary) {
      throw TypeError('boundary is null or undefined');
    }
    if (!(boundary instanceof Box)) {
      throw TypeError('boundary should be a Box');
    }
    if (typeof capacity !== 'number') {
      throw TypeError(`capacity should be a number but is a ${typeof capacity}`);
    }
    if (capacity < 1) {
      throw RangeError('capacity must be greater than 0');
    }
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let z = this.boundary.z;
    let w = this.boundary.w / 2;
    let h = this.boundary.h / 2;
    let d = this.boundary.d / 2;

    let bd000 = new Box(x - w, y - h, z - d, w, h, d);
    this.sector000 = new OctoTree(bd000, this.capacity);
    let bd100 = new Box(x + w, y - h, z - d, w, h, d);
    this.sector100 = new OctoTree(bd100, this.capacity);
    let bd010 = new Box(x - w, y + h, z - d, w, h, d);
    this.sector010 = new OctoTree(bd010, this.capacity);
    let bd110 = new Box(x + w, y + h, z - d, w, h, d);
    this.sector110 = new OctoTree(bd110, this.capacity);
    let bd001 = new Box(x - w, y - h, z + d, w, h, d);
    this.sector001 = new OctoTree(bd001, this.capacity);
    let bd101 = new Box(x + w, y - h, z + d, w, h, d);
    this.sector101 = new OctoTree(bd101, this.capacity);
    let bd011 = new Box(x - w, y + h, z + d, w, h, d);
    this.sector011 = new OctoTree(bd011, this.capacity);
    let bd111 = new Box(x + w, y + h, z + d, w, h, d);
    this.sector111 = new OctoTree(bd111, this.capacity);

    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      point.octoTree = this;
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (this.sector000.insert(point) || this.sector100.insert(point) ||
      this.sector010.insert(point) || this.sector001.insert(point) ||
      this.sector110.insert(point) || this.sector101.insert(point) ||
      this.sector011.insert(point) || this.sector111.insert(point));
  }

  query(range, found) {
    if (!found) {
      found = [];
    }

    if (!range.intersects(this.boundary)) {
      return found;
    }

    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }
    if (this.divided) {
      this.sector000.query(range, found);
      this.sector100.query(range, found);
      this.sector010.query(range, found);
      this.sector001.query(range, found);
      this.sector110.query(range, found);
      this.sector011.query(range, found);
      this.sector101.query(range, found);
      this.sector111.query(range, found);
    }

    return found;
  }

}

if (typeof module !== "undefined") {
  module.exports = { Point, Box, OctoTree, Sphere };
}
