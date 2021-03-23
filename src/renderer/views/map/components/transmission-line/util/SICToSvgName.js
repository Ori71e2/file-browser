const CodeToName = [
  { code: 'SIC110100', enName: 'mapBuildingOther', cnName: '其他', firstClass: '通道', secondeClass: '静态', thirdClass: '建筑物', thirdClassEnName: 'building' },
  { code: 'SIC110101', enName: 'mapBuildingRoad', cnName: '道路', firstClass: '通道', secondeClass: '静态', thirdClass: '建筑物', thirdClassEnName: 'building' },
  { code: 'SIC110102', enName: 'mapBuildingPiping', cnName: '管道', firstClass: '通道', secondeClass: '静态', thirdClass: '建筑物', thirdClassEnName: 'building' },
  { code: 'SIC110103', enName: 'mapBuildingFloor', cnName: '楼房', firstClass: '通道', secondeClass: '静态', thirdClass: '建筑物', thirdClassEnName: 'building' },
  { code: 'SIC110104', enName: 'mapBuildingFactory', cnName: '厂房', firstClass: '通道', secondeClass: '静态', thirdClass: '建筑物', thirdClassEnName: 'building' },
  { code: 'SIC110200', enName: 'mapPlantOtherTree', cnName: '其他', firstClass: '通道', secondeClass: '静态', thirdClass: '树木', thirdClassEnName: 'plant' },
  { code: 'SIC110201', enName: 'mapPlantPoplar', cnName: '杨树', firstClass: '通道', secondeClass: '静态', thirdClass: '树木', thirdClassEnName: 'plant' },
  { code: 'SIC110202', enName: 'mapPlantAfforestationTree', cnName: '绿化树', firstClass: '通道', secondeClass: '静态', thirdClass: '树木', thirdClassEnName: 'plant' },
  { code: 'SIC110203', enName: 'mapPlantWeedTree', cnName: '杂树', firstClass: '通道', secondeClass: '静态', thirdClass: '树木', thirdClassEnName: 'plant' },
  { code: 'SIC110300', enName: 'mapFloaterOther', cnName: '其他', firstClass: '通道', secondeClass: '静态', thirdClass: '漂浮物', thirdClassEnName: 'floater' },
  { code: 'SIC110301', enName: 'mapFloaterAntiaircraftAdvertising', cnName: '高炮', firstClass: '通道', secondeClass: '静态', thirdClass: '漂浮物', thirdClassEnName: 'floater' },
  { code: 'SIC110302', enName: 'mapFloaterBillBoard', cnName: '广告牌', firstClass: '通道', secondeClass: '静态', thirdClass: '漂浮物', thirdClassEnName: 'floater' },
  { code: 'SIC110303', enName: 'mapFloaterBalloon', cnName: '气球', firstClass: '通道', secondeClass: '静态', thirdClass: '漂浮物', thirdClassEnName: 'floater' },
  { code: 'SIC110304', enName: 'mapFloaterInflatableObject', cnName: '充气物', firstClass: '通道', secondeClass: '静态', thirdClass: '漂浮物', thirdClassEnName: 'floater' },
  { code: 'SIC110305', enName: 'mapFloaterLargeGreenhouse', cnName: '大棚', firstClass: '通道', secondeClass: '静态', thirdClass: '漂浮物', thirdClassEnName: 'floater' },
  { code: 'SIC110400', enName: 'mapRiverOther', cnName: '其他', firstClass: '通道', secondeClass: '静态', thirdClass: '沟渠', thirdClassEnName: 'river' },
  { code: 'SIC110401', enName: 'mapRiverFish', cnName: '鱼塘', firstClass: '通道', secondeClass: '静态', thirdClass: '沟渠', thirdClassEnName: 'river' },
  { code: 'SIC110402', enName: 'mapRiverDitch', cnName: '河流', firstClass: '通道', secondeClass: '静态', thirdClass: '沟渠', thirdClassEnName: 'river' },
  { code: 'SIC110403', enName: 'mapRiverCrab', cnName: '螃蟹塘', firstClass: '通道', secondeClass: '静态', thirdClass: '沟渠', thirdClassEnName: 'river' },
  { code: 'SIC110404', enName: 'mapRiverLobster', cnName: '龙虾塘', firstClass: '通道', secondeClass: '静态', thirdClass: '沟渠', thirdClassEnName: 'river' },
  { code: 'SIC110405', enName: 'mapRiverCannal', cnName: '运河', firstClass: '通道', secondeClass: '静态', thirdClass: '沟渠', thirdClassEnName: 'river' },
  { code: 'SIC110406', enName: 'mapRiverYellowRiver', cnName: '废黄河', firstClass: '通道', secondeClass: '静态', thirdClass: '沟渠', thirdClassEnName: 'river' },
  { code: 'SIC120100', enName: 'mapMachOtherCar', cnName: '其他', firstClass: '通道', secondeClass: '动态', thirdClass: '机械', thirdClassEnName: 'mach' },
  { code: 'SIC120101', enName: 'mapMachCrane', cnName: '吊车', firstClass: '通道', secondeClass: '动态', thirdClass: '机械', thirdClassEnName: 'mach' },
  { code: 'SIC120102', enName: 'mapMachTowerCrane', cnName: '塔吊', firstClass: '通道', secondeClass: '动态', thirdClass: '机械', thirdClassEnName: 'mach' },
  { code: 'SIC120103', enName: 'mapMachExcavator', cnName: '挖机', firstClass: '通道', secondeClass: '动态', thirdClass: '机械', thirdClassEnName: 'mach' },
  { code: 'SIC120104', enName: 'mapMachTrack', cnName: '货车', firstClass: '通道', secondeClass: '动态', thirdClass: '机械', thirdClassEnName: 'mach' },
  { code: 'SIC210100', enName: 'mapTowerOther', cnName: '其他', firstClass: '本体', secondeClass: '静态', thirdClass: '杆塔', thirdClassEnName: 'tower' },
  { code: 'SIC210101', enName: 'mapTowerBase', cnName: '基础', firstClass: '本体', secondeClass: '静态', thirdClass: '杆塔', thirdClassEnName: 'tower' },
  { code: 'SIC210202', enName: 'mapTowerMaterial', cnName: '塔材', firstClass: '本体', secondeClass: '静态', thirdClass: '杆塔', thirdClassEnName: 'tower' },
  { code: 'SIC210303', enName: 'mapTowerArmourClamp', cnName: '金具', firstClass: '本体', secondeClass: '静态', thirdClass: '杆塔', thirdClassEnName: 'tower' },
  { code: 'SIC210404', enName: 'mapTowerBolt', cnName: '螺栓', firstClass: '本体', secondeClass: '静态', thirdClass: '杆塔', thirdClassEnName: 'tower' },
  { code: 'SIC220100', enName: 'mapMonitorOther', cnName: '其他', firstClass: '本体', secondeClass: '动态', thirdClass: '监测', thirdClassEnName: 'monitor' },
  { code: 'SIC220101', enName: 'mapMonitorPicture', cnName: '图像监控', firstClass: '本体', secondeClass: '动态', thirdClass: '监测', thirdClassEnName: 'monitor' },
  { code: 'SIC220102', enName: 'mapMonitorVideo', cnName: '视频监控', firstClass: '本体', secondeClass: '动态', thirdClass: '监测', thirdClassEnName: 'monitor' },
  { code: 'SIC220103', enName: 'mapMonitorFault', cnName: '故障监测仪', firstClass: '本体', secondeClass: '动态', thirdClass: '监测', thirdClassEnName: 'monitor' },
  { code: 'SIC220200', enName: 'mapSignOtherBoard', cnName: '其他', firstClass: '本体', secondeClass: '动态', thirdClass: '标识牌', thirdClassEnName: 'sign' },
  { code: 'SIC220201', enName: 'mapSignHighVoltageWarning', cnName: '高压警示牌', firstClass: '本体', secondeClass: '动态', thirdClass: '标识牌', thirdClassEnName: 'sign' },
  { code: 'SIC220202', enName: 'mapSignProhibitionOfConstruction', cnName: '禁止施工牌', firstClass: '本体', secondeClass: '动态', thirdClass: '标识牌', thirdClassEnName: 'sign' },
  { code: 'SIC220203', enName: 'mapSignNoFishing', cnName: '钓鱼牌', firstClass: '本体', secondeClass: '动态', thirdClass: '标识牌', thirdClassEnName: 'sign' },
  { code: 'SIC220300', enName: 'mapProtectOther', cnName: '其他', firstClass: '本体', secondeClass: '动态', thirdClass: '保护', thirdClassEnName: 'protect' },
  { code: 'SIC220301', enName: 'mapProtectCrashBearer', cnName: '防撞墩', firstClass: '本体', secondeClass: '动态', thirdClass: '保护', thirdClassEnName: 'protect' },
  { code: 'SIC220302', enName: 'mapProtectCrashBarrier', cnName: '防撞围栏', firstClass: '本体', secondeClass: '动态', thirdClass: '保护', thirdClassEnName: 'protect' },
  { code: 'SIC220303', enName: 'mapProtectRail', cnName: '围栏', firstClass: '本体', secondeClass: '动态', thirdClass: '保护', thirdClassEnName: 'protect' },
  { code: 'SIC220304', enName: 'mapProtectHeightLimit', cnName: '限高架', firstClass: '本体', secondeClass: '动态', thirdClass: '保护', thirdClassEnName: 'protect' }
]

class SICToSvgName {
  constructor() {
    this.codeMap = new Map()
    this.thirdClassMap = new Map()
    CodeToName.forEach((value, key) => {
      this.codeMap.set(value.code, value)
    })
    CodeToName.forEach((value, key) => {
      if (!this.thirdClassMap.has(value.thirdClassEnName)) {
        this.thirdClassMap.set(value.thirdClassEnName, [value])
      } else {
        const tmp = this.thirdClassMap.get(value.thirdClassEnName)
        tmp.push(value)
        this.thirdClassMap.set(value.thirdClassEnName, tmp)
      }
    })
  }
  getCodeList() {
    return CodeToName
  }
  getCodeListMap() {
    return this.thirdClassMap
  }
  searchEnName(code) {
    return this.codeMap.get(code).enName
  }
  searchCnName(code) {
    return this.codeMap.get(code).cnName
  }
}
export default SICToSvgName
