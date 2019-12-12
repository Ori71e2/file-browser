<template>
  <div>
    <div class="window-header">
      <div class="window-header-panel">
        <div><span><svg-icon class-name="star-icon" icon-class="star"></svg-icon></span></div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="window-header-search">
        <el-input size="mini" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
      </div>
      <div class="window-header-control">
        <div v-on:click="onActionMenuClick('minimize')"><svg-icon class-name="square-icon" icon-class="minimize"></svg-icon></div>
        <div v-on:click="onActionMenuClick('maximize')"><svg-icon class-name="square-icon" :icon-class="maximize"></svg-icon></div>
        <div v-on:click="onActionMenuClick('close')"><svg-icon class-name="square-icon" icon-class="close"></svg-icon></div>
      </div>
    </div>
    <div class="window-wrapper">
      <div class="window-wrapper-aside">
      </div>
      <div class="window-wrapper-nav" ref="drag" v-on:mousemove="test" v-dragWidth>
        <div>
          <span class="title">
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
          </span>
        </div>
        <div class="col-rewsize-div-style"></div>
      </div>
      <div class="window-wrapper-nav" v-dragWidth>
        <div>
          <span class="title">
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
            Welcome to your new project!
          </span>
        </div>
        <div class="col-rewsize-div-style"></div>
      </div>
      <div class="window-wrapper-main">
        <router-view :key="key"></router-view>
      </div>
    </div>
    <div class="window-footer">
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Message from '@/../utils/message.js'
import { constants, mkdir } from 'fs'
export default {
  name: 'layout',
  data() {
    return {
      isMaximize: false,
      searchInput: ''
    }
  },
  mounted() {
    this.addIpcListener()
  },
  computed: {
    maximize() {
      // 全屏图标选择与全屏状态应该是相反的
      return !this.isMaximize ? 'maximize' : 'unmaximize'
    },
    key() {
      return this.$route.path
    }
  },
  methods: {
    test(el) {
      // console.log(el)
    },
    onActionMenuClick(menuType) {
      ipcRenderer.send('main', new Message('frameController', menuType))
    },
    addIpcListener() {
      ipcRenderer.on('main-relpy', (e, { action, data }, arg) => {
        if (action === 'maximize') {
          // 由于本人的项目使用了 vue 所以只进行了数据的修改。
          // 实际操作根据自己架构情况来实现
          this.isMaximize = true
          console.log(action)
        } else {
          this.isMaximize = false
        }
      })
    },
    handleOver(e) {
      switch (e.type) {
        case 'mousedown':
          console.log(e.type)
          break
        case 'mouseup':
          console.log(e.type)
          break
        default:
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  .el-dropdown-link {
    cursor: pointer;
    // color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .star-icon {
    // margin: auto;
    font-size: 24px;
    cursor: pointer;
    vertical-align: -10px!important;
  }
  .square-icon {
    // margin: auto;
    font-size: 10px;
    cursor: pointer;
    vertical-align: -6px!important;
  }
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: calc(100vh - 30px);
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
