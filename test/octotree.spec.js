const {expect} = require('chai');
const { OctoTree, Box, Point, Sphere } = require('../octotree');

describe('OctoTree', () => {
  describe('on construction', () => {
    it('assigns boundary', () => {
      let box = new Box(100, 100, 100, 10, 10, 10);
      let octotree = new OctoTree(box, 4);
      expect(octotree.boundary).to.equal(box);
    });
    it('throws exception when boundary not set', () => {
      expect(() => { new OctoTree(null, 3) }).to.throw(TypeError);
    });
    it('throws exception when boundary not set with correct message', () => {
      expect(() => { new OctoTree(null, 3) }).to.throw('boundary is null or undefined');
    });
    it('throws exception when boundary is not a Box with correct message', () => {
      expect(() => { new OctoTree('not a boundary object', 3) }).to.throw('boundary should be a Box');
    });
    it('throws type error when boundary is not a Box', () => {
      expect(() => { new OctoTree('not a boundary object', 3) }).to.throw(TypeError);
    });
    it('assigns capacity', () => {
      let box = new Box(100, 100, 100, 10, 10, 10);
      let octotree = new OctoTree(box, 4);
      expect(octotree.capacity).to.equal(4);
    });
    it('throws exception when capacity is less than 1', () => {
      let box = new Box(100, 100, 100, 10, 10, 10);
      expect(() => { new OctoTree(box, 0) }).to.throw(RangeError);
    });
    it('throws exception when capacity is less than 1 with corbox message', () => {
      let box = new Box(100, 100, 100, 10, 10, 10);
      expect(() => { new OctoTree(box, 0) }).to.throw('capacity must be greater than 0');
    });
    it('throws exception when capacity is not a number', () => {
      let box = new Box(100, 100, 100, 10, 10, 10);
      expect(() => { new OctoTree(box, 'test') }).to.throw(TypeError);
    });
    it('throws exception with corbox message when capacity is not a number', () => {
      let box = new Box(100, 100, 100, 10, 10, 10);
      expect(() => { new OctoTree(box, 'test') }).to.throw('capacity should be a number but is a string');
    });
    it('assigns empty array to points', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.points).to.have.length(0);
    });
    it('assigns divided to false', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.divided).to.be.false;
    });
    it('does not define sector000', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.sector000).to.be.undefined;
    });
    it('does not define sector100', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.sector100).to.be.undefined;
    });
    it('does not define sector010', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.sector010).to.be.undefined;
    });
    it('does not define sector001', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.sector001).to.be.undefined;
    });
    it('does not define sector110', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.sector110).to.be.undefined;
    });
    it('does not define sector101', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.sector101).to.be.undefined;
    });
    it('does not define sector011', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.sector011).to.be.undefined;
    });
    it('does not define sector111', () => {
      let box = new Box(100, 100, 100, 30, 30, 30);
      let octotree = new OctoTree(box, 4);
      expect(octotree.sector111).to.be.undefined;
    });
  });
  describe('on subdivide', () => {
    let box;
    let octotree;
    let cx = 100;
    let cy = 200;
    let cz = 100;
    let w = 50;
    let h = 30;
    let d = 20;
    let childTests = (direction, mx, my, mz) => {
      describe(direction, () => {
        let child;
        let boundary;
        beforeEach(() => {
          child = octotree[direction];
          boundary = child.boundary;
        });
        it('is assigned', () => {
          expect(child).not.to.be.undefined;
        })
        it('gets correct center x', () => {
          expect(boundary.x).to.equal(mx);
        });
        it('gets correct center y', () => {
          expect(boundary.y).to.equal(my);
        });
        it('gets correct center z', () => {
          expect(boundary.z).to.equal(mz);
        });
        it('has parent width divided by 2', () => {
          expect(boundary.w).to.equal(w / 2);
        });
        it('has parent height divided by 2', () => {
          expect(boundary.h).to.equal(h / 2);
        });
        it('has parent depth divided by 2', () => {
          expect(boundary.d).to.equal(d / 2);
        });
        it('has same capacity as parent', () => {
          expect(child.capacity).to.equal(octotree.capacity);
        });
      })
    };
    beforeEach(() => {
      box = new Box(cx, cy, cz, w, h, d);
      octotree = new OctoTree(box, 4);
      octotree.subdivide();
    });
    it('marks subdivided as true', () => {
      expect(octotree.divided).to.be.true;
    });
    childTests('sector000', cx - w / 2, cy - h / 2, cz - d / 2);
    childTests('sector100', cx + w / 2, cy - h / 2, cz - d / 2);
    childTests('sector010', cx - w / 2, cy + h / 2, cz - d / 2);
    childTests('sector110', cx + w / 2, cy + h / 2, cz - d / 2);
    childTests('sector001', cx - w / 2, cy - h / 2, cz + d / 2);
    childTests('sector101', cx + w / 2, cy - h / 2, cz + d / 2);
    childTests('sector011', cx - w / 2, cy + h / 2, cz + d / 2);
    childTests('sector111', cx + w / 2, cy + h / 2, cz + d / 2);
  });
  describe('insert', () => {
    let box;
    let octotree;
    beforeEach(() => {
      box = new Box(100, 200, 100, 20, 50, 30);
      octotree = new OctoTree(box, 4);
    });
    it('returns false when boundary does not contain point', () => {
      expect(octotree.insert(new Point(10, 20, 0))).to.be.false;
    });
    it('does not add to points array when boundary does not contain point', () => {
      octotree.insert(new Point(10, 20, 0));
      expect(octotree.points).to.have.length(0);
    });
    it('returns true when capacity not hit and boundary does contain point', () => {
      expect(octotree.insert(new Point(100,200,100))).to.be.true;
    });
    it('adds point to points array when capacity not hit and boundary does contain point', () => {
      octotree.insert(new Point(100,200,100));
      expect(octotree.points).to.have.length(1);
    });
    it('triggers subdivision when capacity is exceeded', () => {
      expect(octotree.divided).to.be.false;
      octotree.insert(new Point(100,200,100));
      octotree.insert(new Point(100,200,100));
      octotree.insert(new Point(100,200,100));
      octotree.insert(new Point(100,200,100));
      octotree.insert(new Point(100,200,100));
      expect(octotree.divided).to.be.true;
    });
    describe('when subdivided', () => {
      beforeEach(() => {
        octotree.insert(new Point(100,200,100));
        octotree.insert(new Point(100,200,100));
        octotree.insert(new Point(100,200,100));
        octotree.insert(new Point(100,200,100));
      });
      it('correctly adds to sector000', () => {
        octotree.insert(new Point(100 - 10, 200 - 10, 100 - 10));
        expect(octotree.sector000.points).to.have.length(1);
      });
      it('returns true when added to sector000', () => {
        expect(octotree.insert(new Point(100 - 10, 200 - 10, 100 - 10))).to.be.true;
      });
      it('correctly adds to sector100', () => {
        octotree.insert(new Point(100 + 10, 200 - 10, 100 - 10));
        expect(octotree.sector100.points).to.have.length(1);
      });
      it('returns true when added to sector100', () => {
        expect(octotree.insert(new Point(100 + 10, 200 - 10, 100 - 10))).to.be.true;
      });
      it('correctly adds to sector010', () => {
        octotree.insert(new Point(100 - 10, 200 + 10, 100 - 10));
        expect(octotree.sector010.points).to.have.length(1);
      });
      it('returns true when added to sector010', () => {
        expect(octotree.insert(new Point(100 - 10, 200 + 10, 100 - 10))).to.be.true;
      });
      it('correctly adds to sector110', () => {
        octotree.insert(new Point(100 + 10, 200 + 10, 100 - 10));
        expect(octotree.sector110.points).to.have.length(1);
      });
      it('returns true when added to sector110', () => {
        expect(octotree.insert(new Point(100 + 10, 200 + 10, 100 - 10))).to.be.true;
      });
      it('correctly adds to sector001', () => {
        octotree.insert(new Point(100 - 10, 200 - 10, 100 + 10));
        expect(octotree.sector001.points).to.have.length(1);
      });
      it('returns true when added to sector001', () => {
        expect(octotree.insert(new Point(100 - 10, 200 - 10, 100 + 10))).to.be.true;
      });
      it('correctly adds to sector101', () => {
        octotree.insert(new Point(100 + 10, 200 - 10, 100 + 10));
        expect(octotree.sector101.points).to.have.length(1);
      });
      it('returns true when added to sector101', () => {
        expect(octotree.insert(new Point(100 + 10, 200 - 10, 100 + 10))).to.be.true;
      });
      it('correctly adds to sector011', () => {
        octotree.insert(new Point(100 - 10, 200 + 10, 100 + 10));
        expect(octotree.sector011.points).to.have.length(1);
      });
      it('returns true when added to sector011', () => {
        expect(octotree.insert(new Point(100 - 10, 200 + 10, 100 + 10))).to.be.true;
      });
      it('correctly adds to sector111', () => {
        octotree.insert(new Point(100 + 10, 200 + 10, 100 + 10));
        expect(octotree.sector111.points).to.have.length(1);
      });
      it('returns true when added to sector111', () => {
        expect(octotree.insert(new Point(100 + 10, 200 + 10, 100 + 10))).to.be.true;
      });
      it('does not trigger multiple subdivisions', () => {
        octotree.insert(new Point(100 + 10, 200 + 10, 100 + 10));
        let temp = octotree.sector111;
        octotree.insert(new Point(100 + 10, 200 + 10, 100 + 10));
        expect(octotree.sector111).to.equal(temp);
      });
    });
  });
  describe('query', () => {
    let octotree;
    let points;
    beforeEach(() => {
      octotree = new OctoTree(new Box(0, 0, 0, 100, 100, 100), 8);
      points = [
        new Point(-25, -25, -25),
        new Point(25, -25, -25),
        new Point(-25, 25, -25),
        new Point(25, 25, -25),
        new Point(-25, -25, 25),
        new Point(25, -25, 25),
        new Point(-25, 25, 25),
        new Point(25, 25, 25),
      ];
      points.forEach(point => octotree.insert(point));
    });
    it('returns an array when not passed in an array', () => {
      let found = octotree.query(new Box(50, 50, 50, 10, 10, 10));
      expect(found).to.be.an('array');
    });
    it('returns the array that is passed into it', () => {
      let old = [];
      let found = octotree.query(new Box(50, 50, 50, 10, 10, 10), old);
      expect(found).to.equal(old);
    });
    it('returns an empty array when no points should match', () => {
      let found = octotree.query(new Box(0, 0, 0, 10, 10, 10));
      expect(found).to.have.length(0);
    });
    it('returns no items when there is no overlap', () => {
      let found = octotree.query(new Box(1000, 1000, 1000, 10, 10, 10));
      expect(found).to.have.length(0);
    });
    it('returns an array with one point when search should be successful', () => {
      let found = octotree.query(new Box(25, 25, 25, 10, 10, 10));
      expect(found).to.have.length(1);
    });
    it('returns an array with the correct point when search should be successful', () => {
      let found = octotree.query(new Box(25, 25, 25, 10, 10, 10));
      expect(found).to.contain(points[7]);
    });
    describe('when a subdivision occurs', () => {
      beforeEach(() => {
        points.push(new Point(-26, -26, -26));
        points.push(new Point(26, -26, -26));
        points.push(new Point(-26, 26, -26));
        points.push(new Point(26, 26, -26));
        points.push(new Point(-26, -26, 26));
        points.push(new Point(26, -26, 26));
        points.push(new Point(-26, 26, 26));
        points.push(new Point(26, 26, 26));
        octotree.insert(points[8]);
        octotree.insert(points[9]);
        octotree.insert(points[10]);
        octotree.insert(points[11]);
        octotree.insert(points[12]);
        octotree.insert(points[13]);
        octotree.insert(points[14]);
        octotree.insert(points[15]);
        expect(octotree.divided).to.be.true;
      });
      it('returns correct number of sector000 points', () => {
        let found = octotree.query(new Box(-25, -25, -25, 10, 10, 10));
        expect(found).to.have.length(2);
      });
      it('returns all appropriate sector000 points', () => {
        let found = octotree.query(new Box(-25, -25, -25, 10, 10, 10));
        expect(found).to.contain(points[0]);
        expect(found).to.contain(points[8]);
      });
      it('returns correct number of sector100 points', () => {
        let found = octotree.query(new Box(25, -25, -25, 10, 10, 10));
        expect(found).to.have.length(2);
      });
      it('returns all appropriate sector100 points', () => {
        let found = octotree.query(new Box(25, -25, -25, 10, 10, 10));
        expect(found).to.contain(points[1]);
        expect(found).to.contain(points[9]);
      });
      it('returns correct number of sector010 points', () => {
        let found = octotree.query(new Box(-25, 25, -25, 10, 10, 10));
        expect(found).to.have.length(2);
      });
      it('returns all appropriate sector010 points', () => {
        let found = octotree.query(new Box(-25, 25, -25, 10, 10, 10));
        expect(found).to.contain(points[2]);
        expect(found).to.contain(points[10]);
      });
      it('returns correct number of sector110 points', () => {
        let found = octotree.query(new Box(25, 25, -25, 10, 10, 10));
        expect(found).to.have.length(2);
      });
      it('returns all appropriate sector110 points', () => {
        let found = octotree.query(new Box(25, 25, -25, 10, 10, 10));
        expect(found).to.contain(points[3]);
        expect(found).to.contain(points[11]);
      });
      it('returns correct number of sector001 points', () => {
        let found = octotree.query(new Box(-25, -25, 25, 10, 10, 10));
        expect(found).to.have.length(2);
      });
      it('returns all appropriate sector001 points', () => {
        let found = octotree.query(new Box(-25, -25, 25, 10, 10, 10));
        expect(found).to.contain(points[4]);
        expect(found).to.contain(points[12]);
      });
      it('returns correct number of sector101 points', () => {
        let found = octotree.query(new Box(25, -25, 25, 10, 10, 10));
        expect(found).to.have.length(2);
      });
      it('returns all appropriate sector101 points', () => {
        let found = octotree.query(new Box(25, -25, 25, 10, 10, 10));
        expect(found).to.contain(points[5]);
        expect(found).to.contain(points[13]);
      });
      it('returns correct number of sector011 points', () => {
        let found = octotree.query(new Box(-25, 25, 25, 10, 10, 10));
        expect(found).to.have.length(2);
      });
      it('returns all appropriate sector011 points', () => {
        let found = octotree.query(new Box(-25, 25, 25, 10, 10, 10));
        expect(found).to.contain(points[6]);
        expect(found).to.contain(points[14]);
      });
      it('returns correct number of sector111 points', () => {
        let found = octotree.query(new Box(25, 25, 25, 10, 10, 10));
        expect(found).to.have.length(2);
      });
      it('returns all appropriate sector111 points', () => {
        let found = octotree.query(new Box(25, 25, 25, 10, 10, 10));
        expect(found).to.contain(points[7]);
        expect(found).to.contain(points[15]);
      });
      it('returns correct number of points from multiple regions', () => {
        let found = octotree.query(new Box(0, -25, 0, 50, 10, 50));
        expect(found).to.have.length(8);
      });
      it('returns correct points from multiple regions', () => {
        let found = octotree.query(new Box(0, -25, 0, 50, 10, 50));
        expect(found).to.contain(points[0]);
        expect(found).to.contain(points[1]);
        expect(found).to.contain(points[4]);
        expect(found).to.contain(points[5]);
        expect(found).to.contain(points[8]);
        expect(found).to.contain(points[9]);
        expect(found).to.contain(points[12]);
        expect(found).to.contain(points[13]);
      });
      it('returns no points as expected with a Sphere', () => {
        let found = octotree.query(new Sphere(0, 0, 0, 10));
        expect(found).to.have.length(0);
      });
      it('returns correct number of points with a Sphere', () => {
        let found = octotree.query(new Sphere(25, 25, 25, 10));
        expect(found).to.have.length(2);
      });
      it('returns correct points with a Sphere', () => {
        let found = octotree.query(new Sphere(25, 25, 25, 10));
        expect(found).to.contain(points[7]);
        expect(found).to.contain(points[15]);
      });
    });
  });
});
