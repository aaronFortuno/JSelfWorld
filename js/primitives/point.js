class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(point) {
        return this.x == point.x && this.y == point.y;
    }

    draw(context, { size = 18, color = "black", outline = false } = {}) {
        const rad = size / 2;
        context.beginPath();
        context.fillPath = color;
        context.arc(this.x, this.y, rad, 0, Math.PI * 2);
        context.fill();
        if (outline) {
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
            context.stroke();
        }
    }
}