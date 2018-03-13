<template>
    <div class="table">
        <div class="crumbs">
            <el-row>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i> 管理员</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </div>

        <div class="crumbs">
            <el-row>
                <el-col :span="6">
                    <el-input
                        placeholder="请输入账号搜索"
                        prefix-icon="el-icon-search"
                        v-model="keyword"
                        @keyup.enter.native="getData">
                    </el-input>
                </el-col>

                <el-col :span="18">
                    <el-button type="primary" icon="plus" style="float:right;"
                        @click="addDialog">添加管理员</el-button>
                </el-col>
            </el-row>
        </div>

        <el-table :data="tableData" v-loading.body="loading" border style="width: 100%">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="管理员名称"></el-table-column>
            <el-table-column prop="account" label="管理员账号"></el-table-column>
            
            <el-table-column prop="create" label="创建时间"></el-table-column>
           
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" type="success"
                        @click="updateDialog(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" type="danger"
                        @click="del(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle" :visible.sync="updateDialogVisible">
            <el-form ref="form" :model="curData" label-width="100px">
                <el-form-item label="管理员名称">
                    <el-input v-model="curData.name" placeholder="请输入管理员名称"></el-input>
                </el-form-item>

                <el-form-item label="账号">
                    <el-input v-model="curData.account" placeholder="请输入账号"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="curData.pwd" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                keyword: '',
                tableData: [],
                loading: true,

                curData: {},
                curIndex: '',
                updateDialogVisible: false,
                dialogTitle: '添加管理员'
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                this.loading = true;
                this.$axios.post('getAdmin', {
                    account: this.keyword,
                    pn: this.pn
                }, (res) => {
                    this.tableData = res.data;
                    this.loading = false;
                })
            },
            addDialog(){
                this.curData = {};
                this.updateDialogVisible = true;
            },
            del(index, row){
                this.$confirm('删除管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('deleteAdmin', {
                        id: row.id
                    }, (res) => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
            updateDialog(index, row){
                this.updateDialogVisible = true;
                this.curIndex = index;
                this.curData = row;
            },
            update(){
                if (this.curData.id) {
                    this.$axios.post('updateAdmin', this.curData, (res) => {
                        this.$message.success('修改成功');
                        this.curIndex = '';
                        this.curData = {};
                        this.updateDialogVisible = false;
                    })
                }else{
                    this.$axios.post('addAdmin', this.curData, (res) => {
                        this.$message.success('添加成功');
                        this.curIndex = '';
                        this.curData = {};
                        this.getData();
                        this.updateDialogVisible = false;
                    })
                }
            }
        }
    }
</script>
