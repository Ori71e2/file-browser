class Node {
  constructor(id, label, watcher, extData) {
    this.id = id
    this.label = label
    this.extData = extData
    this.watcher = watcher
    this.parent = null
    this.children = []
  }
}
class MultiwayTree {
  constructor() {
    this._root = null
  }
  // 深度优先遍历
  traverseDF(callback) {
    let stack = [],
    found = false
    stack.unshift(this._root)
    let currentNode = stack.shift()
    while(!found && currentNode) {
      found = callback(currentNode) === true ? true : false
      if (!found) {
        stack.unshift(...currentNode.children)
        currentNode = stack.shift()
      }
    }
  }
  // 广度优先遍历
  traverseBF(callback) {
    let queue = [], found = false
    queue.push(this._root)
    let currentNode = queue.shift()
    while(!found && currentNode) {
      found = callback(currentNode) === true ? true : false
      if (!found) {
        queue.push(...currentNode.children)
        currentNode = queue.shift()
      }
    }
  }
  contains(callback, traversal) {
    traversal.call(this, callback)
  }
  addById(node, toNodeId, traversal) {
    // let node = new Node(...data)
    /**
     * 第一次添加到根节点,返回值为this，便于链式添加节点
     */
    if (this._root === null) {
      this._root = node
      return this
    }
    let parent = null
    /**
     * 回调函数node非上面定义node， toNode是参数
     */
    let callback = function(node) {
      if (node.id === toNodeId) {
        parent = node
        return true
      }
    }
    /**
     * 根据遍历方法查找父节点（遍历方法后面会讲到），然后把节点添加到父节点的children数组里，查找方法contains后面会讲到
     */
    this.contains(callback, traversal)
    if (parent) {
      parent.children.push(node)
      node.parent = parent
      return this
    } else {
      throw new Error('Cannot add node to a non-existent parent.')
    }
  }
  removeById(id, traversal) {
    let parent = null
    let childToRemove = null
    let callback = function(node) {
      if (node.id === id) {
        parent = node.parent
        return true
      }
    }
    this.contains(callback, traversal)
    if (parent) {
      let index = this._findIndex(parent.children, id)
      if (index < 0) {
        throw new Error('Node to remove does not exist.')
      } else {
        childToRemove = parent.children.splice(index, 1)
      }
    } else {
      throw new Error('Parent does not exist.')
    }
    return childToRemove
  }
  _findIndex(arr, id) {
    let index = -1
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i].id === id) {
        index = i
        break
      }
    }
    return index
  }
}

export { Node, MultiwayTree }

/*
let tree = new MultiwayTree()
id = 0
tree.addById(new Node(0, '/'))
  .addById(new Node(1, 'd1'), 0, tree.traverseBF)
  .addById(new Node(2, 'd2'), 0, tree.traverseBF)
  .addById(new Node(3, 'd3'), 0, tree.traverseBF)
  .addById(new Node(4, 'd4'), 1, tree.traverseBF)
  .addById(new Node(5, 'd5'), 1, tree.traverseBF)
  .addById(new Node(6, 'd1'), 2, tree.traverseBF)
console.group('traverseDF')
tree.traverseDF(function(node) {
  console.log(node.id)
})
console.groupEnd('traverseDF')
console.group('traverseBF')
tree.traverseBF(function(node) {
  console.log(node.id)
})
console.groupEnd('traverseBF')
// 深度优先查找
console.group('contains1')
tree.contains(function(node) {
  console.log(node.id)
  if (node.id === '2') {
    return true
  }
}, tree.traverseDF)
console.groupEnd('contains1')
// 广度优先查找
console.group('contains2')
tree.contains(function(node) {
  console.log(node.id)
  if (node.id === '1') {
    return true
  }
}, tree.traverseBF)
console.groupEnd('contains2')
tree.removeById(1, tree.traverseBF)
*/