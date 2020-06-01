function Node() {
    this.g = 0; //G cost = distance from starting node
    this.h = 0; //H cost (heuristic) = distance from end node
    this.f = this.g + this.h; //F cost = G + H
}