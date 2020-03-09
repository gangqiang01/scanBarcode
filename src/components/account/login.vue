<template>
    <div>
        <el-form :model="form" :rules="rules2" ref="form" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
            <div class="title">
                <h1>Scan Barcode</h1>
                <p>Welcome To<br/>Industry Edge Device Manager Server</p>
            </div>
            <el-form-item prop="username">
                <el-input type="text" v-model.trim="form.username" auto-complete="off" placeholder="Please input username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model.trim="form.password" auto-complete="off" placeholder="Please input password"  @keyup.native.enter="handleSubmit()"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" style="margin:0px 0px 35px 0px;">Remember me</el-checkbox>
            <span></span>
            <el-form-item style="width:100%;">
                <el-button class="login_btn" type="primary" style="width:100%;" v-loading="loading" @click.native.prevent="handleSubmit()">{{$t('login.login')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import {loginApi} from '../restfulapi/authApi'
    import handleResponse from "../restfulapi/handleResponse"
    import utils from "../../assets/js/utils"
    import {setSession, setLocal, getLocal, removeLocal, checkLocal} from "../../assets/js/storage"
    import {applicationTitle} from "../../assets/js/constant"
    export default {
        
        name: 'login',
        data() {

            let validateLogin = (rule,value,callback)=>{
                let reg=new RegExp(/^[0-9A-Za-z]{3,12}$/);
                if(!reg.test(value)){
                    return callback(new Error ("contain letter and number length 3~12"))
                }else{callback()};
            };
            let username="";
            let password="";
            let checked=false;
            if(checkLocal("scanBarcodeData")){
                try{
                    let scanBarcodeData = JSON.parse(getLocal("scanBarcodeData"))
                    if(scanBarcodeData.isRemember){
                        checked = scanBarcodeData.isRemember;
                        username = scanBarcodeData.username;
                        password = utils.decrypt(scanBarcodeData.password);
                    }
                }catch(e){
                    console.error(e);
                }
                
            }
            
            return {
                title: '',
                appTitle: applicationTitle,
                loading: false,
                redirectUrl: '',
                form: {
                    username: username,
                    password: password,
                },

                rules2: {
                    username: [
                        { required: true, trigger: 'blur', validator: validateLogin}
                    ],
                    password: [
                        { required: true, trigger: 'blur', validator: validateLogin}
                    ],

                },
                checked: checked
            }
        },
       
        methods: {
            handleSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if(this.loading) return;
                        this.loading = !this.loading
                        loginApi(this.form.username, this.form.password).then((res) => {
                            this.loading = false;
                            handleResponse(res, (res) => {
                                if(res.status == "CHANGED"){
                                    let scanBarcodeData = {};
                                    scanBarcodeData.username = this.form.username;
                                    scanBarcodeData.password = utils.encrypt(this.form.password);
                                    if(this.checked){
                                        scanBarcodeData.isRemember = this.checked;
                                        setLocal("scanBarcodeData", scanBarcodeData);
                                    }else{
                                        removeLocal("scanBarcodeData");
                                    }
                                    setSession("scanBarcodeData", scanBarcodeData);
                                    cookie.setCookie("scanBarcodeToken", res.token, 60);
                                    setSession("username", this.form.username);
                                    let nowTime = this.$moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
                                    setSession("logintime", nowTime);
                                    console.log(this.redirectUrl);
                                    if(this.redirectUrl){
                                        this.$router.replace(this.redirectUrl);
                                    }else{
                                        this.$router.replace({name:'main'});
                                    }

                                }else{
                                    _g.handleError(res);
                                }
                            })
                        })
                    }
                })
               
            },
            
        },
        created(){
            if(this.$route.query.redirect){
                this.redirectUrl = this.$route.query.redirect;
            }
        },
        
    }
</script>

<style lang="scss" scoped>
@import "../../assets/css/colors";
.verify-pos {
	position: absolute;
	right: 100px;
	top: 0px;
}
.card-box {
	padding: 20px;
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin-bottom: 20px;
	background-color: #F9FAFC;
	margin: 120px auto;
	width: 400px;
	border: 2px solid #8492A6;
    .login_btn{
        // background: #1A82C5;
        background: linear-gradient(to right top,  #1382c6,#004889)
    }
}

.title {
	margin: 0px auto 40px auto;
    text-align: center;
    img{
        margin-top: 20px;
        width: 350px;
    }
    h1{
        margin-bottom:5px;
        color: $primary-color;
    }

    p{
        color: $darkgray-color;
    }
}

.loginform {
	width: 350px;
	padding: 35px 35px 15px 35px;
}
.identifyInput{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -o-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 200px;
    vertical-align: top;
    margin-right: 6px;
} 
input::-webkit-input-placeholder{
    color: #c0c5d7;
}
::-moz-placeholder {
    color: #c0c5d7;
}
.refresh{
    color: #c0c5d7;
    vertical-align: middle;
    margin-left: 5px;
    margin-bottom: 22px;
    cursor: pointer
}
</style>