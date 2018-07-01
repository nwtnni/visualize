export default class HashMap {

    constructor() {
        this.buckets = [];
        this.size = 0;
        this.capacity = 10;
    }

    contains(key) {
        const index = this._hash(key.hash()); 
        if (this.buckets[index] === undefined) {
            return false;
        }

        return this.buckets[index].find(k => key.equals(key)) !== undefined;
    }

    put(key, value) {

        if (this.size * 2 > this.capacity) {
            this._double();
        }

        const index = this._hash(key.hash());
        if (this.buckets[index] === undefined) {
            this.buckets[index] = [];
        }

        this.buckets[index].push([key, value]);
    }

    get(key) {
        const index = this._hash(key.hash());
        if (this.buckets[index] === undefined) {
            return undefined;
        }

        return this.buckets[index].find(k => key.equals(k));
    }

    _hash(hash) {
        return hash % this.capacity;
    }

    _double() {
        let previous = this.capacity;
        this.capacity *= 2;
        let expanded = new Array(this.capacity).fill(undefined);

        for (let i = 0; i < previous; i++) {
            for (const [key, value] in this.buckets[i]) {
                const j = this._hash(key.hash());
                
                if (expanded[j] === undefined) {
                    expanded[j] = [];
                }

                expanded[j].push([key, value]);
            }
        }

        this.buckets = expanded;
    }
}
