// Basic min-heap implementation.
export default class Heap {

    constructor(compare) {
        this.compare = compare;
        this.heap = [0];
    }

    push(element) {

        // Position of current slot
        var current = this.heap.length;

        // Partially applied comparator
        var compare = other => this.compare(element, other);

        // Element at index divided by two
        var halve = index => this.heap[Math.trunc(index / 2)];

        // Placeholder element
        this.heap.push(null);

        // Bubble up
        while (current > 1 && compare(halve(current)) < 0) {
            var next = Math.trunc(current / 2);
            this.heap[current] = this.heap[next];
            current = next;
        }

        // Place element
        this.heap[current] = element;
    }

    peek() {
        return this.heap[1];
    }

    pop() {

        // Min element
        var popped = this.heap[1];

        // Element to bubble down
        var element = this.heap.pop();

        // Partially applied comparator
        var compare = other => this.compare(element, other);

        // Position of current slot
        var current = 1;

        // Bubble down
        while (true) {

            var l = current * 2;
            var r = l + 1;

            var el = this.heap[l];
            var er = this.heap[r];

            // No children left
            if (el == undefined) {
                break;
            }

            // Only one child
            else if (er == undefined) {
                if (compare(el) > 0) {
                    this.heap[current] = el;
                    current = l;
                }
                break;
            }

            // Current element smaller than children
            if (compare(el) <= 0 && compare(er) <= 0) {
                break;
            }

            // Otherwise if left is the smaller
            else if (this.compare(el, er) <= 0) {
                this.heap[current] = el;
                current = l;
            }

            // Otherwise right
            else {
                this.heap[current] = er;
                current = r;
            }
        }

        this.heap[current] = element;
        return popped;
    }

    update(element) {

        // Position of current slot
        var current = this.heap.indexOf(element);

        // Partially applied comparator
        var compare = other => this.compare(element, other);

        // Element at index divided by two
        var halve = index => this.heap[Math.trunc(index / 2)];

        // Bubble up
        while (current > 1 && compare(halve(current)) < 0) {
            var next = Math.trunc(current / 2);
            this.heap[current] = this.heap[next];
            current = next;
        }

        // Place element
        this.heap[current] = element;

    }

    empty() {
        return this.heap.length == 1;
    }
}
