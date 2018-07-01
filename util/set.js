import { HashMap } from './map.js';

export class HashSet {
    constructor() {
        this.map = new HashMap();
    }

    contains(key) {
        return this.map.contains(key);        
    }

    put(key) {
        this.map.put(key, undefined);
    }
}
