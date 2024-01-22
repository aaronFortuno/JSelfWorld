class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(context, size = 18, color = "black") {
        const rad = size / 2;
        context.beginPath();
        context.fillPath = color;
        context.arc(this.x, this.y, rad, 0, Math.PI * 2);
        context.fill();
    }
}