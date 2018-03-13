<template>
    <div class="table">
        <div class="crumbs">
            <el-row>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i>反馈管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </div>

        <el-table :data="tableData" v-loading.body="loading" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="170"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="description" label="问题描述"></el-table-column>
            <el-table-column prop="suggest" label="个人建议"></el-table-column>
           
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
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
                this.$axios.post('getFeedback', {
                    pn: this.pn
                }, (res) => {
                    if (res.ret == true) {
                        this.tableData = res.data.list;
                        this.count = res.data.count;
                        this.loading = false
                    }
                })
            },
            del(index, row) {
                this.$confirm('确定删除该类型?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delFeedback', {
                        id: row.id
                    }, (res) => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
        }
    }
</script>

<style>
    
</style>