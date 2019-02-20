const {expect} = require('chai');
let { Box, Point } = require('../octotree');

describe('Box', () => {
  describe('on construction', () => {
    it('sets x', () => {
      let box = new Box(12, 23, 0, 40, 83, 10);
      expect(box.x).to.equal(12);
    });
    it('sets y', () => {
      let box = new Box(12, 23, 0, 40, 83, 10);
      expect(box.y).to.equal(23);
    });
    it('sets z', () => {
      let box = new Box(12, 23, 0, 40, 83, 10);
      expect(box.z).to.equal(0);
    });
    it('sets w', () => {
      let box = new Box(12, 23, 0, 40, 83, 10);
      expect(box.w).to.equal(40);
    });
    it('sets h', () => {
      let box = new Box(12, 23, 0, 40, 83, 10);
      expect(box.h).to.equal(83);
    });
    it('sets d', () => {
      let box = new Box(12, 23, 0, 40, 83, 10);
      expect(box.d).to.equal(10);
    });
  });
  describe('contains', () => {
    let box;
    let left;
    let right;
    let top;
    let bottom;
    let front;
    let back;
    let cx;
    let cy;
    let cz;
    beforeEach(() => {
      // Left: 25, Right: 75
      // Top: 70, Bottom: 130
      cx = 50;
      cy = 100;
      cz = 10;
      let w = 25;
      let h = 30;
      let d = 40;
      box = new Box(cx, cy, cz, w, h, d);;
      left = cx - w;
      right = cx + w;
      top = cy - h;
      bottom = cy + h;
      front = cz - d;
      back = cz + d;
    });
    it('returns true when point is in the center', () => {
      let point = new Point(cx, cy, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns true when point on left edge', () => {
      let point = new Point(left, cy, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns true when point inside left edge', () => {
      let point = new Point(left + 1, cy, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns false when point outside left edge', () => {
      let point = new Point(left - 1, cy, cz);
      expect(box.contains(point)).not.to.be.true;
    });
    it('returns true when point on right edge', () => {
      let point = new Point(right, cy, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns true when point inside right edge', () => {
      let point = new Point(right - 1, cy, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns false when point outside right edge', () => {
      let point = new Point(right + 1, cy, cz);
      expect(box.contains(point)).not.to.be.true;
    });
    it('returns true when point on top edge', () => {
      let point = new Point(cx, top, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns true when point inside top edge', () => {
      let point = new Point(cx, top + 1, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns false when point outside top edge', () => {
      let point = new Point(cx, top - 1, cz);
      expect(box.contains(point)).not.to.be.true;
    });
    it('returns true when point on bottom edge', () => {
      let point = new Point(cx, bottom, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns true when point inside bottom edge', () => {
      let point = new Point(cx, bottom - 1, cz);
      expect(box.contains(point)).to.be.true;
    });
    it('returns false when point outside bottom edge', () => {
      let point = new Point(cx, bottom + 1, cz);
      expect(box.contains(point)).not.to.be.true;
    });
    it('returns true when point on front edge', () => {
      let point = new Point(cx, cy, front);
      expect(box.contains(point)).to.be.true;
    });
    it('returns true when point inside front edge', () => {
      let point = new Point(cx, cy, front + 1);
      expect(box.contains(point)).to.be.true;
    });
    it('returns false when point outside front edge', () => {
      let point = new Point(cx, cy, front - 1);
      expect(box.contains(point)).not.to.be.true;
    });
    it('returns true when point on back edge', () => {
      let point = new Point(cx, cy, back);
      expect(box.contains(point)).to.be.true;
    });
    it('returns true when point inside back edge', () => {
      let point = new Point(cx, cy, back - 1);
      expect(box.contains(point)).to.be.true;
    });
    it('returns false when point outside back edge', () => {
      let point = new Point(cx, cy, back + 1);
      expect(box.contains(point)).not.to.be.true;
    });
  });
  describe('intersects', () => {
    let base;
    let cx;
    let cy;
    let cz;
    let w;
    let h;
    let d;
    let left;
    let right;
    let top;
    let bottom;
    let front;
    let back;
    beforeEach(() => {
      cx = 100;
      cy = 200;
      cz = 50;
      w = 50;
      h = 25;
      d = 100;
      left = cx - w;
      right = cx + w;
      top = cy - h;
      bottom = cy + h;
      front = cz - d;
      back = cz + d;
      base = new Box(cx, cy, cz, w, h, d);
    });
    it('returns true when second box is inside first', () => {
      let test = new Box(cx, cy, cz, w / 2, h / 2, d / 2);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns true when second box is the same as first', () => {
      let test = new Box(cx, cy, cz, w, h, d);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns true when second box encapsulates the first', () => {
      let test = new Box(cx, cy, cz, w * 2, h * 2, d * 2);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns true when edges line up on the left', () => {
      let test = new Box(left - 10, cy, cz, 10, 10, 10);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns false when edges do not line up on the left', () => {
      let test = new Box(left - 10 - 1, cy, cz, 10, 10, 10);
      expect(base.intersects(test)).not.to.be.true;
    });
    it('returns true when edges line up on the right', () => {
      let test = new Box(right + 10, cy, cz, 10, 10, 10);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns false when edges do not line up on the right', () => {
      let test = new Box(right + 10 + 1, cy, cz, 10, 10, 10);
      expect(base.intersects(test)).not.to.be.true;
    });
    it('returns true when edges line up on the top', () => {
      let test = new Box(cx, top - 10, cz, 10, 10, 10);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns false when edges do not line up on the top', () => {
      let test = new Box(cx, top - 10 - 1, cz, 10, 10, 10);
      expect(base.intersects(test)).not.to.be.true;
    });
    it('returns true when edges line up on the bottom', () => {
      let test = new Box(cx, bottom + 10, cz, 10, 10, 10);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns false when edges do not line up on the bottom', () => {
      let test = new Box(cx, bottom + 10 + 1, cz, 10, 10, 10);
      expect(base.intersects(test)).not.to.be.true;
    });
    it('returns true when edges line up in the front', () => {
      let test = new Box(cx, cy, front - 10, 10, 10, 10);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns false when edges do not line up in the front', () => {
      let test = new Box(cx, cy, front - 10 - 1, 10, 10, 10);
      expect(base.intersects(test)).not.to.be.true;
    });
    it('returns true when edges line up in the back', () => {
      let test = new Box(cx, cy, back + 10, 10, 10, 10);
      expect(base.intersects(test)).to.be.true;
    });
    it('returns false when edges do not line up in the back', () => {
      let test = new Box(cx, cy, back + 10 + 1, 10, 10, 10);
      expect(base.intersects(test)).not.to.be.true;
    });
  });
});
