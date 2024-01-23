class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    static load(info) {
        const points = info.points.map((i) => new Point(i.x, i.y));
        const segments = info.segments.map((i) => new Segment(
            points.find((p) => p.equals(i.p1)),
            points.find((p) => p.equals(i.p2))
        ));

        return new Graph(points, segments);
    }

    hash() {
        return JSON.stringify(this);
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

    // REMOVING POINTS
    removePoint(point) {
        const segments = this.getSegmentsWithPoint(point);
        for (const segment of segments) {
            this.removeSegment(segment);
        }
        this.points.splice(this.points.indexOf(point), 1);
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

    getSegmentsWithPoint(point) {
        const segments = [];
        for (const segment of this.segments) {
            if (segment.includes(point)) {
                segments.push(segment);
            }
        }
        return segments;
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
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