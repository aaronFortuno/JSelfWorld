class Polygon {
    constructor(points) {
        this.points = points;
    }

    draw(context, { stroke = "blue", lineWidth = 2, fill = "rgba(0, 0, 255, 0.3)" } = {}) {
        context.beginPath();
        context.fillStyle = fill;
        context.strokeStyle = stroke;
        context.lineWidth = lineWidth;
        context.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.closePath();
        context.fill();
        context.stroke();
    }
}