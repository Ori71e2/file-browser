<template>
  <div class="click">
    <div>
      <svg-icon-exp :style-name="svgStyle" :icon-class="iconClass" :rotate="rotate"/>
    </div>
    <div :style="showButton" class="center">
      <el-dialog :visible.sync="firstDialogVisible" :before-close="handleClose" width="60%" append-to-body>
        <span slot="title"><i class="el-icon-info"/> Marker Info</span>
        <div>
          <picture-swiper/>
          <marker-content class="scroll"/>
          <el-dialog :visible.sync="secondDialogVisible" width="40%" title="内层 Dialog" append-to-body>
            <div/>
          </el-dialog>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="OpenSecondDialog">OpenSecond Dialog</el-button>
          <el-button @click="EditFirstDialog">Edit</el-button>
          <el-button type="primary" @click="ConfirmFirstDialog">Confirm</el-button>
        </span>
      </el-dialog>
      <el-button :style="buttonStyle" class="el-button-exp" size="mini" @click="showDialog">{{ iconContent }}</el-button>
    </div>
  </div>
</template>

<script>
import SICToSvgName from './util/SICToSvgName'
import CONSTANTS from './util/constant'
import svgIconExp from './components/SvgIconExp'
import pictureSwiper from './components/PictureSwiper'
import markerContent from './components/MarkerContent'
export default {
  components: {
    svgIconExp,
    pictureSwiper,
    markerContent
  },
  props: {
    id: {
      type: String | Number,
      default: null
    },
    svgIconCode: {
      type: String,
      default: ''
    },
    zoom: {
      type: Number,
      default: 9
    },
    voltageClass: {
      type: Number,
      default: 35
    },
    draggable: {
      type: Boolean,
      default: false
    },
    change: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      firstDialogVisible: false,
      firstDialogEdit: false,
      secondDialogVisible: false,
      sICToSvgName: new SICToSvgName()
    }
  },
  computed: {
    iconClass() {
      return this.sICToSvgName.searchEnName(this.svgIconCode)
    },
    iconContent() {
      return this.sICToSvgName.searchCnName(this.svgIconCode)
    },
    svgStyle() {
      const val = this.zoom
      return this.changeSvgStyle(val)
    },
    showButton() {
      const val = this.zoom
      return this.displayButton(val)
    },
    buttonStyle() {
      const val = this.voltageClass
      return this.changeButtonColor(val)
    },
    rotate() {
      return this.draggable
    },
    markerData() {
      const tmpData = JSON.parse(this.$store.state.markerData)
      return JSON.parse(tmpData)
    }
  },
  watch: {
    svgIconCode(val) {
      this.SICToSvgName(val)
    }
  },
  mounted() {
  },
  methods: {
    showDialog() {
      this.firstDialogVisible = true
      console.log(this.firstDialogVisible)
    },
    EditFirstDialog() {
      this.firstDialogEdit = true
    },
    ConfirmFirstDialog() {
      this.firstDialogEdit = false
      // Update And Pull
    },
    OpenSecondDialog() {
      this.secondDialogVisible = true
    },
    handleClose(done) {
      if (this.firstDialogEdit) {
        this.$confirm('Confirm Closing？').then(_ => {
          this.firstDialogEdit = false
          done()
        }).catch(_ => {
        })
      } else {
        done()
      }
    },
    changeButtonColor(val) {
      let color = '#FF0'
      if (val === 110) {
        color = CONSTANTS.LINE_110_COLOR
      } else if (val === 220) {
        color = CONSTANTS.LINE_220_COLOR
      }
      return {
        'color': color,
        'border-color': color
      }
    },
    displayButton(val) {
      let style = {}
      if (val <= 12) {
        style = {
          'display': 'none'
        }
      }
      return style
    },
    changeSvgStyle(val) {
      let style = {
        'width': '40px',
        'height': '40px'
      }
      if (val <= 8) {
        style = {
          'width': '0px',
          'height': '0px'
        }
      } else if (val <= 9) {
        style = {
          'width': '5px',
          'height': '5px'
        }
      } else if (val <= 10) {
        style = {
          'width': '7px',
          'height': '7px'
        }
      } else if (val <= 12) {
        style = {
          'width': '12px',
          'height': '12px'
        }
      } else if (val <= 13) {
        style = {
          'width': '20px',
          'height': '20px'
        }
      } else if (val <= 15) {
        style = {
          'width': '30px',
          'height': '30px'
        }
      } else if (val <= 17) {
        style = {
          'width': '40px',
          'height': '40px'
        }
      }
      return style
    }
  }
}
</script>
<style scoped>
.click {
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
  height: auto;
}
.scroll {
  height: 300px;
  overflow: auto;
}
.scroll::-webkit-scrollbar {/*滚动条整体样式*/
  width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #929191;
}
.scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #EDEDED;
}
.center {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.el-button-exp {
  padding: 6px 6px;
  font-size: 5px;
  border-radius: 4px;
}
.el-button-exp {
  display: inline-block;
  line-height: 0.5;
  white-space: nowrap;
  cursor: pointer;
  background:rgba(0,0,0,0);
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  padding: 7px 15px;
  font-size: 1px;
  border-radius: 4px;
  border-width: 1;
  border-style: solid;
}
</style>
