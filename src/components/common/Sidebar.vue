<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="light" unique-opened router>
            <el-menu-item index="manager">
                <i class="iconfont icon-wode"></i>管理人员
            </el-menu-item>

            <el-submenu index="1">
                <template slot="title"><i class="iconfont icon-neirong2"></i>知识库</template>
                <el-menu-item index="knowledge-classify">分类管理</el-menu-item>
                <el-menu-item index="knowledge-article">文章管理</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title"><i class="iconfont icon-gantanhao"></i>管理制度</template>
                <el-menu-item index="rules-classify">分类管理</el-menu-item>
                <el-menu-item index="rules-article">文章管理</el-menu-item>
            </el-submenu>

            <el-menu-item index="project">
                <i class="iconfont icon-toutiao"></i>出差记录
            </el-menu-item>

            <el-menu-item index="dispatch">
                <i class="iconfont icon-feiyongbaohan"></i>报销管理
            </el-menu-item>

            <el-menu-item index="log">
                <i class="iconfont icon-xiangqing"></i>日志管理
            </el-menu-item>

            <el-menu-item index="feedback">
                <i class="iconfont icon-bangzhu"></i>反馈管理
            </el-menu-item>

            <el-submenu index="3">
                <template slot="title"><i class="iconfont icon-shezhi"></i>配置</template>
                <el-menu-item index="service-type">服务类型</el-menu-item>
                <el-menu-item index="approvers">审批人员</el-menu-item>
            </el-submenu>










            <!-- <el-menu-item index="classify">
                <i class="iconfont icon-qrcode"></i>图片分类
            </el-menu-item>

            <el-menu-item index="picture">
                <i class="iconfont icon-barrage"></i>图片管理
            </el-menu-item>

            <el-submenu index="1">
                <template slot="title"><i class="iconfont icon-service"></i>数据抓取</template>
                <el-menu-item index="data-pig">小猪Gif</el-menu-item>
                <el-menu-item index="data-soo">SOOGIF</el-menu-item>
            </el-submenu>

            <el-menu-item index="cloudbar-statis">
                <i class="iconfont icon-dynamic"></i>统计功能
            </el-menu-item> -->
        </el-menu>

    </div>
</template>

<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 220px;
        left: 0;
        top: 70px;
        bottom:0;
        background-color: rgb(32, 160, 255);
    }
    .sidebar > ul {
        height:100%;
    }
    .sidebar .el-menu{
        border-radius: 0px;
    }
    .sidebar .iconfont{
        font-size: 24px;
        margin-right: 6px;
        vertical-align: sub;
    }
</style>
