<template>
    <div class="cf m-t-30 p-10">
        <el-row >
            <el-col :lg="16" :md="20" class="m-t-30" :offset="4">
                <div class="m-t-20">
                    <div class="panel-header cf">
                        <div class="fr m-r-10"> 
                            <el-input size="small" class="w-300 m-l-10" v-model="keywords" placeholder="Keyword of device name" @keyup.enter.native="searchEventMsg(keywords)">
                                <el-button slot="append" icon="el-icon-search"  @click.native.prevent="searchEventMsg(keywords)" ></el-button>
                            </el-input>
                        </div>
                    </div>
                    <el-table
                        id="eventTable"
                        ref="eventTable"
                        :data="eventMsgTableList"
                        @selection-change="selectItem"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :default-sort = "{prop: 'registrationDate', order: 'descending'}"
                        v-loading="listLoading" 
                        >
                        <el-table-column
                        type="selection"
                        min-width="50">
                        </el-table-column>
                        <el-table-column
                        prop="devname"
                        label="Device Name"
                        min-width="100">
                        </el-table-column>
                        
                        <el-table-column
                        prop="ts"
                        label="Time"
                        min-width="110">
                            <template slot-scope="scope">
                                {{scope.row.ts|time}}
                            </template>
                        </el-table-column>

                        <el-table-column
                        prop="content"
                        label="Content"
                        min-width="100">
                            <template slot-scope="scope">
                                {{scope.row.content.barcodeData}}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="m-t-10 cf fr">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :page-size="limit"
                        :current-page="currentPage"
                        :total="dataCount"
                        v-show="isshow"
                        background
                        >
                        </el-pagination>
                    </div> 
                    <btn-group 
                    :selectedData="multipleSelection" 
                    :isDelete="true" 
                    tid="eid" 
                    :delApi="batchDeleteEventMsg" 
                    @result="isSuccess" 
                    v-show="isShowBtnGroup"
                    class="fl m-t-10 cf">
                    </btn-group>
                    <el-button 
                    size="small" 
                    @click="clearAll()" 
                    type="primary" 
                    class="fl m-t-10 cf m-l-10"
                        v-show="isShowBtnGroup">
                    Clear All
                    </el-button>
                </div>
            </el-col>
        </el-row> 
    </div>
