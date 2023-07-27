class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  forEachNode(callback) {
    let currentNode = this.head;
    while (currentNode !== null) {
      callback(currentNode);
      currentNode = currentNode.nextNode;
    }
  }

  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
    } else {
      this.tail.nextNode = new Node(value);
    }
  }
  prepend(value) {
    if (this.head === null) {
      this.head = new Node(value);
    } else {
      const currentHead = { ...this.head };
      this.head = new Node(value);
      this.head.nextNode = currentHead;
    }
  }

  get size() {
    let counter = 0;
    this.forEachNode((node) => {
      counter++;
    });
    return counter;
  }

  get tail() {
    return this.findByCallback((node) => {
      if (node.nextNode === null) {
        return node;
      }
    });
  }

  findByCallback(callback) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode !== null) {
      if (callback(currentNode, index++)) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
    }
  }

  at(index) {
    return this.findByCallback((node, nodeIndex) => {
      if (index === nodeIndex) {
        return true;
      }
    });
  }

  pop() {}
  contains(value) {}
  find(value) {}
  toString() {
    let stringifiedLinkedList = '';
    this.forEachNode((currentNode) => {
      stringifiedLinkedList += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    });
    stringifiedLinkedList += 'null';
    return stringifiedLinkedList;
  }
}

const linkedList = new LinkedList();
linkedList.append(5);
linkedList.append(7);
linkedList.append('wow');
linkedList.append(3);
linkedList.prepend(41);
console.log(linkedList.toString());
console.log(linkedList.size);
console.log(linkedList.at(3));
