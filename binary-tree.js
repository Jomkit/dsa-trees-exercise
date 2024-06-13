/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let toVisitQueue = [this];
    let depth = 1;
    
    if(!this.root) return 0;
    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      depth += 1;
      
      if (!current.left && !current.right){
        return depth;
      }
      toVisitQueue.push(current.left);
      toVisitQueue.push(current.right);
      
    }
    

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let toVisitStack = [{node: this.root, depth:1}];
    let arrDepth = [];
    
    if(!this.root) return 0;
    
    while(toVisitStack.length) {
      let current = toVisitStack.pop();
      
      if(current.node.left){
        toVisitStack.push({node: current.node.left, depth: current.depth + 1});
      }
      if(current.node.right){
        toVisitStack.push({node: current.node.right, depth: current.depth + 1});
      }
      if(!current.node.left && !current.node.right){
        arrDepth.push(current.depth);
      }
    }
    return (arrDepth.reduce((a, b) => Math.max(a, b)));
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if(this.root === null) return 0;
    let res = 0;
    
    function maxSumRecursion(node) {
      if(node === null) return 0; 
      let leftSum = maxSumRecursion(node.left);
      let rightSum = maxSumRecursion(node.right);

      res = Math.max(res, node.val + leftSum + rightSum);
      return Math.max(node.val + leftSum, node.val + rightSum);
    }

    maxSumRecursion(this.root);
    return res;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(!this.root) return null;
    let result;
    let greaterArr = [];

    function nextLargerHelper(node){
      if(!node) return 0;
      let left = nextLargerHelper(node.left);
      let right = nextLargerHelper(node.right);
      
      if(left > lowerBound){
        greaterArr.push(left);
      }else if(right > lowerBound){
        greaterArr.push(right);
      }else if(node.val > lowerBound){
        greaterArr.push(node.val);
      }
      return node.val;
    }
    nextLargerHelper(this.root);
  
    return greaterArr.length === 0 ? null : Math.min(...greaterArr);
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

    // starting from root, recursively search for target and then return depth
    console.log("node 1", node1.val, "node 2", node2.val)
    const sameParent = (root, node1, node2) => {
      let left = false;
      let right = false;
      if(root.left==node1 || root.left==node2){
        if(root.right==node1 || root.right==node2){
          return true;
        } else{
          // not sameParent
          return false;
        }
      }

      if(root.right==node1 || root.right==node2){
        if(root.left==node1 || root.left==node2){
          return true;
        } else{
          // not sameParent
          return false;
        }
      }
      
      if(root.left!=null) {
        console.log("checking left");
        left = sameParent(root.left, node1, node2);
      }
      if(root.right!=null) {
        console.log("checking left");
        right = sameParent(root.right, node1, node2);
      }
      // return sameParent(root.left, node1, node2) && sameParent(root.right, node1, node2);
      return left || right;
    }
    // sameParent true == areCousins false
    if(sameParent(this.root, node1, node2)) {
      console.log("same parent");
      return false;
    }else {
      console.log("not same parent");
    }
    
    const depthFinder = (node, target) => {
      // I'm not including the below code because I think 
      // it's safe to assume the nodes exist on the tree
      // if(node.left === null && node.right === null){
      //   return 1;
      // }
      if(node.left == target || node.right == target){
        console.log("node found");
        return 1;
      };  

      //if one branch is null
      if(node.left === null){return depthFinder(node.right) + 1};
      if(node.right === null){return depthFinder(node.left) + 1};

      // if node has two branches
      return Math.max(depthFinder(node.left) + 1, depthFinder(node.right) + 1);
    }

    let nodeDepth1 = depthFinder(this.root, node1);
    let nodeDepth2 = depthFinder(this.root, node2);
    console.log(nodeDepth1, nodeDepth2)
    return nodeDepth1 == nodeDepth2 ? true : false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
