//hasmap class
export class hashmap {
    constructor(loadfactor, capacity) {
        this.loadfactor = loadfactor;
        this.capacity = capacity;
        this.size = 0;
        this.buckets = new Array(capacity).fill(null).map(() => [])
    }

    //method to produde hash code
    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
    
        return hashCode;
    } 

    //method to set keys
    set(key, value) {

        // Check if we need to resize the hash map
        if (this.size >= this.capacity * this.loadfactor) {
            this.resize();
        }

        //get key index and the bucket to match
        const index = this.hash(key); 
        const bucket = this.buckets[index]; 

        //looping through bucket to check for matching values
        for (let i = 0; i < bucket.length; i++) {

            if (bucket[i][0] === key) {
                bucket[i][1] = value; 
                return;
            }
        }

        //incrementing and adding item
        bucket.push([key, value]);
        this.size++
    }

    //method to get key and display it in console
    get(key) {
        const index = this.hash(key); 
        const bucket = this.buckets[index]; 

        //search through the bucket for the key
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {  
                return bucket[i][1];  
            }
        }

        return null;
    }

    //method too return true or false if key in hash map
    has(key) {
        const index = this.hash(key); 
        const bucket = this.buckets[index]; 

        //searching for key in hashmap
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {  
                return `${true}: entry exists.`;
            }
        }

        //return false if not found
        return `${false}: entry does not exist.`;
    }

    //method to remove entry
    remove(key) {
        const index = this.hash(key); 
        const bucket = this.buckets[index]; 

        //searching for key in hashmap and removing if there
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {  
                bucket.splice(i, 1);
                return `${true}: Entry has been removed`;
            }
        }

        //return false if not found
        return `${false}: entry does not exist. (nothing removed)`;
    }
    
    //method to return number of keys in hashmap
    length() {
        let amount = 0; 

        //loop through all buckets
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i]; 

            //add the number of keys to the total
            amount += bucket.length;
        }

        //return total
        return `Number of entries: ${amount}.`;
    }

    //method to clear all all entries in hashmap
    clear() {
        //loop through all buckets
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i]; 

            //removing all buckets
            bucket.splice(0, bucket.length);
        }

        //return total
        return `Buckets have been cleared.`;
    }

    //method to return an arrayn of all keys in hasmap
    keys() {
        //initliazing empty array and buckets and indexes
        let keylist = [];

        //loop through all buckets
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i]; 

            // Iterate through each key-value pair in the bucket
            for (let [key] of bucket) {
                keylist.push(key); 
            }
        }

        //returning array
        return `Keys: ${keylist}`;
    }

    //method to return array of values in hashmap
    values() {
        //initliazing empty array and buckets and indexes
        let valuelist = [];

        //loop through all buckets
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i]; 

            // Iterate through each key-value pair in the bucket
            for (let [key, value] of bucket) {
                valuelist.push(value); 
            }
        }

        //returning array
        return `Values: ${valuelist}`;
    }

    //method to return an array that contains each key, value pair
    entries() {
        //initliazing empty array and buckets and indexes
        let entrylist = [];

        //loop through all buckets
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i]; 

            // Iterate through each key-value pair in the bucket
            for (let [key, value] of bucket) {
                entrylist.push([key, value]); 
            }
        }

        //returning array
        return `Entries: ${entrylist}`;
    }

    // Method to resize (double the capacity and rehash entries)
    resize() {
        // Double the capacity
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity).fill(null).map(() => []);

        // Rehash all entries into the new buckets
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];

            for (let j = 0; j < bucket.length; j++) {
                const [key, value] = bucket[j];
                const newIndex = this.hash(key) % newCapacity;
                newBuckets[newIndex].push([key, value]);
            }
        }

        // Update the capacity and buckets
        this.capacity = newCapacity;
        this.buckets = newBuckets;
    }
}