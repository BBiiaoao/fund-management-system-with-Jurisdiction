<template>
    <div class="fillContainer">
        <div class="addContainer">
            <el-form :inline="true" ref="add_data" :model="search_data">
                <!--筛选-->
                <el-form-item label="按照时间筛选:" class="select">
                    <el-date-picker
                            v-model="search_data.startTime"
                            type="datetime"
                            placeholder="选择开始时间"
                    >
                    </el-date-picker>
                    --
                    <el-date-picker
                            v-model="search_data.endTime"
                            type="datetime"
                            placeholder="选择结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="selectBtn">
                    <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
                </el-form-item>
                <el-form-item class="btnRight">
                    <el-button
                            v-if="user.identity == 'manager'"
                            type="primary"
                            size="small"
                            icon="view"
                            @click="handleAdd()">添加</el-button>
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
                        v-if="user.identity == 'manager'"
                        label="操作"
                        align="center"
                        :width=fifteenPercentUnit>
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="warning"
                                icon="edit"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="small"
                                type="danger"
                                icon="delete"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="user.identity == 'employee'"
                        label="管理员才有权限操作"
                        align="center"
                        :width=fifteenPercentUnit>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <el-row>
            <el-col :span="24">
                <div class="pagination">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="paginations.page_index"
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            :layout="paginations.layout"
                            :total="paginations.total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <Dialog :dialog="dialog" :formData="formData" @update="getProfile()"></Dialog>
    </div>
</template>

<script>
    import Dialog from '../components/Dialog'

    export default {
        name: "FundList",
        data() {
            return {
                search_data:{
                    startTime:"",
                    endTime:""
                },
                filterTableData:[],
                paginations: {
                    page_index: 1,//当前位于哪页
                    total: 0,//总数
                    page_size: 5,//每页显示多少条
                    page_sizes: [5, 10, 15, 20],//每页显示多少条选项
                    layout: "total,sizes,prev,pager,next,jumper"//翻页属性:总数，大小，上一条，页码，下一条，跳转
                },
                tableData: [],
                allTableData: [],
                formData: {
                    type: "",
                    describe: "",
                    income: "",
                    expend: "",
                    cash: "",
                    remark: "",
                    id: ""
                },
                dialog: {
                    show: false,
                    title: '',
                    option: 'edit'
                },
                fivePercentUnit: 0,
                tenPercentUnit: 0,
                fifteenPercentUnit: 0,
                twentyPercentUnit: 0,
            }
        },
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
        components: {
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
                        this.allTableData = res.data;
                        this.filterTableData=res.data;
                        for (let i = 0; i < res.data.length; i++) {
                            this.allTableData[i].date = res.data[i].date.substr(0, 10)
                        }
                        //设置分页数据
                        this.setPaginations()
                    });
            },
            getTablePercentage() {
                const width = (document.body.clientWidth - 255) / 100;
                this.fivePercentUnit = width * 5;
                this.tenPercentUnit = width * 10;
                this.fifteenPercentUnit = width * 15;
                this.twentyPercentUnit = width * 20;
            },
            setPaginations() {
                //分页属性设置
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size=5;
                //设置默认的分页数据
                this.tableData=this.allTableData.filter((item,index)=>{
                    return index < this.paginations.page_size
                })
            },
            handleAdd() {
                this.dialog = {
                    show: true,
                    title: '添加资金信息',
                    option: 'add'
                };

                this.formData = {
                    type: "",
                    describe: "",
                    income: "",
                    expend: "",
                    cash: "",
                    remark: "",
                    id: ""
                }

            },
            handleEdit(index, row) {
                //编辑
                this.dialog = {
                    show: true,
                    title: '修改资金信息',
                    option: 'edit'
                };

                this.formData = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                }
            },
            handleDelete(index, row) {
                this.$axios.delete(`/api/profiles/delete/${row._id}`)
                    .then(res => {
                        this.$message('删除成功!');
                        this.getProfile();
                    })
            },
            handleSizeChange(page_size) {
                //切换size
                this.paginations.page_index=1;
                this.paginations.page_size=page_size;
                this.tableData=this.allTableData.filter((item,index)=>{
                    return index < page_size
                })
            },
            handleCurrentChange(page) {
                //获取当前页
                let index=this.paginations.page_size*(page-1);
                //数据的总数
                let number=this.paginations.page_size*page;
                //容器
                let tables=[];

                for(let i=index;i<number;i++){
                    if(this.allTableData[i]){
                        tables.push(this.allTableData[i]);
                    }
                }
                this.tableData=tables
            },
            handleSearch(){
                //筛选
                if(!this.search_data.startTime||!this.search_data.endTime){
                    this.$message({
                        type:"warning",
                        message:"请选择时间区间"
                    });
                    this.getProfile();
                    return;
                }
                //getTime返回距 1970 年 1 月 1 日之间的毫秒数
                const sTime=this.search_data.startTime.getTime();
                const eTime=this.search_data.endTime.getTime();

                this.allTableData=this.filterTableData.filter(item=>{
                    let date=new Date(item.date);
                    let time=date.getTime();
                    return time>=sTime&&time<=eTime
                });

                //分页数据
                this.setPaginations()
            }
        }
    }
</script>

<style scoped>
    .fillContainer {
        position: relative;
        margin-left: 255px;
    }
    .select,
    .selectBtn,
    .btnRight{
        margin: 10px 0 5px 0;
    }
    .btnRight {
        float: right;
    }

    .pagination {
        margin-right: 20px;
        text-align: right;
    }
</style>