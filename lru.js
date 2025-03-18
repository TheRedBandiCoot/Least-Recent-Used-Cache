// LRUCache - (Least Recently Used Cache)

/**
 * Node {
 * next : Node | null
 * prev : Node | null
 * value : value
 * }
 */

class LRUCache {
  constructor(capacity) {
    this.capacity = Number(capacity);
    this.length = 0;
    this.map = new Map(); // <Key> : <Node Address>
    this.head = null;
    this.tail = null; // LRU Node
  }
  #removeNode(node) {
    if (!node) return;

    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node === this.head) {
      this.head = node.next;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }
  }
  get(key) {
    // Your Code Here
  }
  put(key, value) {
    // Check if we have capacity
    if (this.length === this.capacity && !this.map.has(key)) {
      this.#removeNode(this.tail);
    }

    // Case: If key is already in cache store
    if (this.map.has(key)) {
      // Remove the existing/old Node
      this.#removeNode(this.map.get(key));
    }
    // create a new Node
    const node = {
      next: this.head, // previous head for head node
      prev: null,
      key,
      value
    };

    this.map.set(key, node);

    // Add it To the Head
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }

    this.length += 1;
  }
  debug() {
    let current = this.head;
    const arr = [];

    while (current != null) {
      arr.push(current);
      current = current.next;
    }
    // console.log(this.map.get(1));
    // console.log(this.map.get(2));
    // console.log(this.map.get(3));
    // console.log('_________');
    // console.log('head', this.head);
    // console.log('tail', this.tail);

    return arr.reduce(
      (acc, curr) =>
        acc.concat(`-->[ [${curr.key}] : [${curr.value}] ]-->`),
      ''
    );
  }
}

const cache = new LRUCache(3);
cache.put(1, 10);
cache.put(2, 20);
cache.put(3, 30);

console.log(cache.debug());
