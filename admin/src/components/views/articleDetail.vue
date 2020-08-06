<template>
    <div id='out-box'>
        <div class="article-head">
            <el-row>
                <el-col :span="24">
                    <div id="article-head-title">
                        <i class="el-icon-s-data" id="article-head-title-icon"></i><span id="article-head-title-content">文章详情</span>
                    </div>
                </el-col> 
            </el-row>
            <el-row :gutter="20" class="padding-20">
                    <el-col :span="6">
                        <div class="block">
                            <el-date-picker
                            v-model="time"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="4" :offset="14">
                        <div class="block">
                            <el-input
                                placeholder="请输入标题"
                                prefix-icon="el-icon-search"
                                v-model="searchContent"
                                @keydown.enter.native="search"
                                
                                >
                            </el-input>
                        </div>
                    </el-col>   
            </el-row>
            <el-row :gutter="20"  class="padding-20">
                <el-col :span="2"><el-button type="primary" icon="el-icon-circle-plus" @click='add'>新增</el-button></el-col>
                <el-col :span="2"><el-button type="primary" icon="el-icon-reading" @click='read'>预览</el-button></el-col>
                <el-col :span="2"><el-button type="primary" icon="el-icon-delete-solid" @click="remove">删除</el-button></el-col>
            </el-row>
        </div>
        <div class="article-table">
            <el-table
            :data="tableData"
            :height="tableHeight"
            v-loading="loading"
            element-loading-text="拼命加载中"
            highlight-current-row
            @row-click="rowClick"
            :header-cell-style="headerStyle"
            :default-sort = "{prop: 'createTime', order: 'descending'}"
            style="width: 100%">
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="athor"
                label="作者"
                width="180">
            </el-table-column>
            <el-table-column
                prop="description"
                label="描述"
                width="180"
                >
            </el-table-column>
            <el-table-column
                prop="catogeries"
                label="标签"
                width="180"
                :formatter="catogeriesFormat"
                >
            </el-table-column>
            <el-table-column
                prop="content"
                label="内容"
                >
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="发布时间"
                width="200"
                :formatter="timeFormat">
            </el-table-column>
            </el-table>
        </div>
        <div class="article-footer">
            <div class="pagination">
                <el-pagination 
                    background 
                    @current-change="handleCurrentChange" 
                    :current-page="cur_page"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="totalPage">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="showDialog" :show-close="false">
            <el-form :model="articleForm">
                <el-form-item label="文章标题" :label-width="formLabelWidth">
                    <el-input v-model="articleForm.title" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="文章描述" :label-width="formLabelWidth">
                    <el-input v-model="articleForm.description" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="文章标签" :label-width="formLabelWidth">
                    <el-select v-model="articleForm.catogeries" placeholder="请选择活动区域" :disabled="disabled">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="js" value="1"></el-option>
                        <el-option label="css" value="2"></el-option>
                        <el-option label="html" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章内容" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="articleForm.content" :rows="12" :disabled="disabled"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelHandle">取 消</el-button>
                <el-button type="primary" @click="commitHandle">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import service from "../../js/http"
