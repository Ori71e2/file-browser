// import { Node, MultiwayTree } from './multiwayTree.js'
require('./multiwayTree.js')

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
