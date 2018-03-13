<template>
    <div class="table">
        <div class="crumbs">
            <el-row>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i>配置</el-breadcrumb-item>
                    <el-breadcrumb-item>审批人员</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </div>

        <div class="crumbs" v-if="count < 2">
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" icon="plus" style="float:right;"
                        @click="addDialog">添加审批人员</el-button>
                </el-col>
            </el-row>
        </div>

        <el-table :data="tableData" v-loading.body="loading" border style="width: 100%">
            <el-table-column prop="approve" label="审批人员用户ID"></el-table-column>
            <el-table-column prop="name" label="审批人员名称"></el-table-column>
           
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="small" type="success"
                        @click="update(scope.$index, scope.row)">修改</el-button>
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
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="审批人员用户ID">
                    <el-input v-model="form.approve" placeholder="请输入审批人员用户ID"></el-input>
                </el-form-item>
                <el-form-item label="审批人员名称">
                    <el-input v-model="form.name" placeholder="请输入审批人员名称"></el-input>
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
                tableData: [],
                loading: true,
                pn: 1,
                pageSize: 15,
                count: 0,

                addDialogVisible: false,
                addDialogTitle: '添加审批人员',
                form: {
                    approve: '',
                    name: ''
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
                this.$axios.post('getApprove', {
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
                this.addDialogTitle = '添加审批人员';
                this.form = {
                    approve: '',
                    name: ''
                };
            },
            add(){
                let self = this;

                if (self.form.id) {
                    this.$axios.post('updateApprove', self.form, (res) => {
                        if (res.ret == true) {
                            self.getData();
                            self.addDialogVisible = false;
                            self.$message.success('修改成功');
                        }
                    })
                }else{
                    this.$axios.post('addApprove', self.form, (res) => {
                        if (res.ret == true) {
                            self.getData();
                            self.addDialogVisible = false;
                            self.$message.success('添加成功');
                        }
                    })
                }
            },
            update(index, row) {
                this.addDialogVisible = true;
                this.addDialogTitle = '修改审批人员';
                this.form = row;
            },
        }
    }
</script>

<style>
    
</style>