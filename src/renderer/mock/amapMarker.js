
const MarkersList = [
  { id: '1', position: [118.720243, 33.776052], SICCode: 'SIC110401', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:01', modifyTime: '2019-01-25 13:23:01', deleteTime: '2019-01-26 15:23:01', registerTime: '2019-01-25 09:23:01', startTime: '2019-01-25 10:23:01', endTime: '2019-01-25 18:23:01', deviceOwner: 'syy' },
  { id: '2', position: [118.719843, 33.775652], SICCode: 'SIC110402', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:02', modifyTime: '2019-01-25 13:23:02', deleteTime: '2019-01-26 15:23:02', registerTime: '2019-01-25 09:23:02', startTime: '2019-01-25 10:23:02', endTime: '2019-01-25 18:23:02', deviceOwner: 'syy' },
  { id: '3', position: [118.719443, 33.775252], SICCode: 'SIC110403', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:03', modifyTime: '2019-01-25 13:23:03', deleteTime: '2019-01-26 15:23:03', registerTime: '2019-01-25 09:23:03', startTime: '2019-01-25 10:23:03', endTime: '2019-01-25 18:23:03', deviceOwner: 'syy' },
  { id: '4', position: [118.719043, 33.774852], SICCode: 'SIC110404', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:04', modifyTime: '2019-01-25 13:23:04', deleteTime: '2019-01-26 15:23:04', registerTime: '2019-01-25 09:23:04', startTime: '2019-01-25 10:23:04', endTime: '2019-01-25 18:23:04', deviceOwner: 'syy' },
  { id: '5', position: [118.718643, 33.774452], SICCode: 'SIC110405', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:05', modifyTime: '2019-01-25 13:23:05', deleteTime: '2019-01-26 15:23:05', registerTime: '2019-01-25 09:23:05', startTime: '2019-01-25 10:23:05', endTime: '2019-01-25 18:23:05', deviceOwner: 'syy' },
  { id: '6', position: [118.718243, 33.774052], SICCode: 'SIC110406', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:06', modifyTime: '2019-01-25 13:23:06', deleteTime: '2019-01-26 15:23:06', registerTime: '2019-01-25 09:23:06', startTime: '2019-01-25 10:23:06', endTime: '2019-01-25 18:23:06', deviceOwner: 'syy' },
  { id: '7', position: [118.717843, 33.773652], SICCode: 'SIC120100', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:07', modifyTime: '2019-01-25 13:23:07', deleteTime: '2019-01-26 15:23:07', registerTime: '2019-01-25 09:23:07', startTime: '2019-01-25 10:23:07', endTime: '2019-01-25 18:23:07', deviceOwner: 'syy' },
  { id: '8', position: [118.717443, 33.773252], SICCode: 'SIC120101', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:08', modifyTime: '2019-01-25 13:23:08', deleteTime: '2019-01-26 15:23:08', registerTime: '2019-01-25 09:23:08', startTime: '2019-01-25 10:23:08', endTime: '2019-01-25 18:23:08', deviceOwner: 'syy' },
  { id: '9', position: [118.717043, 33.772852], SICCode: 'SIC120102', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:09', modifyTime: '2019-01-25 13:23:09', deleteTime: '2019-01-26 15:23:09', registerTime: '2019-01-25 09:23:09', startTime: '2019-01-25 10:23:09', endTime: '2019-01-25 18:23:09', deviceOwner: 'syy' },
  { id: '10', position: [118.716643, 33.772452], SICCode: 'SIC120103', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:10', modifyTime: '2019-01-25 13:23:10', deleteTime: '2019-01-26 15:23:10', registerTime: '2019-01-25 09:23:10', startTime: '2019-01-25 10:23:10', endTime: '2019-01-25 18:23:10', deviceOwner: 'syy' },
  { id: '11', position: [118.716243, 33.772052], SICCode: 'SIC120104', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:11', modifyTime: '2019-01-25 13:23:11', deleteTime: '2019-01-26 15:23:11', registerTime: '2019-01-25 09:23:11', startTime: '2019-01-25 10:23:11', endTime: '2019-01-25 18:23:11', deviceOwner: 'syy' },
  { id: '12', position: [118.715843, 33.771652], SICCode: 'SIC210100', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:12', modifyTime: '2019-01-25 13:23:12', deleteTime: '2019-01-26 15:23:12', registerTime: '2019-01-25 09:23:12', startTime: '2019-01-25 10:23:12', endTime: '2019-01-25 18:23:12', deviceOwner: 'syy' },
  { id: '13', position: [118.715443, 33.771252], SICCode: 'SIC210101', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:13', modifyTime: '2019-01-25 13:23:13', deleteTime: '2019-01-26 15:23:13', registerTime: '2019-01-25 09:23:13', startTime: '2019-01-25 10:23:13', endTime: '2019-01-25 18:23:13', deviceOwner: 'syy' },
  { id: '14', position: [118.715043, 33.770852], SICCode: 'SIC210202', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:14', modifyTime: '2019-01-25 13:23:14', deleteTime: '2019-01-26 15:23:14', registerTime: '2019-01-25 09:23:14', startTime: '2019-01-25 10:23:14', endTime: '2019-01-25 18:23:14', deviceOwner: 'syy' },
  { id: '15', position: [118.714643, 33.770452], SICCode: 'SIC210303', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:15', modifyTime: '2019-01-25 13:23:15', deleteTime: '2019-01-26 15:23:15', registerTime: '2019-01-25 09:23:15', startTime: '2019-01-25 10:23:15', endTime: '2019-01-25 18:23:15', deviceOwner: 'syy' },
  { id: '16', position: [118.714243, 33.770052], SICCode: 'SIC210404', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:16', modifyTime: '2019-01-25 13:23:16', deleteTime: '2019-01-26 15:23:16', registerTime: '2019-01-25 09:23:16', startTime: '2019-01-25 10:23:16', endTime: '2019-01-25 18:23:16', deviceOwner: 'syy' },
  { id: '17', position: [118.713843, 33.769652], SICCode: 'SIC220100', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:17', modifyTime: '2019-01-25 13:23:17', deleteTime: '2019-01-26 15:23:17', registerTime: '2019-01-25 09:23:17', startTime: '2019-01-25 10:23:17', endTime: '2019-01-25 18:23:17', deviceOwner: 'syy' },
  { id: '18', position: [118.713443, 33.769252], SICCode: 'SIC220101', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:18', modifyTime: '2019-01-25 13:23:18', deleteTime: '2019-01-26 15:23:18', registerTime: '2019-01-25 09:23:18', startTime: '2019-01-25 10:23:18', endTime: '2019-01-25 18:23:18', deviceOwner: 'syy' },
  { id: '19', position: [118.713043, 33.768852], SICCode: 'SIC220102', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:19', modifyTime: '2019-01-25 13:23:19', deleteTime: '2019-01-26 15:23:19', registerTime: '2019-01-25 09:23:19', startTime: '2019-01-25 10:23:19', endTime: '2019-01-25 18:23:19', deviceOwner: 'syy' },
  { id: '20', position: [118.712643, 33.768452], SICCode: 'SIC220103', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:20', modifyTime: '2019-01-25 13:23:20', deleteTime: '2019-01-26 15:23:20', registerTime: '2019-01-25 09:23:20', startTime: '2019-01-25 10:23:20', endTime: '2019-01-25 18:23:20', deviceOwner: 'syy' },
  { id: '21', position: [118.712243, 33.768052], SICCode: 'SIC220200', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:21', modifyTime: '2019-01-25 13:23:21', deleteTime: '2019-01-26 15:23:21', registerTime: '2019-01-25 09:23:21', startTime: '2019-01-25 10:23:21', endTime: '2019-01-25 18:23:21', deviceOwner: 'syy' },
  { id: '22', position: [118.711843, 33.767652], SICCode: 'SIC220201', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:22', modifyTime: '2019-01-25 13:23:22', deleteTime: '2019-01-26 15:23:22', registerTime: '2019-01-25 09:23:22', startTime: '2019-01-25 10:23:22', endTime: '2019-01-25 18:23:22', deviceOwner: 'syy' },
  { id: '23', position: [118.711443, 33.767252], SICCode: 'SIC220202', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:23', modifyTime: '2019-01-25 13:23:23', deleteTime: '2019-01-26 15:23:23', registerTime: '2019-01-25 09:23:23', startTime: '2019-01-25 10:23:23', endTime: '2019-01-25 18:23:23', deviceOwner: 'syy' },
  { id: '24', position: [118.711043, 33.766852], SICCode: 'SIC220203', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:24', modifyTime: '2019-01-25 13:23:24', deleteTime: '2019-01-26 15:23:24', registerTime: '2019-01-25 09:23:24', startTime: '2019-01-25 10:23:24', endTime: '2019-01-25 18:23:24', deviceOwner: 'syy' },
  { id: '25', position: [118.710643, 33.766452], SICCode: 'SIC220300', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:25', modifyTime: '2019-01-25 13:23:25', deleteTime: '2019-01-26 15:23:25', registerTime: '2019-01-25 09:23:25', startTime: '2019-01-25 10:23:25', endTime: '2019-01-25 18:23:25', deviceOwner: 'syy' },
  { id: '26', position: [118.710243, 33.766052], SICCode: 'SIC220301', extData: { detail: '挖机施工', remark: '备注' }, createTime: '2019-01-25 08:23:26', modifyTime: '2019-01-25 13:23:26', deleteTime: '2019-01-26 15:23:26', registerTime: '2019-01-25 09:23:26', startTime: '2019-01-25 10:23:26', endTime: '2019-01-25 18:23:26', deviceOwner: 'syy' }
]

export default {
  fetchMarkersList: () => {
    return {
      data: MarkersList,
      key: 0
    }
  },
  fetchMarker: (id) => {
    return {
      data: MarkersList[id],
      key: 0
    }
  },
  updateMarker: () => {
  },
  createMarker: () => {
  },
  deleteMarker: () => {
  }
}
