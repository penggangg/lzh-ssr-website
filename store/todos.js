export const state = () => ({
  list: [],
  pgtest: '123'
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  pgtest (state, content) {
    if (content === '哈哈') {
      state.pgtest = '成功'
    }
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
