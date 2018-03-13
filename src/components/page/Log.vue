<template>
    <div class="table">
        <div class="crumbs">
            <el-row>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i>日志管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </div>

        <div class="crumbs">
            <el-row>
                <el-col :span="12">
                    <el-input
                        style="width: 200px;"
                        placeholder="请输入单位名称搜索"
                        prefix-icon="el-icon-search"
                        v-model="keyword"
                        @keyup.enter.native="getData">
                    </el-input>
                </el-col>

                <!-- <el-col :span="12">
                    <el-button type="primary" icon="plus" style="float:right;"
                        @click="addDialog">添加类型</el-button>
                </el-col> -->
            </el-row>
        </div>

        <el-table :data="tableData" v-loading.body="loading" border style="width: 100%">
            <el-table-column prop="userId" label="用户ID" width="170"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="type" label="工作类型"></el-table-column>
            <el-table-column prop="company" label="单位名称"></el-table-column>
            <el-table-column prop="description" label="工作描述">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.description }}</p>
                        <div slot="reference" class="name-wrapper">{{scope.row.description}}</div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="完成状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 1" type="success">未开始</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="info">进行中</el-tag>
                    <el-tag v-if="scope.row.status == 3" type="warning">已完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="create" label="创建时间"></el-table-column>
           
            <el-table-column label="操作" width="80">
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
                keyword: '',
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
                this.$axios.post('getLog', {
                    company: this.keyword,
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
                    this.$axios.post('delLog', {
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
    .name-wrapper{
        height: 22px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>