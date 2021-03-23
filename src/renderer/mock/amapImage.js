import Mock from 'mockjs'
const Random = Mock.Random
export default {
  fetchImagesList: () => {
    const arr = []
    for (let i = 0; i < 100; i++) {
      const text = 'Mock.js_' + i
      arr.push(Random.image('1200x900', '#00405d', '#FFF', text))
    }
    return { data: arr }
  }
}
