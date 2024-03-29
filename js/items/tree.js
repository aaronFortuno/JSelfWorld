class Tree {
    constructor(center, size, heightCoef = 0.2) {
        this.center = center;
        this.size = size; // at base
        this.heightCoef = heightCoef;
        this.base = this.#generateLevel(center, size);
    }

    draw(context, viewPoint) {
        const diff = subtract(this.center, viewPoint);
        const top = add(this.center, scale(diff, this.heightCoef));

        const levelCount = 7;
        for (let level = 0; level < levelCount; level++) {
            const t = level / (levelCount - 1);
            const point = lerp2D(this.center, top, t);
            const color = "rgb(30," + lerp(50, 200, t) + ", 70)";
            const size = lerp(this.size, 40, t);
            const poly = this.#generateLevel(point, size);
            poly.draw(context, { fill: color, stroke: "rgba(0,0,0,0)" })
        }
    }

    #generateLevel(point, size) {
        const points = [];
        const radius = size / 2;
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
            const kindOfRandom = Math.cos(((a + this.center.x) * size) % 17) ** 2;
            const noisyRadius = radius * lerp(0.5, 1, kindOfRandom);
            points.push(translate(point, a, noisyRadius));
        }
        return new Polygon(points);
    }
}