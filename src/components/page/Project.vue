<template>
    <div class="table">
        <div class="crumbs">
            <el-row>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i>出差记录</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </div>

        <div class="crumbs">
            <el-row>
                <el-col :span="12">
                    <el-radio-group v-model="done" @change="getData">
                        <el-radio-button label="0">进行中</el-radio-button>
                        <el-radio-button label="1">已结束</el-radio-button>
                    </el-radio-group>
                </el-col>

                <!-- <el-col :span="12">
                    <el-button type="primary" icon="plus" style="float:right;"
                        @click="addDialog">添加类型</el-button>
                </el-col> -->
            </el-row>
        </div>

        <el-table :data="tableData" v-loading.body="loading" border style="width: 100%">
            <el-table-column prop="customer" label="客户名称" width="170"></el-table-column>
            <el-table-column prop="type" label="服务类型"></el-table-column>
            <el-table-column prop="create" label="时间"></el-table-column>
           
            <el-table-column label="操作" width="110">
                <template slot-scope="scope">
                    <el-button size="small" type="success"
                        @click="getInfo(scope.$index, scope.row)">查看详情</el-button>
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
        
        <el-dialog title="出差详情" width="80%" :visible.sync="dialogVisible">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>客户信息</span>
                                </div>
                                <div class="text item">销售单号：{{detail.code}}</div>
                                <div class="text item">客户名称：{{detail.customer}}</div>
                                <div class="text item">单位名称：{{detail.company}}</div>
                                <div class="text item">前往地点：{{detail.place}}</div>
                                <div class="text item">详细地址：{{detail.address}}</div>
                                <div class="text item" v-for="item in detail.contact">联系人：{{item.name}}/{{item.tel}}</div>
                            </el-card>
                        </el-col>

                        <el-col :span="12">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>预收费用</span>
                                </div>
                                <div class="text item">服务天数：{{detail.days}}</div>
                                <div class="text item">服务人数：{{detail.peoples}}</div>
                                <div class="text item">交通费：{{detail.traffic}}</div>
                                <div class="text item">住宿费（单日）：{{detail.stayCharge}}</div>
                                <div class="text item">服务费（单日）：{{detail.serviceCharge}}</div>
                                <div class="text item">合计：￥{{detail.days * detail.peoples * (Number(detail.stayCharge) + Number(detail.serviceCharge)) + Number(detail.traffic)}}</div>
                            </el-card>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-top: 20px;">
                        <el-col :span="12">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>服务内容</span>
                                </div>
                                <div class="text item">服务类型：{{detail.type}}</div>
                                <div class="text item">单位数量：{{detail.number}}</div>
                                <div class="text item" v-for="item in detail.device">设备名称/数量：{{item.name}}/{{item.number}}</div>
                                <div class="text item">备注说明：{{detail.remark}}</div>
                            </el-card>
                        </el-col>

                        <el-col :span="12">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>技术申请信息</span>
                                </div>
                                <div class="text item">申请人：{{detail.name}}</div>
                                <div class="text item">申请日期：{{detail.create}}</div>
                            </el-card>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-top: 20px;">
                        <el-col :span="12" v-if="detail.addDaysInfo">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>新增天数</span>
                                </div>
                                <div class="text item">服务天数：{{detail.addDaysInfo.days}}</div>
                                <div class="text item">服务人数：{{detail.addDaysInfo.peoples}}</div>
                                <div class="text item">交通费：{{detail.addDaysInfo.traffic}}</div>
                                <div class="text item">住宿费（单日）：{{detail.addDaysInfo.stayCharge}}</div>
                                <div class="text item">服务费（单日）：{{detail.addDaysInfo.serviceCharge}}</div>
                                <div class="text item">合计：￥{{detail.addDaysInfo.days * detail.addDaysInfo.peoples * (Number(detail.addDaysInfo.stayCharge) + Number(detail.addDaysInfo.serviceCharge)) + Number(detail.addDaysInfo.traffic)}}</div>
                            </el-card>
                        </el-col>
                    </el-row>
                    
                </el-tab-pane>

                <el-tab-pane label="出差流程" name="second">
                    <el-steps direction="vertical" :active="10" process-status="finish">
                        <el-step title="客户电话沟通" v-if="flow1">
                            <p slot="description">服务类型：<span v-for="item in flow1.type">{{item}}</span></p>
                            <p slot="description">单位数量：<span>{{flow1.number}}</span></p>
                            <p slot="description" v-for="item in flow1.device">设备名称/数量：<span>{{item.name}}/{{item.number}}</span></p>
                            <p slot="description">时间：<span>{{flow1.create | time}}</span></p>
                        </el-step>
                        <el-step title="计划安排" v-if="flow2">
                            <p slot="description" v-for="item in flow2"><span>{{item.description}}</span></p>
                        </el-step>
                        <el-step title="借用设备申请" v-if="flow3">
                            <p slot="description" v-for="item in flow3.device">设备信息：<span>{{item.code}}/{{item.name}}/{{item.number}}</span></p>
                            <p slot="description">时间：<span>{{flow3.create | time}}</span></p>
                        </el-step>
                        <el-step title="确定出发日期" v-if="flow4">
                            <p slot="description" class="ticket-img" :style="{'background-image': 'url('+ flow4.url +')'}">
                            </p>
                            <p slot="description">出发日期：<span>{{flow4.date}}</span></p>
                            <p slot="description">备注：<span>{{flow4.remark}}</span></p>
                            <p slot="description">时间：<span>{{flow4.create | time}}</span></p>
                        </el-step>
                        <el-step title="现场问题确认" v-if="flow5">
                            <p slot="description">服务类型：<span v-for="item in flow5.type">{{item}}</span></p>
                            <p slot="description">单位数量：<span>{{flow5.number}}</span></p>
                            <p slot="description" v-for="item in flow5.device">设备名称/数量：<span>{{item.name}}/{{item.number}}</span></p>
                            <p slot="description">时间：<span>{{flow5.create | time}}</span></p>
                        </el-step>
                        <el-step title="技术支持进行" v-if="flow6">
                            <p slot="description">完成进度：<span>{{flow6.percentage}}</span></p>
                            <p slot="description">进度状态：<span>{{flow6.status}}</span></p>
                            <p slot="description">备注说明：<span>{{flow6.remark}}</span></p>
                            <p slot="description">时间：<span>{{flow6.create | time}}</span></p>
                        </el-step>
                        <el-step title="销售确认结束" v-if="flow7">
                            <p slot="description">备注说明：<span>{{flow7.remark}}</span></p>
                            <p slot="description">时间：<span>{{flow7.create | time}}</span></p>
                        </el-step>
                        <el-step title="确定返程日期" v-if="flow8">
                            <p slot="description" class="ticket-img" :style="{'background-image': 'url('+ flow8.url +')'}">
                            </p>
                            <p slot="description">出发日期：<span>{{flow8.date}}</span></p>
                            <p slot="description">备注：<span>{{flow8.remark}}</span></p>
                            <p slot="description">时间：<span>{{flow8.create | time}}</span></p>
                        </el-step>
                        <el-step title="出差财务报销" v-if="flow9">
                            <p slot="description">时间：<span>{{flow9.create | time}}</span></p>
                        </el-step>
                        <el-step title="出差项目总结" v-if="flow10">
                            <p slot="description">备用金：<span>{{flow10.amount}}</span></p>
                            <p slot="description">备注：<span>{{flow10.remark}}</span></p>
                            <p slot="description">时间：<span>{{flow10.create | time}}</span></p>
                        </el-step>
                    </el-steps>
                </el-tab-pane>

                <el-tab-pane label="报销审批" name="three">
                    <el-table :data="detail.dispatchList" border show-summary style="width: 100%">
                        <el-table-column prop="place" label="地点"></el-table-column>
                        <el-table-column prop="type" label="类型"></el-table-column>
                        <el-table-column prop="amount" label="金额"></el-table-column>
                        <el-table-column prop="bill" label="票据"></el-table-column>
                        <el-table-column prop="remark" label="描述"></el-table-column>
                        <el-table-column prop="create" label="时间"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                done: 0,
                tableData: [],
                loading: true,
                pn: 1,
                pageSize: 15,
                count: 0,

                curRow: {},
                curIndex: 0,

                activeName: 'first',
                dialogVisible: false,
                detail: {},
                flow1: {},
                flow2: {},
                flow3: {},
                flow4: {},
                flow5: {},
                flow6: {},
                flow7: {},
                flow8: {},
                flow9: {},
                flow10: {},
            }
        },
        created(){
            this.getData();
        },
        filters: {
            time(value) {
                return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getInfo(index, row){
                this.curIndex = index;
                this.curRow = row;
                this.dialogVisible = true;
                this.$axios.post('getInvoiceDetail', {
                    userId: row.userId,
                    id: row.id,
                    status: this.done
                }, (res) => {
                    if (res.ret == true) {
                        this.detail = res.data;
                        this.flow1 = res.data.flow1;
                        this.flow2 = res.data.flow2;
                        this.flow3 = res.data.flow3;
                        this.flow4 = res.data.flow4;
                        this.flow5 = res.data.flow5;
                        this.flow6 = res.data.flow6;
                        this.flow7 = res.data.flow7;
                        this.flow8 = res.data.flow8;
                        this.flow9 = res.data.flow9;
                        this.flow10 = res.data.flow10;
                    }
                })
            },
            handleCurrentChange(val){
                this.pn = val;
                this.getData();
            },
            getData(){
                this.loading = true;
                this.$axios.post('getInvoice', {
                    pn: this.pn,
                    done: this.done
                }, (res) => {
                    if (res.ret == true) {
                        this.tableData = res.data.list;
                        this.count = res.data.count;
                        this.loading = false
                    }
                })
            }
        }
    }
</script>

<style>
    .el-step__description p{
        color: #666;
        font-size: 14px;
        line-height: 2;
    }
    .ticket-img{
        height: 100px;
        width: 200px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        margin: 20px 0;
    }
    .name-wrapper{
        height: 22px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>