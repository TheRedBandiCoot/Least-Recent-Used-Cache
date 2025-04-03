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
    this.capacity = capacity;
    this.head = null;
    this.tail = null;
    this.map = new Map();
    this.length = 0;
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

  #addNodeToHead(node) {
    node.next = this.head;
    node.prev = null;

    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }

  get(key) {
    if (!this.map.has(key)) return null;

    const node = this.map.get(key);
    this.#removeNode(node);
    this.#addNodeToHead(node);

    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const existingNode = this.map.get(key);
      this.#removeNode(existingNode);
      this.length -= 1;
    } else if (this.length === this.capacity) {
      this.map.delete(this.tail.key);
      this.#removeNode(this.tail);
      this.length -= 1;
    }

    const newNode = { key, value, prev: null, next: null };
    this.#addNodeToHead(newNode);
    this.map.set(key, newNode);
    this.length += 1;
  }

  debug() {
    let current = this.head;
    const arr = [];
    while (current != null) {
      arr.push(`[${current.key}: ${current.value}]`);
      current = current.next;
    }
    return arr.join(' <-> ');
  }
}

// Test the LRUCache
const cache = new LRUCache(3);
cache.put(1, 10);
cache.put(2, 20);
console.log(cache.get(1)); // Output: 10
cache.put(3, 30);
cache.put(4, 40); // Evicts key 2
cache.put(1, 100);
console.log(cache.debug()); // Output: [4: 40] <-> [3: 30] <-> [1: 10]
