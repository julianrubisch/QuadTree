const {expect} = require('chai');
let { Sphere, Point, Box } = require('../octotree');

describe('Sphere', () => {
  describe('on construction', () => {
    it('sets x', () => {
      let sphere = new Sphere(12, 23, 34, 40);
      expect(sphere.x).to.equal(12);
    });
    it('sets y', () => {
      let sphere = new Sphere(12, 23, 34, 40);
      expect(sphere.x).to.equal(12);
      expect(sphere.y).to.equal(23);
    });
    it('sets z', () => {
      let sphere = new Sphere(12, 23, 34, 40);
      expect(sphere.x).to.equal(12);
      expect(sphere.y).to.equal(23);
      expect(sphere.z).to.equal(34);
    });
    it('sets radius', () => {
      let sphere = new Sphere(12, 23, 34, 40);
      expect(sphere.x).to.equal(12);
      expect(sphere.r).to.equal(40);
    });
    it('sets rSquared', () => {
      let sphere = new Sphere(12, 23, 34, 40);
      expect(sphere.rSquared).to.equal(40 * 40);
    });
  });
  describe('contains', () => {
    let sphere;
    let cx = 100;
    let cy = 50;
    let cz = 25;
    let r = 25;
    beforeEach(() => {
      sphere = new Sphere(cx, cy, cz, r);
    });
    [
      { desc: 'centre', x: cx, y: cy, z: cz, in: true },
      { desc: 'top', x: cx, y: cy - r, z: cz, in: true },
      { desc: 'above top', x: cx, y: cy - r - 1, z: cz, in: false },
      { desc: 'bottom', x: cx, y: cy + r, z: cz, in: true },
      { desc: 'below bottom', x: cx, y: cy + r + 1, z: cz, in: false },
      { desc: 'left', x: cx - r, y: cy, z: cz, in: true },
      { desc: 'outside left', x: cx - r - 1, y: cy, z: cz, in: false },
      { desc: 'right', x: cx + r, y: cy, z: cz, in: true },
      { desc: 'outside right', x: cx + r + 1, y: cy, z: cz, in: false },
      { desc: 'front', x: cx, y: cy, z: cz - r, in: true },
      { desc: 'outside front', x: cx, y: cy, z: cz - r - 1, in: false },
      { desc: 'back', x: cx, y: cy, z: cz + r, in: true },
      { desc: 'outside back', x: cx, y: cy, z: cz + r + 1, in: false }
    ].forEach(element => {
      it(`returns ${element.in} for ${element.desc} (${element.x}, ${element.y})`, () => {
        expect(sphere.contains(element)).to.equal(element.in);
      });
    });
  });
  describe('intersects', () => {
    let sphere; 
    let cx = 100;
    let cy = 50;
    let cz = 25;
    let r = 25;
    beforeEach(() => {
      sphere = new Sphere(cx, cy, cz, r);
    });
    it('returns false when entire box is too far away', () => {
      let box = new Box(1000, 2000, 1000, 12, 10, 10);
      expect(sphere.intersects(box)).to.be.false;
    });
    it('returns false when only x on box is out of range', () => {
      let box = new Box(1000, cy, 1000, 12, 10, 10);
      expect(sphere.intersects(box)).to.be.false;
    });
    it('returns false when only y on box is out of range', () => {
      let box = new Box(cx, 1000, 1000, 12, 10, 10);
      expect(sphere.intersects(box)).to.be.false;
    });
    it('returns false when only z on box is out of range', () => {
      let box = new Box(1000, 1000, cz, 12, 10, 10);
      expect(sphere.intersects(box)).to.be.false;
    });
    it('returns true when sphere encapsulates box', () => {
      let box = new Box(cx, cy, cz, 12, 10, 10);
      expect(sphere.intersects(box)).to.be.true;
    });
    it('returns true when sphere is encapsulated by box', () => {
      let box = new Box(cx, cy, cz, r * 2, r * 2, r * 2);
      expect(sphere.intersects(box)).to.be.true;
    });
    it ('returns true when partially inside sphere', () => {
      let box = new Box(cx + 8, 50, 25, 7, 10, 10);
      expect(sphere.intersects(box)).to.be.true;
    });
    it ('returns false when not inside sphere but within bounding box', () => {
      let box = new Box(cx + 24, cy + 24, cz + 24, 1, 1, 1);
      expect(sphere.intersects(box)).to.be.false;
    });
    it ('returns true when just inside sphere', () => {
      let box = new Box(cx + 18, cy + 18, cz + 7, 1, 1, 1);
      expect(sphere.intersects(box)).to.be.true;
    });
  });
});
