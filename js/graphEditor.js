class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.context = this.canvas.getContext("2d");

        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.#addEventListeners();
    }

    display() {
        this.graph.draw(this.context);
        if (this.hovered) {
            this.hovered.draw(this.context, { fill: true});
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected, intent).draw(context, { dash: [3, 3] });
            this.selected.draw(this.context, { outline: true });
        }
    }

    // PRIVATE METHODS
    #addEventListeners() {
        this.canvas.addEventListener("mousedown", this.#handleMouseDown);
        this.canvas.addEventListener("mousemove", (event) => {
            this.mouse = new Point(event.offsetX, event.offsetY);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 20);
            if (this.dragging == true) {
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
        });
        this.canvas.addEventListener("contextmenu", (event) => event.preventDefault());
        this.canvas.addEventListener("mouseup", (event) => this.dragging = false);
    }

    #handleMouseDown(event) {
        if (event.button == 2) { // right click
            if (this.selected) {
                this.selected = null;
            } else if (this.hovered) {
                this.#removePoint(this.hovered);
            }
        }
        if (event.button == 0) { // left click
            if (this.hovered) {
                this.#select(this.hovered);
                this.dragging = true;
                return;
            }
            this.graph.addPoint(this.mouse);
            this.#select(this.mouse);
            this.hovered = this.mouse;
        }
    }

    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point) {
            this.selected = null;
        }
    }

    #select(point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }
}