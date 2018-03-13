<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "../static/css/main.css";
    /*@import "../static/css/color-dark.css"; */

    .avatarUrl{
    	height: 114px;
    	width: 114px;
    	margin: 10px 0;
    	background-size: cover;
    	background-position: center;
    	background-repeat: no-repeat;
    }
    /* 上传按钮 */
    .upload-input{
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 128px;
        height: 128px;
    }
    .el-upload {
        position: relative;
        width: 128px;
        height: 128px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 128px;
        height: 128px;
        line-height: 128px!important;
        text-align: center;
    }
    .avatar {
        position: absolute;
        top: 0;
        left: 0;
        width: 128px;
        height: 128px;
        display: block;
    }
</style>