import Vue from 'vue'
import headers from '~/components/headers.vue'
import footers from '~/components/footer.vue'
Vue.component('headers', headers)
Vue.component('footers', footers)
Vue.component('jsx-example', {
  render (h) { // <-- h must be in scope
    return <div id="foo">bar</div>
  }
})
