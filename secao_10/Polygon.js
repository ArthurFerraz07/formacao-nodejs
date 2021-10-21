class EuclidianPoint {
  // Class methods
  static displayName = 'Point';
  static distance(x, y) {
    const dx = x.x - y.x;
    const dy = x.y - y.y;

    return Math.hypot(dx, dy);
  }

  // Class attributes
  x;
  y;
  
  // Class initialization
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  // Class methods
  formatted(){
    return `(${this.x}, ${this.y})`
  }
}

class Polygon {
  constructor(...sides) {
    this.sides = sides;
    sides.forEach(side => {
      if(!(side instanceof EuclidianPoint)){ throw 'Invalid side' }
    })
  }

  *getSides() {
    for(const side of this.sides){
      yield side.formatted();
    }
  }
}

const pentagon = new Polygon(
  new EuclidianPoint(1, 2),
  new EuclidianPoint(3, 4),
  new EuclidianPoint(5, 6),
  new EuclidianPoint(7, 8)
);

console.log([...pentagon.getSides()]);
