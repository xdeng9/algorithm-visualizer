export function PriorityQueue() {
    this.items = [];
    this.size = 0;
}

PriorityQueue.prototype.getLeftChildIndex = function(parentIndex) {
    return 2 * parentIndex + 1;
}

PriorityQueue.prototype.getRightChildIndex = function(parentIndex) {
  return 2 * parentIndex + 2;
};

PriorityQueue.prototype.getParentIndex = function(childIndex) {
  return (childIndex - 1) >> 1;
};

PriorityQueue.prototype.hasLeftChild = function(index) {
    return this.getLeftChildIndex(index) < this.size;
}

PriorityQueue.prototype.hasRightChild = function(index) {
    return this.getRightChildIndex(index) < this.size;
}

PriorityQueue.prototype.hasParent = function(index) {
    return this.getParentIndex(index) >= 0;
}

PriorityQueue.prototype.leftChild = function(index) {
    return this.items[this.getLeftChildIndex(index)];
}

PriorityQueue.prototype.rightChild = function (index) {
  return this.items[this.getRightChildIndex(index)];
};

PriorityQueue.prototype.parent = function(index) {
    return this.items[this.getParentIndex(index)];
}

PriorityQueue.prototype.swap = function(idx1, idx2) {
    [this.items[idx1], this.items[idx2]] = [this.items[idx2], this.items[idx1]];
}

PriorityQueue.prototype.remove = function() {
    if (this.size === 0) return null;
    let node = this.items[0];
    this.items[0] = this.items[this.size - 1];
    this.heapifyDown();
    this.size--;
    return node;
}

PriorityQueue.prototype.add = function(node) {
    this.items[this.size] = node;
    this.size++;
    this.heapifyUp();
}

PriorityQueue.prototype.size = function() {
    return this.size;
}

PriorityQueue.prototype.heapifyUp = function () {
    let index = this.size - 1;
    while (this.hasParent(index) && this.parent(index).d > this.items[index].d) {
        this.swap(index, this.getParentIndex(index));
        index = this.getParentIndex(index);
    }
}

PriorityQueue.prototype.heapifyDown = function() {
    let index = 0;
    while (this.hasLeftChild(index)) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        if (this.hasRightChild(index) && this.rightChild(index).d < this.leftChild(index).d) {
            smallerChildIndex = this.getRightChildIndex(index);
        }

        if (this.items[index] < this.items[smallerChildIndex]) break;
        this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
    }
}

export function Node(k, d) {
    this.k = k;
    this.d = d;
}

export const buildAdjList = (rows, cols) => {
    let graph = {};
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cellId = `${i}-${j}`;
            let cell = document.getElementById(cellId);
            
            if (cell.classList.contains('wall')) continue;

            graph[cellId] = {};
            addToGraph(graph[cellId], getAdjNodes([i, j], rows, cols))
        }
    }
    return graph;
  }

  export const getSP = (path, src, tar) => {
      let prev = tar;
      let shortestPath = [];

      while (prev !== src) {
        shortestPath.unshift(prev);
        prev = path[prev].k;
      }
      shortestPath.unshift(src);

      return shortestPath;
  }

const getAdjNodes = (pos, H, W) => {

    const dirs = [
        [-1, 0],
        [0, 1],
        // [-1, 1],
        // [1, 1],
        // [1, -1],
        [1, 0],
        // [-1, -1],
        [0, -1],
    ]

    let [x, y] = pos;
    let nodes = [];

    for (let dir of dirs) {
        let [dx, dy] = dir;
        let newX = dx + x;
        let newY = dy + y;

        if (newX >= 0 && newX < H && newY >= 0 && newY < W) {
            if (!document.getElementById(`${newX}-${newY}`).classList.contains('wall'))
                nodes.push([newX, newY]);
        }
    }
    return nodes;
}

const addToGraph = (node, neighbors) => {
    for (let neighbor of neighbors) {
        let [x, y] = neighbor;
        let key = x + '-' + y;
        node[key] = 1;
    }
}
