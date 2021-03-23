<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" label-width="130px">
      <el-form-item label="Marke ID">
        <el-tag style="width: 100%">{{ form.id }}</el-tag>
      </el-form-item>
      <el-form-item label="Marker Name" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="Voltage Level" prop="voltageLevel">
        <el-select v-model="form.voltageLevel" placeholder="Select Voltage Level">
          <el-option label="220kV" value="220kV"/>
          <el-option label="110kV" value="110kV"/>
          <el-option label="35kV" value="35kV"/>
          <el-option label="" value=""/>
        </el-select>
      </el-form-item>
      <el-form-item label="Marker Type" prop="typeCode">
        <el-button class="open-dialog-button"><i class="el-icon-menu el-icon-menu--custom" @click="openDialog"/>{{ form.typeCodeCnName }}</el-button>
        <el-dialog :visible.sync="dialogVisible" width="60%" append-to-body @close="closeDialog">
          <span slot="title"><i class="el-icon-info"/> Icon</span>
          <div class="flexWrapper jumpButton">
            <el-button v-for="[mapkey, typeList] of markerTypeMap.entries()" :key="mapkey" type="primary" @click="jump(mapkey)">
              {{ typeList[0].thirdClass }}
            </el-button>
          </div>
          <div class="dialog-container scroll">
            <div v-for="[mapkey, typeList] of markerTypeMap.entries()" :key="mapkey" :id="mapkey" class="flexWrapper">
              <el-button v-for="(type, index) in typeList" :key="index" class="el-button--custom" @click="form.typeCode = type.code; form.typeCodeCnName = type.cnName">
                <svg-icon :icon-class="type.enName" class="icon-class--custom"/>
                <p>{{ type.thirdClass }}: {{ type.cnName }}</p>
              </el-button>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect">Cancel</el-button>
            <el-button type="primary" @click="confirmSelect">Confirm</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="Marker Position">
        <el-input v-model="form.position"/>
      </el-form-item>
      <el-form-item label="Belongs To Line" prop="line">
        <el-input v-model="form.line"/>
      </el-form-item>
      <el-form-item label="Tower One" prop="towerOne">
        <el-input v-model="form.towerOne"/>
      </el-form-item>
      <el-form-item label="Tower Two" prop="towerTwo">
        <el-input v-model="form.towerTwo"/>
      </el-form-item>
      <el-form-item label="Company">
        <el-input v-model="form.company"/>
      </el-form-item>
      <el-form-item label="Contact One">
        <el-input v-model="form.contactOne"/>
      </el-form-item>
      <el-form-item label="Phone One">
        <el-input v-model="form.phoneOne"/>
      </el-form-item>
      <el-form-item label="Contact Two">
        <el-input v-model="form.contactTwo"/>
      </el-form-item>
      <el-form-item label="Phone Two">
        <el-input v-model="form.phoneTwo"/>
      </el-form-item>
      <el-form-item label="Device Owner" prop="deviceOwner">
        <el-input v-model="form.deviceOwner"/>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description"/>
      </el-form-item>
      <el-form-item label="Remark">
        <el-input v-model="form.remark"/>
      </el-form-item>
      <el-form-item label="FindTime">
        <el-col :span="9">
          <el-form-item prop="findTime">
            <el-date-picker v-model="form.findTime" type="datetime" placeholder="Select Time" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="line"><span style="padding-left: 30%; font-weight: bold;">WriteOffTime</span></el-col>
        <el-col :span="9">
          <el-form-item prop="writeoffTime">
            <el-date-picker v-model="form.writeOffTime" type="datetime" placeholder="Select Time" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Submit</el-button>
        <el-button @click="resetForm('form')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import SICToSvgName from '../util/SICToSvgName'
export default {
  data() {
    return {
      form: {
        id: 1,
        name: '',
        voltageLevel: '',
        typeCode: '',
        typeCodeCnName: '',
        position: '',
        line: '',
        towerOne: '',
        towerTwo: '',
        compant: '',
        contactOne: '',
        phoneOne: '',
        contactTwo: '',
        phoneTwo: '',
        deviceOwner: '',
        findTime: '',
        writeOffTime: '',
        description: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please Input Marker Name', trigger: 'blur' },
          { min: 3, max: 50, message: 'Length 3-50', trigger: 'blur' }
        ],
        voltageLevel: [
          { required: true, message: 'Please Select Voltage Level', trigger: 'change' }
        ],
        typeCode: [
          { required: true, message: 'Please Select Marker Type', trigger: 'change' }
        ],
        line: [
          { required: true, message: 'Please Select Line', trigger: 'blur' }
        ],
        towerOne: [
          { required: true, message: 'Please Select Tower', trigger: 'blur' }
        ],
        towerTwo: [
          { required: true, message: 'Please Select Tower', trigger: 'blur' }
        ],
        deviceOwner: [
          { required: true, message: 'Please Select DeviceOwner', trigger: 'blur' }
        ],
        findTime: [
          { type: 'date', required: true, message: 'Please Select Time', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        description: [
          { required: true, message: 'Please Write Marker Details', trigger: 'blur' }
        ]
      },
      labelPosition: 'right',
      dialogVisible: false,
      sICToSvgName: new SICToSvgName()
    }
  },
  computed: {
    markerTypeMap() {
      console.log(this.sICToSvgName.getCodeListMap().values())
      return this.sICToSvgName.getCodeListMap()
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    cancelSelect() {
    },
    confirmSelect() {
      this.dialogVisible = false
    },
    openDialog() {
      this.dialogVisible = true
    },
    closeDialog() {
    },
    jump(id) {
      document.getElementById(id).scrollIntoView()
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  padding: 10px;
}
.dialog-container {
  width: 100%;
}
.open-dialog-button {
  width: 100%;
  text-align: left;
}
.el-icon-menu--custom {
  margin-right: 10px;
}
.jumpButton {
  margin-left: 5px;
  margin-bottom: 20px;
}
.flexWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.el-button--custom {
  width: 150px;
  height: 120px;
  margin: 5px;
}
.icon-class--custom {
  width: 60%;
  height: 75%;
}
.scroll {
  height: 600px;
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
</style>
