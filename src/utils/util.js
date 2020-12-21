Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}

const ctool ={
    setObj : function (key, obj) {
        obj = JSON.stringify(obj);
        sessionStorage.setItem(key, obj);
    },
    getObj : function (key) {
        var obj = JSON.parse(sessionStorage.getItem(key));
        return obj;
    }
}
// 项目类别
const Industry = [{
    value: 1,
    label: '大型场馆'
    }, {
    value: 2,
    label: '行政办公'
    }, {
    value: 3,
    label: '医疗卫生'
    }, {
    value: 4,
    label: '教育园区'
    }, {
    value: 5,
    label: '住宅房屋'
    }, {
    value: 6,
    label: '商业服务'
    }, {
    value: 7,
    label: '综合管廊'
    }, {
    value: 8,
    label: '其他'
    }
];
//项目模式
const ProjectMode = [{
    value: 1,
    label: '设计+施工总承包(DB)'
    }, {
    value: 2,
    label: '交钥匙总承包(EPC)'
    }, {
    value: 3,
    label: '公私合作关系(PPP)'
    }, {
    value: 4,
    label: '专业承包'
    }
];
//招标模式
const TenderMode = [{
    value: 1,
    label: '公开招标'
},{
    value: 2
    ,
    label: '邀请招标'
},{
    value: 3
    ,
    label: '公开招标/邀请招标'
}
]

//项目阶段
const projectPhase = [
    {
        value:1,
        label:'设计阶段'
    },
    {
        value:2,
        label:'生产方案'
    },
    {
        value:3,
        label:'按月生产'
    },
    {
        value:0,
        label:'项目竣工'
    },
]

//当前进度
const projectStatus = {
    
    "1":'立项完成',
    "11":'设计方案完成',
    "2":'设计成果完成',
    "21":'采购方案完成',
    "3":'施工方案完成',
    "31":'当月已采购',
    "32":'当月已施工',
    "0":'项目竣工',
}
function getStatusNameByStatus(status){
    return projectStatus[status]
}
//判断内部账户
const usernames = "admin|workbench|设计部|采购部|工程部"
function judgeRoleByUserName(username){
    if(usernames.indexOf(username)==-1){
        return 0;
    }
    return 1;
}
function judgeFLagByStatus(status){//判断公司内部角色权限
    let roleName = sessionStorage.getItem("roleName")
    if("admin"==roleName){
        return true
    }
    if((1==status||11==status) &&"sjb"==roleName){
        return true
    }else if((2==status||3==status||32==status)&&"cgb"==roleName){
        return true
    }else if((21==status||31==status)&&"gcb"==roleName){
        return true
    }
    return false
}

//咨询类型
const counselTypeListAll = {
    "zb":[
        {
            value:1,
            label:'设计咨询'
        },
        {
            value:2,
            label:'采购咨询'
        },
        {
            value:3,
            label:'施工咨询'
        },        
    ],
    "gys":[
        {
            value:2,
            label:'采购咨询'
        },
    ],
    "lw":[
        {
            value:3,
            label:'施工咨询'
        },
    ],
}

const selectedUpdateRouteMap = {//项目跟进选这路由
    1:"/workbench/project/designScheme",
    11:"/workbench/project/designResult",
    2:"/workbench/project/purchaseScheme",
    21:"/workbench/project/constructionScheme",
    3:"/workbench/project/purchaseRecord",
    31:"/workbench/project/constructionRecord",
    32:"/workbench/project/purchaseRecord",
}
function selectUpdateRouteByStatus(status){
    return selectedUpdateRouteMap[status]
}

// 图纸类型
const FileType = {
    "DESIGN_PIC":1,
    "DESIGN_MENU":2,
    "BUY_MENU":3,
    "CONSTRUCTION_PLAN":4,
    "THIS_PURCHASED_MENU":5,
    "THIS_PURCHASED_MENU":6,
    "THIS_CONSTRUCTION_MENU":7,
    "THIS_CONSTRUCTION_PIC":8
}

export {
    ctool,
    Industry,
    ProjectMode,
    TenderMode,
    projectPhase,
    getStatusNameByStatus,
    judgeRoleByUserName,
    counselTypeListAll,
    selectUpdateRouteByStatus,
    judgeFLagByStatus,
    FileType
}
