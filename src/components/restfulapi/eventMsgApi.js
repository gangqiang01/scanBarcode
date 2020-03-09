import {apiGet, apiPut, apiDelete, apiPost} from "../../assets/js/baseApi";

    let getEventMsgByPageAndTypeApi = function(type, pkgname, currentpage, limit) {
        let data = {
            type,
            pkgname,
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageAndTypeAngPkgname", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }
   

    let getEventMsgByPageAndTypeAndKeywordsApi = function(type, pkgname,  keywords, currentpage, limit) {
        let data = {
            type,
            pkgname,
            keywords,
            currentpage,
            limit,
        }
        return new Promise((resolve, reject) => {
            apiGet("/api/eventMsg/byPageAndTypeAndPkgnameAndKeywords", data).then((data) => {
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


    let deleteAllEventMsgAndTypeApi = function(type, pkgname){
        let data={
            type,
            pkgname
        }
        return new Promise((resolve, reject) => {
            apiPost("/api/eventMsg/deleteByTypeAndPkgname", data).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err.response);
            })
        })
    }
    

export {
    getEventMsgByPageAndTypeApi,
    getEventMsgByPageAndTypeAndKeywordsApi,
    deleteEventMsgApi,
    batchDeleteEventMsgStatusApi,
    deleteAllEventMsgAndTypeApi
}


