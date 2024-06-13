/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    //BFS style recursion
    if(!this.root) return 0;

    let result = 0;
    const sumQueue = [this.root];
    
    while(sumQueue.length > 0){
      let current = sumQueue.shift();
      for(let child of current.children){
        sumQueue.push(child);
      }
      
      result += current.val;
    }

    return result;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if(!this.root) return 0;

    let result = 0;
    const evenQueue = [this.root];
    
    while(evenQueue.length > 0){
      let current = evenQueue.shift();
      for(let child of current.children){
        evenQueue.push(child);
        }
        
      if(current.val % 2 === 0) result += 1;
    }
    return result;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if(!this.root) return 0;

    let result = 0;
    const greaterQueue = [this.root];
    
    while(greaterQueue.length > 0){
      let current = greaterQueue.shift();
      for(let child of current.children){
        greaterQueue.push(child);
        }
        
      if(current.val > lowerBound) result += 1;
    }
    return result;

  }
}

module.exports = { Tree, TreeNode };
