export class hashmap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0;
        this.buckets = new Array(capacity).fill(null).map(() => []);
    }

    // Method to generate a hash code for the key
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    // Method to resize the hashmap
    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity).fill(null).map(() => []);
        
        // Rehash all entries into the new buckets
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for (let [key, value] of bucket) {
                const index = this.hash(key) % newCapacity;
                newBuckets[index].push([key, value]);
            }
        }

        this.capacity = newCapacity;
        this.buckets = newBuckets;
    }

    // Method to set key-value pair
    set(key, value) {
        // If the hashmap size exceeds the load factor threshold, resize it
        if (this.size >= this.capacity * this.loadFactor) {
            this.resize();
        }

        const index = this.hash(key) % this.capacity;
        let bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;
    }

    // Method to get the value by key
    get(key) {
        const index = this.hash(key) % this.capacity;
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }

        return null;
    }

    // Method to check if key exists
    has(key) {
        // Calculate the index for the key using the hash function and capacity
        const index = this.hash(key) % this.capacity;
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }

        return false;
    }

    // Method to remove a key-value pair
    remove(key) {
        // Calculate the index for the key using the hash function and capacity
        const index = this.hash(key) % this.capacity;
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    // Method to get the number of entries in the hashmap
    length() {
        return this.size;
    }

    // Method to clear all entries
    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    // Method to get all keys in the hashmap
    keys() {
        const keyList = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for (let [key] of bucket) {
                keyList.push(key);
            }
        }
        return keyList;
    }

    // Method to get all values in the hashmap
    values() {
        const valueList = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for (let [, value] of bucket) {
                valueList.push(value);
            }
        }
        return valueList;
    }

    // Method to get all entries (key-value pairs)
    entries() {
        const entryList = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for (let [key, value] of bucket) {
                entryList.push([key, value]);
            }
        }
        return entryList;
    }
}
