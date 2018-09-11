import Vue from 'vue'

Vue.mixin({
  methods: {
    /* 设置标题、描述、关键词 */
    $setSeo (title, description, keywords) {
      return { title: title,
        meta: [
          { hid: 'description', name: 'description', content: description },
          { hid: 'keywords', name: 'keywords', content: keywords }
        ] }
    }
  }})
