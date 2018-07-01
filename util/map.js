export class HashMap {

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

        for (let i = 0; i < this.buckets[index].length; i++) {
            const [k, v] = this.buckets[index][i];

            if (key.equals(k)) {
                this.buckets[index][i] = [key, value];
                return;
            }
        }

        this.size += 1;
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
            if (this.buckets[i] === undefined) {
                continue;
            }

            for (let j = 0; j < this.buckets[i].length; j++) {
                let [key, value] = this.buckets[i][j];
                const k = this._hash(key.hash());

                if (expanded[k] === undefined) {
                    expanded[k] = [];
                }

                expanded[k].push([key, value]);
            }
        }

        console.log(expanded);
        this.buckets = expanded;
    }
}
