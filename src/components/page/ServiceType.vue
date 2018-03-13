<template>
    <div class="table">
        <div class="crumbs">
            <el-row>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i>配置</el-breadcrumb-item>
                    <el-breadcrumb-item>服务类型</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </div>

        <div class="crumbs">
            <el-row>
                <el-col :span="12">
                    <el-input
                        style="width: 200px;"
                        placeholder="请输入类型名称搜索"
                        prefix-icon="el-icon-search"
                        v-model="keyword"
                        @keyup.enter.native="getData">
                    </el-input>
                </el-col>

                <el-col :span="12">
                    <el-button type="primary" icon="plus" style="float:right;"
                        @click="addDialog">添加类型</el-button>
                </el-col>
            </el-row>
        </div>

        <el-table :data="tableData" v-loading.body="loading" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="170"></el-table-column>
            <el-table-column prop="name" label="类型名称"></el-table-column>
           
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

        <el-dialog :title="addDialogTitle" :visible.sync="addDialogVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="类型名称">
                    <el-input v-model="form.name" placeholder="请输入类型名称"></el-input>
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
    export default {
        data() {
            return {
                keyword: '',
                tableData: [],
                loading: true,
                pn: 1,
                pageSize: 15,
                count: 0,

                addDialogVisible: false,
                addDialogTitle: '添加类型',
                form: {
                    name: '',
                },
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.pn = val;
                this.getData();
            },
            getData(){
                this.loading = true;
                this.$axios.post('getServiceType', {
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
                this.addDialogTitle = '添加类型';
                this.form = {
                    name: '',
                };
            },
            add(){
                let self = this;

                if (self.form.id) {
                    this.$axios.post('updateServiceType', self.form, (res) => {
                        if (res.ret == true) {
                            self.getData();
                            self.addDialogVisible = false;
                            self.$message.success('修改成功');
                        }
                    })
                }else{
                    this.$axios.post('addServiceType', self.form, (res) => {
                        if (res.ret == true) {
                            self.getData();
                            self.addDialogVisible = false;
                            self.$message.success('添加成功');
                        }
                    })
                }
            },
            del(index, row) {
                this.$confirm('确定删除该类型?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delServiceType', {
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
                this.addDialogTitle = '修改类型';
                this.form = row;
            },
        }
    }
</script>

<style>
    
</style>