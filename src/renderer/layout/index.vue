<template>
  <div>
    <div style="-webkit-app-region: drag" id="header">
      <div id="window-panel">
        <p>Welcome</p>
      </div>
      <div id="window-control" class>
        <div v-on:click="onActionMenuClick('minimize')"><svg-icon class-name="square-icon" icon-class="minimize"></svg-icon></div>
        <div v-on:click="onActionMenuClick('maximize')"><svg-icon class-name="square-icon" icon-class="maximize"></svg-icon></div>
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
      </main>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Message from '@/../utils/message.js'
export default {
  name: 'layout',
  methods: {
    onActionMenuClick(menuType) {
      console.log('xx')
      ipcRenderer.send('main', new Message('frameController', menuType))
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
  #header {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* background-color: #DCDFE6; */
  }
  #header div {
    position: relative;
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
  }
  #window-panel {
    flex-shrink: 0;
    width: 60px;
  }
  #window-control {
    flex-shrink: 0;
    width: 100px;
  }
  #window-control {
    -webkit-app-region: no-drag;
  }
  #window-control div:nth-child(1) {
    margin-right: 25px;
  }
  #window-control div:nth-child(3) {
    margin-left: 25px;
  }
  .square-icon {
    font-size: 10px;
    cursor: pointer;
    vertical-align: -4px!important;
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
  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

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
