<template>
    <div class="wrapper">

        <div class="header">
            <div class="logo">泰科力合技术支持</div>

            <div class="user-info">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <img class="user-logo" src="../../../static/img/img.jpg">
                        {{username}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="loginout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <v-sidebar></v-sidebar>
        <div class="main-content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead, vSidebar
        },
        data() {
            return {
                name: 'admin',
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                this.$axios.post('logout', {}, (res) => {
                    if (res.ret == true) {
                        localStorage.removeItem('ms_username');
                        this.$router.push('/login');
                        this.$message.success('退出成功');
                    }
                })
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            setIndex(index){
                this.activeIndex = index;
                if (index == 1) {
                    this.$router.push('/new-user')
                }else{
                    this.$router.push('/goods')
                }
            }
        },
        mounted(){
            var index = this.$route.meta.index || 1;
            console.log(index)
            this.activeIndex = index;
        }
    }
</script>

<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background-color: rgb(32, 160, 255);
        text-align: center;
    }
    .header .logo{
        float: left;
        width:220px;
        text-align: center;
    }
    .top-menu{
        display: inline-block;
        font-size: 18px;
        vertical-align: super;
    }
    .top-menu span{
        box-sizing: border-box;
        display: inline-block;
        height: 70px;
        width: 120px;
        text-align: center;
        cursor: pointer;
        background-color: rgb(32, 160, 255);
    }
    .top-menu span.active{
        background-color: rgba(0, 0, 0, .1);
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
