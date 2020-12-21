import base from './base' // 导入接口域名列表
import {get,post} from '@/utils/http' // 导入http中创建的axios1实例
import qs from 'qs' // 根据需求是否导入qs模块
const file = {
    uploadFile(formData) {//上传附件
        return post(`${base.sq}/workbench/uploadFile`,formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
    },
    deleteFile(id) {
        return post(`${base.sq}/workbench/deleteFile`, qs.stringify({ id: id }));
    },
    loadFile(foreignId,type){
        return get(`${base.sq}/workbench/loadFile?foreignId=`+foreignId+"&type="+type)
    }
}
export default file