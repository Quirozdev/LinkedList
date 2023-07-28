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
    if (this.isEmpty()) {
      this.head = new Node(value);
    } else {
      this.tail.nextNode = new Node(value);
    }
  }

  prepend(value) {
    if (this.isEmpty()) {
      this.head = new Node(value);
    } else {
      const currentHead = { ...this.head };
      this.head = new Node(value);
      this.head.nextNode = currentHead;
    }
  }

  get size() {
    let counter = 0;
    this.forEachNode(() => {
      counter++;
    });
    return counter;
  }

  findByCallback(callback) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode !== null) {
      if (callback(currentNode, index)) {
        return { index: index, node: currentNode };
      }
      currentNode = currentNode.nextNode;
      index++;
    }
  }

  get tail() {
    return this.findByCallback((node) => {
      return node.nextNode === null;
    }).node;
  }

  at(index) {
    return this.findByCallback((node, nodeIndex) => {
      return index === nodeIndex;
    })?.node;
  }

  isEmpty() {
    return this.head === null;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Linked list is empty');
    }
    if (this.tail === this.head) {
      this.head = null;
      return;
    }

    const previousNodeToTail = this.findByCallback((node) => {
      return node.nextNode === this.tail;
    }).node;
    previousNodeToTail.nextNode = null;
  }

  contains(value) {
    const nodeWithValue = this.findByCallback((node) => {
      return node.value === value;
    })?.node;
    if (nodeWithValue) {
      return true;
    }
    return false;
  }

  find(value) {
    const index = this.findByCallback((node) => {
      return node.value === value;
    })?.index;
    if (index !== undefined) {
      return index;
    }
    return null;
  }

  insertAt(value, index) {
    if (index === 0) {
      const currentHead = this.head;
      this.head = new Node(value);
      this.head.nextNode = currentHead;
      return;
    }
    const previousNode = this.findByCallback((node, nodeIndex) => {
      return index - 1 === nodeIndex;
    })?.node;
    const currentNodeAtThisIndex = previousNode?.nextNode;
    if (!currentNodeAtThisIndex) throw new Error('Invalid index, out of range');
    const newNode = new Node(value);
    previousNode.nextNode = newNode;
    newNode.nextNode = currentNodeAtThisIndex;
  }

  removeAt(index) {
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    }
    const previousNode = this.findByCallback((node, nodeIndex) => {
      return index - 1 === nodeIndex;
    })?.node;
    const nodeToRemove = previousNode?.nextNode;
    if (!nodeToRemove) throw new Error('Invalid index, out of range');
    const nextNode = nodeToRemove.nextNode;

    previousNode.nextNode = nextNode;
  }

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
linkedList.pop();

console.log(linkedList.toString());
console.log(linkedList.contains(41));
console.log(linkedList.find(41));
linkedList.removeAt(3);
console.log(linkedList.toString());
linkedList.insertAt(83, 0);
console.log(linkedList.toString());
linkedList.insertAt(112, 2);
console.log(linkedList.toString());
linkedList.insertAt(0, 4);
console.log(linkedList.toString());
linkedList.insertAt(31, 0);
console.log(linkedList.toString());
linkedList.pop();
console.log(linkedList.toString());
console.log(linkedList.tail);
