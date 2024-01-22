class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.context = this.canvas.getContext("2d");

        this.selected = null;
        this.hovered = null;

        this.#addEventListeners();
    }

    display() {
        this.graph.draw(this.context);
        if (this.selected) {
            this.selected.draw(this.context, { outline: true });
        }
    }

    // PRIVATE METHODS
    #addEventListeners() {
        this.canvas.addEventListener("mousedown", (event) => {
            const mouse = new Point(event.offsetX, event.offsetY);
            this.hovered = getNearestPoint(mouse, this.graph.points, 20);
            if (this.hovered) {
                this.selected = this.hovered;
                return;
            }
            this.graph.addPoint(mouse);
            this.selected = mouse;
        });
    }
}