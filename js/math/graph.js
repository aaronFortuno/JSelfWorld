class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    // ADDING POINTS
    addPoint(point) {
        this.points.push(point);
    }

    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }

    tryAddPoint(point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        return false;
    }

    // ADDING SEGMENTS
    addSegment(seg) {
        this.segments.push(seg);
    }

    containsSegment(segment) {
        return this.segments.find((s) => s.equals(segment));
    }

    tryAddSegment(segment) {
        if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
            this.addSegment(segment);
            return true;
        }
        return false;
    }

    // REMOVING SEGMENTS
    removeSegment(segment) {
        this.segments.splice(this.segments.indexOf(segment), 1);
    }

    draw(context) {
        for (const seg of this.segments) {
            seg.draw(context);
        }

        for (const point of this.points) {
            point.draw(context);
        }
    }
}