export function Node(pos, g, h) {
    this.x = pos[0];
    this.y = pos[1];
    this.g = g; //G cost = distance from starting node
    this.h = h; //H cost (heuristic) = distance from end node
    this.d = this.g + this.h; //F cost = G + H
    this.parent = null;
}

Node.prototype.setParent = function(parentNode) {
    this.parent = parentNode;
}

Node.prototype.UpdateGCost = function(cost) {
    this.g = cost;
    this.d = this.g + this.h;
}

Node.prototype.getGCost = function() {
    return this.g;
}

Node.prototype.getHCost = function() {
    return this.h;
}

Node.prototype.getFCost = function() {
    return this.d;
}

Node.prototype.getPos = function() {
    return [this.x, this.y];
}

export function calcGCost(startPos, curPos) {
    return Math.abs(startPos[0] - curPos[0]) * 10 + Math.abs(startPos[1] - curPos[1]) * 10;
}

export function calcHCost(curPos, endPos) {
    return Math.abs(endPos[0] - curPos[0]) * 10 + Math.abs(endPos[1] - curPos[1]) * 10;
}

export function found(pos, end) {
    return pos[0] === end[0] && pos[1] === end[1];
}