import HashMap from './map.js';

export default class HashSet {
    constructor() {
        this.map = new HashMap();
    }

    contains(key) {
        this.map.contains(key);        
    }

    put(key) {
        this.map.put(key, undefined);
    }
}
