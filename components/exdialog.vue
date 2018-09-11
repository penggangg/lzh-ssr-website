<template>
  <div>
    <div v-if="modal&&modelShow"
         class="v-modal"></div>
    <transition name="bounce"
                v-on:before-enter="beforeEnter"
                v-on:leave="afterLeave">
      <div v-if="visible"
           class="el-dialog__wrapper">
        <div class="el-dialog"
             v-bind:style="{width: _width,height: _height,backgroundColor: backgroundColor}">
          <div v-if="type=='message'||type=='alert'"
               class="el-dialog__header">
            <span class="el-dialog__title">{{title}}</span>
            <span class="layui-layer-setwin">
              <a @click="close()"
                 class="layui-layer-ico layui-layer-close layui-layer-close1"
                 href="javascript:;"></a>
            </span>
          </div>
          <span v-else-if="type=='banner'"
                class="layui-layer-setwin">
            <a @click="close()"
               class="layui-layer-ico layui-layer-close layui-layer-close2"
               href="javascript:;"></a>
          </span>
          <div v-else-if="type=='iform'"
               class="el-dialog-iform__header">
            <span class="layui-layer-setwin">
              <a @click="close()"
                 class="layui-layer-ico layui-layer-close layui-layer-close1"
                 href="javascript:;"></a>
            </span>
          </div>
          <div :class="'el-dialog__body '+(hasShadow?'hasShadow':'')" :style="{height: _height}">
            <slot>
              <template v-if="type=='alert'">
                <p class="layer-content">
                  <i v-if="icon"
                     class="layui-layer-ico layui-layer-ico0"></i>
                  {{content}}</p>
                <div class="btnBox">
                  <a href="javascript:;"
                     v-if="buttonSure"
                     @click="sure"
                     class="layerBtn layerBtnSure">确定</a>
                  <a href="javascript:;"
                     v-if="buttonClear"
                     @click="clear"
                     class="layerBtn layerBtnClear">取消</a>
                </div>
              </template>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    modal: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'banner'
    },
    content: {
      type: String,
      default: ''
    },
    buttonSure: {
      type: Boolean,
      default: true
    },
    buttonClear: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Boolean,
      default: false
    },
    hasShadow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    let a = this.type
    console.log(a, this.width)
    if (a === 'iform' && !this.width) {
      this._width = '460px'
    } else if (a === 'alert' && !this.width) {
      this._width = '260px'
    } else if (!this.width) {
      this._width = '1200px'
    } else {
      this._width = this.width
    }
    if (a === 'iform' && !this.height) {
      this._height = '270px'
    } else if (a === 'alert' && !this.height) {
      this._height = '154px'
    } else if (!this.height) {
      this._height = '620px'
    } else {
      this._height = this.height
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        document.body.style.overflowY = 'hidden'
        document.body.style.marginRight = '10px'
      } else {
        document.body.style.overflowY = 'auto'
        document.body.style.marginRight = '0px'
      }
    },
    type(a) {
      console.log(a, this.width)
      if (a === 'iform' && !this.width) {
        this._width = '460px'
      } else if (a === 'alert' && !this.width) {
        this._width = '260px'
      } else if (!this.width) {
        this._width = '1200px'
      } else {
        this._width = this.width
      }
      if (a === 'iform' && !this.height) {
        this._height = '270px'
      } else if (a === 'alert' && !this.height) {
        this._height = '112px'
      } else if (!this.height) {
        this._height = '620px'
      } else {
        this._height = this.height
      }
    }
  },
  data() {
    return {
      modelShow: false,
      _width: '1200px',
      _height: '620px'
    }
  },
  methods: {
    sure() {
      this.$emit('sure')
    },
    clear() {
      this.$emit('clear')
    },
    afterLeave() {
      this.modelShow = false
    },
    beforeEnter() {
      this.modelShow = true
    },
    close() {
      this.$emit('update:visible', false)
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.btnBox {
	padding-right: 10px;
}
.btnBox a {
	float: right;
	display: inline-block;
	height: 28px;
	line-height: 28px;
	margin: 6px 6px 0;
	padding: 0 15px;
	border: 1px solid #dedede;
	background-color: #f1f1f1;
	color: #333;
	border-radius: 2px;
	font-weight: 400;
	cursor: pointer;
	text-decoration: none;
}
.btnBox .layerBtnClear {
	border-color: #4898d5;
	background-color: #fff;
	color: #2e8ded;
}
.btnBox .layerBtnSure {
	border-color: #4898d5;
	background-color: #2e8ded;
	color: #fff;
}
.layui-layer-ico0 {
	position: absolute;
	top: 58px;
	left: 15px;
	_left: -40px;
	width: 30px;
	height: 30px;
	display: inline-block;
	vertical-align: top;
	background: url(~/assets/img/layericon.png) no-repeat;
}
.layer-content {
	padding: 20px 20px 20px 55px;
	text-align: left;
}
.el-dialog-iform__header {
	height: 44px;
}
.layui-layer-setwin {
	position: absolute;
	right: 15px;
	top: 15px;
	font-size: 0;
	line-height: initial;
}
.layui-layer-setwin .layui-layer-close1 {
	background-position: 1px -40px;
	cursor: pointer;
}
.layui-layer-setwin a {
	display: inline-block;
	position: relative;
	width: 16px;
	height: 16px;
	margin-left: 10px;
	font-size: 12px;
	_overflow: hidden;
}
.layui-layer-ico {
	background: url(~/assets/img/layericon.png) no-repeat;
}
.el-dialog__header {
	height: 42px;
	line-height: 42px;
	padding: 0 80px 0 20px;
	border-bottom: 1px solid #eee;
	font-size: 14px;
	color: #333;
	overflow: hidden;
	background-color: #f8f8f8;
}
.layui-layer-setwin .layui-layer-close2 {
	position: absolute;
	right: -28px;
	top: -28px;
	width: 30px;
	height: 30px;
	margin-left: 0;
	background-position: -149px -31px;
	_display: none;
}
.layui-layer-setwin .layui-layer-close2:hover {
	background-position: -180px -31px;
}
.layui-layer-ico {
	background: url(~/assets/img/layericon.png) no-repeat;
}
.layui-layer-setwin {
	position: absolute;
	right: 15px;
	top: 15px;
	font-size: 0;
	line-height: initial;
}
.el-dialog__body {
	height: 610px;
}
.el-dialog {
	background: #fff;
	border-radius: 2px;
	-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	box-sizing: border-box;
	width: 50%;
	overflow: inherit;
	z-index: 2030;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
.v-modal {
	z-index: 2026;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	background: #000;
}
.el-dialog__wrapper {
	overflow: inherit;
	z-index: 2030;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
.hasShadow{
  box-shadow: 1px 1px 50px rgba(0,0,0,.3);
}
.bounce-enter-active {
	animation: bounce-in 0.2s;
}
.bounce-leave-active {
	animation: bounce-out 0.2s;
}
@-webkit-keyframes bounce-out {
	100% {
		opacity: 0;
		-webkit-transform: scale(0.7);
		transform: scale(0.7);
	}
	30% {
		-webkit-transform: scale(1.05);
		transform: scale(1.05);
	}
	0% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}
@keyframes bounce-out {
	100% {
		opacity: 0;
		-webkit-transform: scale(0.7);
		-ms-transform: scale(0.7);
		transform: scale(0.7);
	}
	30% {
		-webkit-transform: scale(1.05);
		-ms-transform: scale(1.05);
		transform: scale(1.05);
	}
	0% {
		-webkit-transform: scale(1);
		-ms-transform: scale(1);
		transform: scale(1);
	}
}
@-webkit-keyframes bounce-in {
	0% {
		opacity: 0;
		-webkit-transform: translateY(2000px);
		transform: translateY(2000px);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}
}
@keyframes bounce-in {
	0% {
		opacity: 0;
		-webkit-transform: translateY(2000px);
		-ms-transform: translateY(2000px);
		transform: translateY(2000px);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateY(0);
		-ms-transform: translateY(0);
		transform: translateY(0);
	}
}
</style>


