import {apiGet, apiPut, apiDelete, apiPost} from "../../assets/js/baseApi";
    let getEventMsgByPageApi = function(currentpage, limit) {
        let data = {
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPage", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }
    let getEventMsgByPageFromDateApi = function(interval, currentpage, limit) {
        let data = {
            interval,
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageFromDate", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

    let getEventMsgByPageAndTypeApi = function(type, currentpage, limit) {
        let data = {
            typeList: JSON.stringify(type),
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageAndTypeList", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }
    let getEventMsgByPageAndTypeFromDateApi = function(interval, type, currentpage, limit) {
        let data = {
            interval,
            typeList: JSON.stringify(type),
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageAndTypeListFromDate", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }


    let getEventMsgByPageInGroupApi = function(groupname, currentpage, limit) {
        let data = {
            groupname,
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageInGroup", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }
    let getEventMsgByPageInGroupFromDateApi = function(interval, groupname, currentpage, limit) {
        let data = {
            interval,
            groupname,
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageInGroupFromDate", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

    let getEventMsgByPageAndTypeInGroupApi = function(groupname, typeList, currentpage, limit) {
        let data = {
            groupname,
            typeList: JSON.stringify(typeList),
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageAndTypeListInGroup", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }
    let getEventMsgByPageAndTypeInGroupFromDateApi = function(interval, groupname, typeList, currentpage, limit) {
        let data = {
            interval,
            groupname,
            typeList: JSON.stringify(typeList),
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageAndTypeListInGroupFromDate", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

    let getEventMsgByPageAndKeywordsApi = function(keywords, currentpage, limit) {
        let data = {
            keywords,
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageAndKeywords", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

    let getEventMsgByPageAndKeywordsInGroupApi = function(groupname, keywords, currentpage, limit) {
        let data = {
            groupname,
            keywords,
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageAndKeywordsInGroup", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

   

    let deleteEventMsgApi = function(eid){
        return new Promise((resolve, reject) => {
            apiDelete("/api/eventMsg/"+eid).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

    let batchDeleteEventMsgStatusApi = function(eids){
        let eidsJson = JSON.stringify(eids);
        let data = {
            eids: eidsJson
        }
        return new Promise((resolve, reject) => {
            apiPost("/api/eventMsg/batchdelete", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

    let deleteAllEventMsgApi = function(){
        return new Promise((resolve, reject) => {
            apiDelete("/api/eventMsg").then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }


    let deleteAllEventMsgAndTypeListApi = function(typeList){
        let data={
            typeList: JSON.stringify(typeList),
        }
        return new Promise((resolve, reject) => {
            apiPost("/api/deleteByTypeList", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

    let deleteAllEventMsgByGroupApi = function(groupname){
        let data = {
            groupname,
        }
        return new Promise((resolve, reject) => {
            apiPost("/api/eventMsg/deleteByGroup", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }

    let deleteAllEventMsgByGroupAndTypeListApi = function(groupname, typeList){
        let data = {
            typeList: JSON.stringify(typeList),
            groupname,
        }
        return new Promise((resolve, reject) => {
            apiPost("/api/eventMsg/deleteByTypeListAndGroup", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }
    

export {
    getEventMsgByPageApi,
    getEventMsgByPageInGroupApi,
    getEventMsgByPageAndTypeInGroupApi,
    getEventMsgByPageAndTypeApi,
    deleteEventMsgApi,
    batchDeleteEventMsgStatusApi,
    deleteAllEventMsgApi,
    deleteAllEventMsgByGroupApi,
    getEventMsgByPageAndKeywordsApi,
    getEventMsgByPageAndKeywordsInGroupApi,
    getEventMsgByPageFromDateApi,
    getEventMsgByPageInGroupFromDateApi,
    getEventMsgByPageAndTypeInGroupFromDateApi,
    getEventMsgByPageAndTypeFromDateApi,
    deleteAllEventMsgAndTypeListApi,
    deleteAllEventMsgByGroupAndTypeListApi
}


