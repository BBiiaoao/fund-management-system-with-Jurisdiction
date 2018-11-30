<template>
    <div class="fillContainer">
        <div class="addContainer">
            <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight">
                    <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableContainer">
            <el-table
                    v-if="tableData.length>0"
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        :width=fivePercentUnit>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="创建时间"
                        align="center"
                        :width=tenPercentUnit>
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="收支类型"
                        align="center"
                        :width=tenPercentUnit>
                </el-table-column>
                <el-table-column
                        prop="describe"
                        label="收支描述"
                        align="center"
                        :width=tenPercentUnit>
                </el-table-column>
                <el-table-column
                        prop="expend"
                        label="支出"
                        align="center"
                        :width=tenPercentUnit>
                    <template slot-scope="scope">
                        <span style="color:#f56767">{{scope.row.expend}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="income"
                        label="收入"
                        align="center"
                        :width=tenPercentUnit>
                    <template slot-scope="scope">
                        <span style="color:#00d053">{{scope.row.income}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cash"
                        label="账户现金"
                        align="center"
                        :width=tenPercentUnit>
                    <template slot-scope="scope">
                        <span style="color:#4db3ff">{{scope.row.cash}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注"
                        align="center"
                        :width=twentyPercentUnit>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        :width=fifteenPercentUnit>
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="warning"
                                icon="edit"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="small"
                                type="danger"
                                icon="delete"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <Dialog :dialog="dialog" :formData="formData" @update="getProfile()"></Dialog>
    </div>
</template>

<script>
    import Dialog from '../components/Dialog'
    export default {
        name: "FundList",
        data() {
            return {
                tableData: [],
                formData:{
                    type:"",
                    describe:"",
                    income:"",
                    expend:"",
                    cash:"",
                    remark:"",
                    id:""
                },
                dialog:{
                    show:false,
                    title:'',
                    option:'edit'
                },
                fivePercentUnit: 0,
                tenPercentUnit: 0,
                fifteenPercentUnit: 0,
                twentyPercentUnit: 0,
            }
        },
        components:{
            Dialog
        },
        created() {
            this.getProfile();
            this.getTablePercentage();
        },
        methods: {
            getProfile() {
                //获取表格数据
                this.$axios
                    .get('/api/profiles')
                    .then(res => {
                        this.tableData = res.data;
                        for (let i = 0; i < res.data.length; i++) {
                            this.tableData[i].date = res.data[i].date.substr(0, 10)
                        }
                    });
            },
            getTablePercentage() {
                const width = (document.body.clientWidth - 255) / 100;
                this.fivePercentUnit = width * 5;
                this.tenPercentUnit = width * 10;
                this.fifteenPercentUnit = width * 15;
                this.twentyPercentUnit = width * 20;
            },
            handleAdd(){
                this.dialog={
                    show:true,
                    title:'添加资金信息',
                    option:'add'
                };

                this.formData={
                    type:"",
                    describe:"",
                    income:"",
                    expend:"",
                    cash:"",
                    remark:"",
                    id:""
                }

            },
            handleEdit(index,row){
                //编辑
                this.dialog={
                    show:true,
                    title:'修改资金信息',
                    option:'edit'
                };

                this.formData={
                    type:row.type,
                    describe:row.describe,
                    income:row.income,
                    expend:row.expend,
                    cash:row.cash,
                    remark:row.remark,
                    id:row._id
                }
            },
            handleDelete(index,row){
                this.$axios.delete(`/api/profiles/delete/${row._id}`)
                    .then(res=>{
                        this.$message('删除成功!');
                        this.getProfile();
                    })
            }
        }
    }
</script>

<style scoped>
    .fillContainer{
        position: relative;
        margin-left:255px;
    }
    .btnRight{
        float: right;
        margin: 0;
    }
</style>