</template>
<script>
    import handleResponse from '../restfulapi/handleResponse'
    import swalFun from "../../assets/js/swal"
    import {
        getEventMsgByPageAndTypeApi,
        getEventMsgByPageAndTypeAndKeywordsApi,
        deleteEventMsgApi,
        batchDeleteEventMsgStatusApi,
        deleteAllEventMsgAndTypeApi
    } from "../restfulapi/eventMsgApi"

    import { 
        eventSourceConn,
        handleMsg,
        singleEventSourceConn,
        singleHandleMsg,
        singleEventSourceClose,
        eventSourceClose
        } from "../restfulapi/eventSourceApi"

    import btnGroup from "../../common/btn-group"
    import {appControl} from "../../assets/js/lwm2mMap"


    export default {
        name: 'eventMsg',
        data() {
            let week = "Week";
            let month = "Month";
            let threeMonth = "Three Month";
            //ms
            let weekSt = 7*24*60*60*1000;
            let monthSt = 30*24*60*60*1000;
            let threeMonthSt = 3*30*24*60*60*1000;
            return {
                eventMsgTableList: [],
                isshow: false,
                limit: 10,
                dataCount: 0,
                currentPage: 1,
                multipleSelection: [],
                isShowBtnGroup: false,
                clearLoading: false,
                batchDeleteEventMsg:  batchDeleteEventMsgStatusApi,
                type: 2,
                keywords: "",
                listLoading: false,
                eventMsgIconColor: "#303133",
                realKeywords: "",
                keywords: "",
                dateRange: [
                    
                    {label: week, value: weekSt},
                    {label: month, value: monthSt},
                    {label: threeMonth, value: threeMonthSt}
                ],
                pkgname: "com.adv.scanbarcode",

            }
        },

        components:{
            btnGroup
        },

        methods: {

            searchEventMsg(keywords){
                let reg=new RegExp(/^[a-zA-Z0-9\.\-_:]{0,18}$/);
                if(!reg.test(keywords)){
                    this.$swal("", this.$t('eventMsg.deviceLikeName'), "info", {button: this.$t('global.confirm')})
                    return;
                }

                this.realKeywords = keywords
                this.currentPage = 1;
                this.getEventMsgLikeDevname(this.realKeywords);
            },

            getEventMsgLikeDevname(keywords){
                
                //clear filter
                this.listLoading = true;
                getEventMsgByPageAndTypeAndKeywordsApi(this.type, this.pkgname, keywords, this.currentPage, this.limit).then((data) => {
                    this.listLoading = false;
                    handleResponse(data, (res) => { 
                        this.assignEventMsgData(res);
                    })
                })
            },

            selectItem(val) {
                this.multipleSelection = val;
            },

            handleCurrentChange(currentPage){
                if(currentPage){
                    this.currentPage = currentPage;
                }else{
                    this.currentPage = 1
                }
                if(this.realKeywords){
                    this.getEventMsgLikeDevname(this.realKeywords);
                }else{
                    this.getAllEventMsg();
                }

            },

            getAllEventMsg(){
                getEventMsgByPageAndTypeApi(this.type, this.pkgname, this.currentPage, this.limit).then((data) => {
                    this.listLoading = false;
                    handleResponse(data, (res) => {
                        this.assignEventMsgData(res);
                    })
                })
                
            },

            assignEventMsgData(res){
                if(Object.prototype.toString.call(res)  === '[object Object]'&& Object.prototype.toString.call(res.data) === '[object Array]'){
                    this.dataCount = res.count;
                    this.eventMsgTableList = res.data;
                    this.isshow = this.dataCount > this.limit;
                    this.isShowBtnGroup = this.dataCount > 0;
                    let isFinish = true;
                
                }
            },

            deleteEventMsg(eid){
                _g.swalInfoDo(this.$t('global.areYouSure'), this.$t('global.delete'), this.$t('global.confirm'), this.$t('global.cancel')).then((result) => {
                    if(result){
                        this.listLoading = true;
                        deleteEventMsgApi(eid).then((data) => {
                            this.listLoading = false;
                            handleResponse(data, (res) => {
                                if(res.status === "CHANGED"){
                                    this.$swal("", this.$t('global.success'), "success", {button: this.$t('global.confirm')}).then(() => {
                                        this.getAllEventMsg();
                                    })
                                }else{
                                    _g.handleError(res);
                                }
                            })
                        })
                    }
                }) 
            },

            //delete appstatus $emit
            isSuccess(result){
                if(result){
                    this.getAllEventMsg();
                }
            },

            //clear All history
            clearAll(){
                _g.swalInfoDo(this.$t('global.areYouSure'), this.$t('global.clearAll'), this.$t('global.confirm'), this.$t('global.cancel')).then((result) => {
                    if(result){
                        this.clearLoading = true;
                        deleteAllEventMsgAndTypeApi(this.type, this.pkgname).then((data) => {
                            this.clearLoading = false;
                            handleResponse((data), (res) => {
                                if(res.status === "CHANGED"){
                                    this.$swal("", this.$t('global.success'), "success", {button: this.$t('global.confirm')}).then(() => {
                                        this.getAllEventMsg();
                                    })
                                }else{
                                    _g.handleError(res);
                                }
                            })
                        })
                    }
                })

            },

            eventSourceConn(){
                eventSourceConn().then((isConnect) => {
                    if(isConnect){
                        handleMsg("AUTOREPORT", (type, data) => {
                            if(data){
                                let msgObj = JSON.parse(data);
                                if(msgObj.appname == this.pkgname){
                                    this.getAllEventMsg();
                                }
                                
                            }
                            
                        }, false);
                    }
                    
                });
                   
            },
            closeEventSourceConn(){
                eventSourceClose();
            },

            initData(){
                this.eventMsgTableList = [];
                this.isShowBtnGroup= false;
                this.isshow= false;
                this.type = 2;
                this.realKeywords = "";
                this.keywords = "";
            }
        },

        created(){
            this.getAllEventMsg();
            this.eventSourceConn();
        },

        beforeDestroy() {
            this.closeEventSourceConn()
        },

    }
</script>

<style lang="scss" scoped>
@import "../../assets/css/colors";

    
</style>