import commonFunc from '../../js/common'
export default {
    data(){
        return {
            time:'',
            searchContent:'',
            showDialog:false,
            dialogTitle:'',
            disabled:false,
            formLabelWidth:'80px',
            selectTitle:'',
            articleForm:{
                title:'',
                content:'',
                catogeries:'',
                athor:'',
                description:''
            },
            headerStyle:{
                "background":"#d05c5c",
                "color":"#eee"
            },
            tableData:[],
            tableHeight:0,
            loading:false,
            totalPage:1,
            cur_page:1,
        }
    },
    methods:{
        handleCurrentChange(val){
            this.getData({
                cur_page:val,
                pagesize:10,
                searchCondition:[]
            })
        },
        dialogShow(){
            this.showDialog = true;
        },
        dialogHide(){
            this.showDialog = false;
        },
        add(){
            this.dialogTitle = '新增文章';
            this.disabled = false;
            this.clearForm();
            this.dialogShow();
        },
        read(){
            if(this.articleForm.title === ''){
                this.$message({
                    message:'请选择浏览文章'
                });
                return;
            }
            this.dialogTitle = '浏览文章';
            this.disabled = true;
            this.dialogShow();
        },
        remove(){
            let _THIS = this;
            if(!this.selectTitle){
                this.$message({
                    message:'请选择一行进行删除'
                });
                return;
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {


                service({
                    method: 'Post',
                    url:'/blog/delete',
                    data:{
                        "title":_THIS.selectTitle
                    }
                })
                .then( res => {
                     this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    _THIS.getData({
                        cur_page:1,
                        pagesize:10,
                        searchCondition:[]
                    });
                    _THIS.selectTitle = '';
                })
                .catch( err => {
                    this.$message.error(err)
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });


            
        },

        cancelHandle(){
            if(this.dialogTitle === '新增文章'){
                this.clearForm();   
            }
            this.dialogHide();
           
        },
        commitHandle(){
            let _THIS = this;
            if(!_THIS.articleForm.title){
                _THIS.$message({
                    message:'请输入文章标题'
                });
                return;
            }
            if(!_THIS.articleForm.description){
                _THIS.$message({
                    message:'请输入文章描述'
                });
                return;
            }
            if(!_THIS.articleForm.catogeries){
                _THIS.$message({
                    message:'请请选择标签'
                });
                return;
            }
            if(!_THIS.articleForm.content){
                _THIS.$message({
                    message:'请输入文章内容'
                });
                return;
            }
            if(_THIS.dialogTitle === '新增文章'){
                service({
                    method: 'Post',
                    url:'/blog/add',
                    data:Object.assign({},_THIS.articleForm,{athor:'admin'})
                })
                .then(res => {
                    _THIS.getData({
                        cur_page:1,
                        pagesize:10,
                        searchCondition:[]
                    });
                    _THIS.clearForm();
                    _THIS.dialogHide();
                })
                .catch( err => {
                    this.$message.error(err)
                })
            }
            else{
                _THIS.dialogHide();
            }
        },
        clearForm(){
            this.articleForm = {
                title:'',
                content:'',
                catogeries:'',
                athor:''
            }
        },
        getData(data){
            
            let _THIS = this;
            _THIS.loading = true;
            service({
                method: 'Post',
                url:'/blog/index',
                data:data
            })
            .then(res => {
                _THIS.tableData = res.data.data;
                _THIS.totalPage = res.data.count;
                setTimeout(() => {
                      _THIS.loading = false;
                }, 1000);
            })
            .catch( err => {
                _THIS.loading = false;
                this.$message.error(err)
            })
        },
        catogeriesFormat(d){
            let catogeries = d.catogeries;
            switch(catogeries){
                case 1:
                    return "js";
                    break
                case 2:
                    return "css";
                    break
                case 3:
                    return "html"
                    break
            }
        },
        timeFormat(d){
            let time = d.createTime;
            return this.utcTimeFormat(time)
        },
        utcTimeFormat(d){
            let tProps = d.split('T'),zProps = tProps[1].split('Z');
            let time = new Date(tProps[0]+ " " + zProps[0]).getTime() + 1000*60*60*8;       
            let nowTime = new Date(time);            
            return commonFunc.timeFormat({date:nowTime,format:'-'})
        },
        rowClick(row, column, event){
            console.log(row, column, event);
            let selectObj = {
                1:"js",
                2:"css",
                3:"html"
            }
            this.articleForm = {
                title:row.title,
                content:row.content,
                catogeries:selectObj[row.catogeries],
                athor:row.athor
            };
            this.selectTitle = row.title;
        },
        search(){
            let _THIS = this;
            _THIS.getData({
                cur_page:1,
                pagesize:10,
                searchCondition:[{
                    title:_THIS.searchContent
                }]
            })
        }
    },
    created(){
        this.getData({
            cur_page:1,
            pagesize:10,
            searchCondition:[]
        })
        this.tableHeight = document.documentElement.clientHeight - 400;
    },
    mounted(){
        let _THIS = this; 
        window.onresize = function () {
            let height = document.documentElement.clientHeight;
            _THIS.tableHeight = height - 400 < 200 ? 200 : height - 400;
        };
    }
}
</script>
<style lang="less">
@padding-50:50px;
@padding-20:20px;
@margin-bottom-2:2rem;
@font-size-1:1rem;
@font-size-2:2rem;
@border-bottom:1px solid #eee;
#out-box{
    padding: @padding-50;
    height: calc(100vh - 200px);
    background: #f1ecec29;
    .article-head{
        #article-head-title{
            border-bottom: @border-bottom;
            #article-head-title-icon{
                font-size: 1.5rem;
                margin-right: 1rem;
            };
            #article-head-title-content{
                font-size: @font-size-2;
            }
        };
        .padding-20{
            padding:@padding-20;
            padding-left:40px;
            border-bottom: @border-bottom;
            button{
                background: rgb(208, 92, 92);
                border:none;
                outline: none;
            }
            button:hover{
                color:rgb(208, 92, 92);
                background:#EDD0BE ;
            }
        }
    }
    .article-table{

    }
    .article-footer{
        position: absolute;
        bottom: 10px;
        right: 50px;
    }
}
</style>

