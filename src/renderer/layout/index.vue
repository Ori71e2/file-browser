<template>
  <div>
    <div id="header">
      <div id="window-panel">
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
      <div id="window-search">
        <el-input size="mini" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
      </div>
      <div id="window-control" class>
        <div v-on:click="onActionMenuClick('minimize')"><svg-icon class-name="square-icon" icon-class="minimize"></svg-icon></div>
        <div v-on:click="onActionMenuClick('maximize')"><svg-icon class-name="square-icon" :icon-class="maximize"></svg-icon></div>
        <div v-on:click="onActionMenuClick('close')"><svg-icon class-name="square-icon" icon-class="close"></svg-icon></div>
      </div>
    </div>
    <div id="wrapper">
      <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
      <main>
        <div class="left-side">
          <span class="title">
            Welcome to your new project!
          </span>
        </div>
        <router-view :key="key"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Message from '@/../utils/message.js'
import { constants } from 'fs'
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  $header-height: 32px;
  $header-background-color: #DCDFE6;
  $window-panel-width: 400px;
  $window-control-width: 100px;
  $window-search-width: $window-panel-width + $window-control-width;
  @mixin only-click {
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
  @mixin vertical-center {
    position: relative;
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
  }
  #header {
    -webkit-app-region: drag;
    height: $header-height;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: $header-background-color;
  }
  #window-panel {
    flex-shrink: 0;
    height: 100%;
    width: $window-panel-width;
    display: flex;
    -webkit-app-region: no-drag;
    @include only-click;
    div span{
      @include vertical-center;
    }
  }
  #window-search {
    flex-shrink: 0;
    height: 100%;
    width: calc(80vw - #{$window-search-width});
    div {
      width: 100%;
      -webkit-app-region: no-drag;
      @include vertical-center;
    }
  }
  #window-control {
    flex-shrink: 0;
    height: 100%;
    width: $window-control-width;
    -webkit-app-region: no-drag;
    @include only-click;
    div:nth-child(1) {
      margin-right: 25px;
    }
    div:nth-child(3) {
      margin-left: 25px;
    }
    div {
      height: 100%;
      @include vertical-center;
    }
  }
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
