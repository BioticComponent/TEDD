class EventQueue {
    constructor() {
        this.deliveries = [];
    }

    enqueue(event) {
        this.deliveries.push(event);
    }

    remove(event) {
        if (this.isEmpty()) {
            console.log("You can not dequeue from an empty queue");
            return;
        }
        return this.deliveries.splice(this.deliveries.indexOf(event), 1);
    }

    isEmpty() {
        return this.deliveries.length == 0
    }
}