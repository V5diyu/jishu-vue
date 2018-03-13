<template>
    <div class="table">
        <div class="crumbs">
            <el-row>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i>管理制度</el-breadcrumb-item>
                    <el-breadcrumb-item>分类管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </div>

        <div class="crumbs">
            <el-row>
                <el-col :span="12">
                    <el-input
                        style="width: 200px;"
                        placeholder="请输入分类名称搜索"
                        prefix-icon="el-icon-search"
                        v-model="keyword"
                        @keyup.enter.native="getData">
                    </el-input>
                </el-col>

                <el-col :span="12">
                    <el-button type="primary" icon="plus" style="float:right;"
                        @click="addDialog">添加分类</el-button>
                </el-col>
            </el-row>
        </div>

        <el-table :data="tableData" v-loading.body="loading" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="170"></el-table-column>
            <!-- <el-table-column label="分类图片" width="150">
                <template slot-scope="scope" style="text-align: center;">
                    <div class="avatarUrl" 
                        @click="dialogImg(scope.row.url)" 
                        :style="{'background-image': 'url('+scope.row.url+')'}"></div>
                </template>
            </el-table-column> -->
            <el-table-column prop="name" label="分类名称"></el-table-column>
           
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="small" type="success"
                        @click="update(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" type="danger"
                        @click="del(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="count"
                :page-size="pageSize">
            </el-pagination>
        </div>

        <el-dialog :visible.sync="dialogVisible" size="large">
            <img :src="dialogImgUrl" style="max-width: 100%;">
        </el-dialog>

        <el-dialog :title="addDialogTitle" :visible.sync="addDialogVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="分类名称">
                    <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
                </el-form-item>

                <!-- <el-form-item label="分类图片">
                    <div id="container" class="el-upload">
                        <img v-if="form.url" :src="form.url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <input type="file" class="upload-input" id="btnupload" name="img" />
                    </div>
                </el-form-item> -->
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import qiniu from '../../assets/qiniu.js'

    export default {
        data() {
            return {
                keyword: '',
                tableData: [],
                loading: true,
                pn: 1,
                pageSize: 15,
                count: 0,

                dialogVisible: false,
                dialogImgUrl: '',

                addDialogVisible: false,
                addDialogTitle: '添加分类',
                // qiniuInitState: false,
                form: {
                    name: '',
                    // url: '',
                },
            }
        },
        created(){
            this.getData();
        },
        methods: {
            dialogImg(url){
                this.dialogImgUrl = url;
                this.dialogVisible = true;
            },
            handleCurrentChange(val){
                this.pn = val;
                this.getData();
            },
            getData(){
                this.loading = true;
                this.$axios.post('getRulesClassify', {
                    name: this.keyword,
                    pn: this.pn
                }, (res) => {
                    if (res.ret == true) {
                        this.tableData = res.data.list;
                        this.count = res.data.count;
                        this.loading = false
                    }
                })
            },
            addDialog(){
                this.addDialogVisible = true;
                this.addDialogTitle = '添加分类';
                this.form = {
                    name: '',
                    // url: '',
                };

                // if (!this.qiniuInitState) {
                //     this.qiniuInitState = true;
                //     this.$nextTick(() => {
                //         qiniu.init((info) => {
                //             this.form.url =  info.data.url;
                //         })
                //     })
                // }
            },
            add(){
                let self = this;

                if (self.form.id) {
                    this.$axios.post('updateRulesClassify', self.form, (res) => {
                        if (res.ret == true) {
                            self.getData();
                            self.addDialogVisible = false;
                            self.$message.success('修改成功');
                        }
                    })
                }else{
                    this.$axios.post('addRulesClassify', self.form, (res) => {
                        if (res.ret == true) {
                            self.getData();
                            self.addDialogVisible = false;
                            self.$message.success('添加成功');
                        }
                    })
                }
            },
            del(index, row) {
                this.$confirm('确定删除该分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delRulesClassify', {
                        id: row.id
                    }, (res) => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
            update(index, row) {
                this.addDialogVisible = true;
                this.addDialogTitle = '修改分类';
                this.form = row;

                // if (!this.qiniuInitState) {
                //     this.qiniuInitState = true;
                //     this.$nextTick(() => {
                //         qiniu.init((info) => {
                //             this.form.url =  info.data.url;
                //         })
                //     })
                // }
            },
        }
    }
</script>

<style>
    
</style>