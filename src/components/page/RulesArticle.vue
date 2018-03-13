<template>
    <div class="table">
        <div class="crumbs">
            <el-row>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i>管理制度</el-breadcrumb-item>
                    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </div>

        <div class="crumbs">
            <el-row>
                <el-col :span="12">
                    <el-input
                        style="width: 200px;"
                        placeholder="请输入文章名称搜索"
                        prefix-icon="el-icon-search"
                        v-model="keyword"
                        @keyup.enter.native="getData">
                    </el-input>
                </el-col>

                <el-col :span="12">
                    <el-button type="primary" icon="plus" style="float:right;"
                        @click="addDialog">添加文章</el-button>
                </el-col>
            </el-row>
        </div>

        <el-table :data="tableData" v-loading.body="loading" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="170"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column label="图片" width="150">
                <template slot-scope="scope" style="text-align: center;">
                    <div class="avatarUrl" 
                        @click="dialogImg(scope.row.url)" 
                        :style="{'background-image': 'url('+scope.row.url+')'}"></div>
                </template>
            </el-table-column>
            <el-table-column prop="classifyTxt" label="分类名称"></el-table-column>
           
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

        <el-dialog :title="addDialogTitle" width="80%" :visible.sync="addDialogVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="所属分类">
                    <el-select v-model="form.classifyId" placeholder="请选择">
                        <el-option
                            v-for="item in classifyList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="文章标题">
                    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>

                <el-form-item label="文章图片">
                    <div id="container" class="el-upload">
                        <img v-if="form.url" :src="form.url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <input type="file" class="upload-input" id="btnupload" name="img" />
                    </div>
                </el-form-item>

                <el-form-item label="文章内容">
                    <vue-html5-editor :content="form.content" @change="updateData" :height="300"></vue-html5-editor>
                </el-form-item>
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

                classifyList: [],

                dialogVisible: false,
                dialogImgUrl: '',

                addDialogVisible: false,
                addDialogTitle: '添加文章',
                qiniuInitState: false,
                form: {
                    classifyId: '',
                    title: '',
                    url: '',
                    content: ''
                },
            }
        },
        created(){
            this.getData();

            this.getClassifyList();
        },
        methods: {
            updateData(val){
                this.form.content = val;
            },
            getClassifyList(){
                this.$axios.post('getRulesClassify', {}, (res) => {
                    if (res.ret) {
                        this.classifyList = res.data.list;
                    }
                })
            },
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
                this.$axios.post('getRules', {
                    title: this.keyword,
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
                this.addDialogTitle = '添加文章';
                this.form = {
                    classifyId: '',
                    title: '',
                    url: '',
                    content: ''
                };

                if (!this.qiniuInitState) {
                    this.qiniuInitState = true;
                    this.$nextTick(() => {
                        qiniu.init((info) => {
                            this.form.url =  info.data.url;
                        })
                    })
                }
            },
            add(){
                let self = this;

                if (self.form.id) {
                    this.$axios.post('updateRules', self.form, (res) => {
                        if (res.ret == true) {
                            self.getData();
                            self.addDialogVisible = false;
                            self.$message.success('修改成功');
                        }
                    })
                }else{
                    this.$axios.post('addRules', self.form, (res) => {
                        if (res.ret == true) {
                            self.getData();
                            self.addDialogVisible = false;
                            self.$message.success('添加成功');
                        }
                    })
                }
            },
            del(index, row) {
                this.$confirm('确定删除该文章?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delRules', {
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
                this.addDialogTitle = '修改文章';
                this.form = row;

                if (!this.qiniuInitState) {
                    this.qiniuInitState = true;
                    this.$nextTick(() => {
                        qiniu.init((info) => {
                            this.form.url =  info.data.url;
                        })
                    })
                }
            },
        }
    }
</script>

<style>
    
</style>