<template>
    <div>
        <div class="content">
            <basic-container class="member-container">
                <header>
                    <span @click="customActive" :class="['title',avtive ? '':'select-active']">客户资料</span>
                    <span @click="storesActive" :class="['title',avtive ? 'select-active':'']">归属门店</span>
                </header>
                <div :class="[show ? 'table-show':'table-hide']">
                    <!--表格-->
                    <section class="member-table" v-for="(tableGroup,index) in tableData" :key="index">
                        <div class="table-title">
                            <div class="item-title">
                                <span>{{ tableGroup.groupName }}</span>
                                <el-tooltip
                                        popper-class="tooltip-top"
                                        effect="light" content="拖拽可调整信息在买家手机端显示的顺序，保存生效"
                                        placement="right">
                                    <span><i class="el-icon-question"></i></span>
                                </el-tooltip>
                            </div>
                            <div class="item-right-button">
                                <el-button @click="addData(tableGroup.id)" class="item-button" size="small">新增信息
                                </el-button>
                                <el-button v-if="tableGroup.id !== '1'" @click="editGroup(tableGroup.id)"
                                           class="item-button"
                                           size="small">编辑
                                </el-button>
                                <el-button v-if="tableGroup.id !== '1'" @click="delGroup(tableGroup.id)"
                                           class="item-button"
                                           size="small">删除
                                </el-button>

                                <el-button @click="openTable(tableGroup.id)" type="text" class="item-button"
                                           size="small"><i
                                        style="font-size: 13px !important;"
                                        :class="[tableGroup.tableStatus ? 'icon-tuichuquanping':'icon-quanping']"></i>{{
                                    tableGroup.tableStatus ?
                                    '折叠':'展开' }}
                                </el-button>
                            </div>
                        </div>
                        <template>
                            <el-table
                                    :class="[tableGroup.tableStatus? 'table-show':'table-hide']"
                                    row-key="id"
                                    ref="moveTable"
                                    :data="tableGroup.groupDate"
                                    style="width: 100%">
                                <el-table-column
                                        prop="message"
                                        label="信息"
                                        width="160">
                                </el-table-column>
                                <el-table-column
                                        prop="isUse"
                                        label="使用"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-checkbox
                                                :disabled=scope.row.isDisable
                                                v-model="scope.row.isUse"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="isMust"
                                        label="必填"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-checkbox
                                                :disabled=scope.row.isDisable
                                                v-model="scope.row.isMust"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="isEdit"
                                        width="120"
                                        label="可修改">
                                    <template slot-scope="scope">
                                        <el-checkbox
                                                :disabled=scope.row.isDisable
                                                v-model="scope.row.isEdit"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="type"
                                        label="信息格式">
                                    <template slot-scope="scope">
                                        {{scope.row.type|messageType}}
                                        <div class="formatType-select" v-if="scope.row.formatType.select">
                                            <el-select size="mini"
                                                       v-model=scope.row.formatType.value>
                                                <el-option
                                                        v-for="item in scope.row.formatType.dict"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        width="220"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.showOperate">
                                            <el-button @click="editEvent(scope.row)" size="small" type="text">编辑
                                            </el-button>
                                            <el-button @click="deleteEvent(scope.row)" style="padding-left: 18px"
                                                       size="small"
                                                       type="text">删除
                                            </el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>

                    </section>
                    <!--底部新增-->
                    <section class="bottom-add">
                        <h4 @click="addGroup">新增自定义分组</h4>
                    </section>
                </div>
                <Shop :class="[show ? 'table-hide':'table-show']"></Shop>
            </basic-container>
            <!--底部保存filex-->
            <div v-if="show" class=" member-bottom-card">
                <el-button class="member-bottom-button" @click="submitAll" size="mini" type="primary">保存</el-button>
            </div>
            <!--新增dialog-->
            <el-dialog
                    @close="closedDialog"
                    custom-class="addData-dialog"
                    :modal-append-to-body="false"
                    :title="title"
                    :visible.sync="dialogVisible"
                    width="400px">
                <el-form ref="form" :rules="rules" label-position="right" label-width="80px" :model="form">
                    <el-form-item :inline-message="true" label="信息名称" prop="message">
                        <el-input maxlength="6"
                                  show-word-limit
                                  placeholder="请填写信息名称"
                                  size="mini"
                                  v-model="form.message">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="信息格式" prop="type">
                        <el-select size="mini" style="width: 280px" v-model="form.type" placeholder="请选择活动区域">
                            <el-option label="文本" value="1"></el-option>
                            <el-option label="日期" value="2"></el-option>
                            <el-option label="预设选项" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 选择预设才可以选择-->
                    <el-row v-if="form.type === '3'">
                        <el-form-item prop="selectText" label="选项内容">
                            <el-col :span="18">
                                <el-input
                                        maxlength="10"
                                        show-word-limit
                                        size="mini"
                                        v-model="selectText"></el-input>
                            </el-col>
                            <el-col :push="1" :span="4">
                                <el-button @click="addSelectText" size="mini">添加</el-button>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <!--tags-->
                    <el-row v-if="form.type === '3'">
                        <el-col :push="5" :span="19">
                            <el-tag class="item-tag"
                                    type="info"
                                    v-for="tag in tags"
                                    :key="tag.id"
                                    @close="removeTag(tag.id)"
                                    closable>
                                {{ tag.name }}
                            </el-tag>
                        </el-col>
                    </el-row>
                    <el-form-item label="提示文案" prop="copy">
                        <el-input
                                maxlength="15"
                                show-word-limit
                                placeholder="请填写提示文案"
                                size="mini"
                                v-model="form.copy">
                        </el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" type="primary" @click="submitForm">保存</el-button>
                    <el-button class="dialog-button" type="text" size="mini" @click="cancel">取消</el-button>
                </div>
            </el-dialog>
            <!--组的dialog-->
            <el-dialog
                    @close="closedDialogGroup"
                    custom-class="addData-dialog"
                    :modal-append-to-body="false"
                    :title="groupTitle"
                    :visible.sync="dialogVisibleGroup"
                    width="400px">
                <el-form ref="groupForm" :rules="rulesGroup" label-position="right" label-width="80px"
                         :model="groupForm">
                    <el-form-item :inline-message="true" label="分组名称" prop="groupName">
                        <el-input maxlength="10"
                                  show-word-limit
                                  placeholder="请填写自定义分组名称"
                                  size="mini"
                                  v-model="groupForm.groupName">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" type="primary" @click="submitGroup">保存</el-button>
                    <el-button class="dialog-button" type="text" size="mini" @click="cancelGroup">取消</el-button>
                </div>
            </el-dialog>
        </div>

    </div>

</template>

<script>
    import Sortable from 'sortablejs'
    import Shop from "./shop";
    import { mapGetters} from "vuex";

    export default {
        name: 'index',
        components: {Shop},
        data() {
            return {
                avtive: false,
                checked: false,
                dialogVisible: false,
                dialogVisibleGroup: false,
                show: true,
                // 预设信息
                selectText: '',
                title: '',
                groupTitle: '',
                tags: [],
                num: 0,
                form: {
                    type: '1'
                },
                groupForm: {},
                newList: [],
                tableData: [],
                sourceData:
                    [
                        {
                            id: '1',
                            groupName: '基础信息',
                            tableStatus: true,
                            groupDate: [{
                                gid: '1',
                                message: '手机号',
                                isUse: true,
                                isDisable: true,
                                isMust: true,
                                isEdit: false,
                                copy: '',
                                type: '1',
                                formatType: {}

                            }, {
                                gid: '2',
                                message: '身份证',
                                isUse: false,
                                isDisable: false,
                                isMust: false,
                                isEdit: false,
                                copy: '',
                                type: '1',
                                formatType: {}
                            }, {
                                gid: '3',
                                message: '地址',
                                isUse: false,
                                isDisable: false,
                                isMust: false,
                                isEdit: false,
                                showOperate: false,
                                copy: '',
                                type: '1',
                                formatType: {}
                            }, {
                                gid: '4',
                                message: '姓名',
                                isUse: false,
                                isDisable: false,
                                isMust: false,
                                isEdit: false,
                                showOperate: false,
                                copy: '',
                                type: '1',
                                formatType: {}
                            }, {
                                gid: '5',
                                message: '邮箱',
                                isUse: false,
                                isDisable: false,
                                isMust: false,
                                isEdit: false,
                                showOperate: false,
                                copy: '',
                                type: '1',
                                formatType: {}
                            }, {
                                gid: '6',
                                message: '生日',
                                isUse: false,
                                isDisable: false,
                                isMust: false,
                                isEdit: false,
                                showOperate: false,
                                copy: '',
                                type: '2',
                                formatType: {}
                            }, {
                                gid: '7',
                                message: '性别',
                                isUse: false,
                                isDisable: false,
                                isMust: false,
                                isEdit: false,
                                showOperate: false,
                                copy: '',
                                type: '3',
                                formatType: {
                                    select: true,
                                    value: '1',
                                    dict: [{
                                        value: '1',
                                        label: '未知'
                                    }, {
                                        value: '2',
                                        label: '男'
                                    }, {
                                        value: '3',
                                        label: '女'
                                    }],
                                }

                            }, {
                                gid: '8',
                                message: '教育背景',
                                isUse: false,
                                isDisable: false,
                                isMust: false,
                                isEdit: false,
                                showOperate: false,
                                copy: '',
                                type: '3',
                                formatType: {
                                    select: true,
                                    value: '1',
                                    dict: [{
                                        value: '1',
                                        label: '小学'
                                    }, {
                                        value: '2',
                                        label: '初中'
                                    }, {
                                        value: '3',
                                        label: '高中'
                                    }, {
                                        value: '4',
                                        label: '专科'
                                    }, {
                                        value: '5',
                                        label: '本科'
                                    }, {
                                        value: '6',
                                        label: '硕士'
                                    }, {
                                        value: '7',
                                        label: '博士'
                                    }],
                                }
                            },
                                {
                                    gid: '9',
                                    message: '爱好',
                                    isUse: false,
                                    isDisable: false,
                                    isMust: false,
                                    isEdit: false,
                                    showOperate: false,
                                    copy: '',
                                    type: '3',
                                    formatType: {
                                        select: true,
                                        value: '1',
                                        dict: [{
                                            value: '1',
                                            label: '游戏'
                                        }, {
                                            value: '2',
                                            label: '阅读'
                                        }, {
                                            value: '3',
                                            label: '音乐'
                                        }, {
                                            value: '4',
                                            label: '运动'
                                        }, {
                                            value: '5',
                                            label: '动漫'
                                        }, {
                                            value: '6',
                                            label: '旅行'
                                        }, {
                                            value: '7',
                                            label: '居家'
                                        }],
                                    }

                                },
                                {
                                    gid: '10',
                                    message: '收入',
                                    isUse: false,
                                    isDisable: false,
                                    isMust: false,
                                    isEdit: false,
                                    showOperate: false,
                                    copy: '',
                                    type: '3',
                                    formatType: {
                                        select: true,
                                        value: '1',
                                        dict: [{
                                            value: '1',
                                            label: '5万以下'
                                        }, {
                                            value: '2',
                                            label: '5-15万'
                                        }, {
                                            value: '3',
                                            label: '15-30万'
                                        }, {
                                            value: '4',
                                            label: '30万以上'
                                        }],
                                    }

                                },
                                {
                                    gid: '11',
                                    message: '行业',
                                    isUse: false,
                                    isDisable: false,
                                    isMust: false,
                                    isEdit: false,
                                    showOperate: false,
                                    copy: '',
                                    type: '3',
                                    formatType: {
                                        select: true,
                                        value: '1',
                                        dict: [{
                                            value: '1',
                                            label: 'IT/互联网/通讯/电子'
                                        }, {
                                            value: '2',
                                            label: '金融/投资/财会'
                                        }, {
                                            value: '3',
                                            label: '市场/销售/客服'
                                        }, {
                                            value: '4',
                                            label: '广告/媒体/出版/艺术'
                                        },
                                            {
                                                value: '5',
                                                label: '人事/行政/管理'
                                            },
                                            {
                                                value: '6',
                                                label: '消费品/贸易/物流'
                                            }],
                                    }

                                }
                            ],

                        }
                    ],
                // 表单校验
                rules: {
                    message: [
                        {required: true, message: "必须填写", trigger: "blur"}
                    ],
                    copy: [
                        {required: true, message: "必须填写", trigger: "blur"}
                    ]
                }, rulesGroup: {
                    groupName: [
                        {required: true, message: "必须填写", trigger: "blur"}
                    ]
                }
            };
        },
        computed: {
            ...mapGetters([
                'memberData',
            ]),
        },
        mounted() {
            // 从localStorage获取
            // let data = localStorage.getItem('myData');
            // if (data != null && data !== '') {
            //     this.tableData = JSON.parse(data);
            // } else {
            //     this.tableData = this.sourceData;
            // }
            // 从vuex里获取
            this.tableData = this.memberData.length > 0 ? this.tableData = JSON.parse(this.memberData) : this.tableData = this.sourceData;
            this.$nextTick(() => {
                this.createSortable()
            })
        },
        methods: {
            customActive() {
                this.avtive = !this.avtive;
                this.show = !this.show;
            },
            storesActive() {
                this.show = !this.show;
                this.avtive = !this.avtive
            },
            addData(id) {
                this.form = {
                    type: '1'
                };
                this.title = '新增信息';
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id === id) {
                        // id赋值给key,区分表单
                        this.form.key = this.tableData[i].id;
                    }
                }
                this.dialogVisible = true;
            },
            // 折叠关闭事件
            openTable(id) {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id === id) {
                        this.tableData[i].tableStatus = !this.tableData[i].tableStatus
                    }
                }
            },
            // 添加预设信息
            addSelectText() {
                let num = Date.now().toString();
                if (this.selectText.trim() === '') return this.$message.warning('请输入预设信息');
                const selectText = this.selectText.trim();
                let obj = {id: num, name: selectText};
                this.tags.push(obj)
            },
            // 删除预设信息
            removeTag(id) {
                this.tags.splice(this.tags.findIndex(i => i.id === id), 1)
            },
            // 关闭dialog清空
            closedDialog() {
                this.tags = [];
                this.selectText = '';
            },
            // 保存提交
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.gid) {
                            // 修改
                            if (this.form.type === '3' && this.tags.length === 0) {
                                return this.$message.warning('请选择预设选项')
                            }
                            const message = this.form.message.trim();
                            const copy = this.form.copy.trim();
                            const gid = this.form.gid; // 获取gid
                            const obj = this.handleFormatType(message, copy, gid);
                            for (let i = 0; i < this.tableData.length; i++) {
                                const table = this.tableData[i];
                                for (let j = 0; j < table.groupDate.length; j++) {
                                    if (table.groupDate[j].gid === gid) {
                                        // 先删再插入,模拟数据需要
                                        table.groupDate.splice(j, 1, obj);
                                        this.cancel();
                                        this.$message.success('修改成功')
                                    }
                                }
                            }
                        } else {
                            // 新增
                            if (this.form.type === '3' && this.tags.length === 0) {
                                return this.$message.warning('请选择预设选项')
                            }
                            const message = this.form.message.trim();
                            const copy = this.form.copy.trim();
                            const gid = Date.now().toString(); // 生成gid
                            const obj = this.handleFormatType(message, copy, gid);
                            for (let item of this.tableData) {
                                if (item.id === this.form.key) {
                                    if (item.groupDate.filter(i => i.messages == name).length > 0) {
                                        return this.$message.error('信息名称不能重复')
                                    } else {
                                        item.groupDate.push(obj);
                                        this.cancel();
                                        this.$message.success('新增成功')
                                    }
                                }
                            }
                        }
                    }
                })
            },
            // 取消
            cancel() {
                this.dialogVisible = false;
                this.form = {
                    type: '1',
                    name: undefined,
                    copy: undefined,
                    key: undefined
                };
                this.closedDialog()
            },
            addGroup() {
                this.groupTitle = '新增自定义分组';
                this.dialogVisibleGroup = true;
            },
            closedDialogGroup() {

            },
            editEvent(data) {
                this.title = '修改信息';
                this.dialogVisible = true;
                for (let i = 0; i < this.tableData.length; i++) {
                    const table = this.tableData[i];
                    for (let j = 0; j < table.groupDate.length; j++) {
                        if (data.gid === table.groupDate[j].gid) {
                            this.form = table.groupDate[j];
                            // 处理回显tags
                            const dict = this.form.formatType.dict;
                            if (dict !== undefined && dict.length > 0) {
                                dict.forEach(i => {
                                    this.tags.push({id: i.value, name: i.label})
                                });
                            }
                        }
                    }
                }
            },
            deleteEvent(data) {
                for (let i = 0; i < this.tableData.length; i++) {
                    const table = this.tableData[i];
                    for (let j = 0; j < table.groupDate.length; j++) {
                        if (data.gid === table.groupDate[j].gid) {
                            table.groupDate.splice(j, 1);
                        }
                    }

                }
                this.$message.success('删除成功');
            },
            // 提交分组
            submitGroup() {
                this.$refs["groupForm"].validate(valid => {
                    if (valid) {
                        if (this.groupForm.fid) {
                            // 修改
                            this.tableData.filter(i => i.id === this.groupForm.id)[0].groupName = this.groupForm.groupName.trim();
                            this.dialogVisibleGroup = false;
                            this.$message.success('修改成功')
                        } else {
                            // 新增
                            const groupName = this.groupForm.groupName.trim();
                            const id = Date.now().toString();
                            const fid = Date.now().toString();
                            const obj = {
                                id: id,
                                fid: fid,
                                groupName: groupName,
                                tableStatus: true,
                                groupDate: []
                            };
                            // 名称是否重复
                            if (this.tableData.filter(i => i.groupName == groupName).length > 0) {
                                return this.$message.error('分组名称重复,请重新输入!')
                            } else {
                                this.tableData.push(obj);
                                this.dialogVisibleGroup = false;
                                this.groupForm.groupName = '';
                                this.$message.success('新增成功');
                            }
                        }
                    }
                });
                this.$nextTick(() => {
                    // const num = this.tableData.length - 1;
                    this.createSortable()
                    // console.log(this.$refs.moveTable[1]);
                })
            },
            cancelGroup() {
                this.dialogVisibleGroup = false;
            },
            editGroup(id) {
                this.groupTitle = '修改自定义分组';
                this.dialogVisibleGroup = true;
                this.groupForm = this.tableData.filter(i => i.id === id)[0];
            },
            delGroup(id) {
                // 索引
                const delId = this.tableData.findIndex(i => i.id === id);
                this.$confirm('删除分组将同时删除该分组下的所有信息字段，是否确认删除？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.tableData.splice(delId, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            submitAll() {
                const data = JSON.stringify(this.tableData);
                // localStorage.setItem('myData', data);
                this.$store.commit('SET_TABLEDATA', data);
                this.$message({
                    showClose: 'true',
                    message: `提交成功`,
                    type: 'success'
                });
            },
            // form处理
            handleFormatType(message, copy, gid) {

                let formatType = {};
                let dict = [];
                let type = this.form.type;
                if (type === '3' && this.tags.length > 0) {
                    this.tags.forEach(i => {
                        dict.push({value: i.id, label: i.name})
                    });
                    formatType.select = true;
                    formatType.dict = dict;
                    formatType.value = dict[0].value
                }
                return {
                    gid: gid,
                    message: message,
                    isUse: false,
                    isDisable: false,
                    isMust: false,
                    isEdit: false,
                    copy: copy,
                    type: type,
                    showOperate: true,
                    formatType: formatType
                };
            },
            // 表格拖动
            // setSort() {
            //     // console.log(this.$refs.moveTable[0].$el)
            //     const el = this.$refs.moveTable[0].$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            //     this.sortable = Sortable.create(el, {
            //         animation: 150,
            //         // ghostClass: 'blue-background-class',
            //         // ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
            //         setData: function (dataTransfer) {
            //             // to avoid Firefox bug
            //             // Detail see : https://github.com/RubaXa/Sortable/issues/1012
            //             dataTransfer.setData('Text', '')
            //         },
            //         // onEnd: evt => {
            //         //     const targetRow = this.list.splice(evt.oldIndex, 1)[0]
            //         //     this.list.splice(evt.newIndex, 0, targetRow)
            //         //     // for show the changes, you can delete in you code
            //         //     const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
            //         //     this.newList.splice(evt.newIndex, 0, tempIndex)
            //         // }
            //     })
            // },
            createSortable() {
                if (this.tableData.length > 0) {
                    for (let i = 0; i < this.tableData.length; i++) {
                        const ele = this.$refs.moveTable[i].$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
                        this.sortable = Sortable.create(ele, {
                            animation: 150,
                            setData: function (dataTransfer) {
                                dataTransfer.setData('Text', '')
                            },
                            onEnd: evt => {
                                const targetRow = this.list.splice(evt.oldIndex, 1)[0];
                                this.list.splice(evt.newIndex, 0, targetRow);
                                // for show the changes, you can delete in you code
                                const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                                this.newList.splice(evt.newIndex, 0, tempIndex)
                            }
                        })
                    }
                }
            }
        },
        filters: {
            messageType(type) {
                if (type === '1') {
                    return '文本'
                } else if (type === '2') {
                    return '日期'
                } else {
                    return '预设选项'
                }
            }
        },
    }
</script>

<style lang="scss">
    .content {
        .el-card__body {
            padding: 10px;
        }

        .el-button + .el-button {
            margin-left: 0 !important;
        }

        /*dialog样式*/
        .addData-dialog {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            border-radius: 8px;

            .el-dialog__title {
                font-size: 13px;
                font-weight: bold;
            }

            .el-dialog__body {
                padding: 10px 20px;
            }

            .el-form-item {
                margin-bottom: 2px;
            }

            .dialog-button {
                color: #595961;
                width: 56px;
                height: 28px;
                border: 1px solid #e2e3e4;
                line-height: 1;
                text-align: center;
                display: inline-block;
                margin-left: 10px !important;
            }
        }

        /*tag样式*/

        .item-tag {
            background: #F2F2F6 !important;
            margin: 4px 6px;
            border: none;
            color: #595961;
        }

    }

    .el-select-dropdown, .el-select-dropdown .el-scrollbar__wrap {
        height: auto !important;
    }


    /*提示自定义*/
    .tooltip-top {
        padding: 8px 10px;
        font-size: 12px;
        color: #333333;
        border-color: #e3e2e5 !important;

        .el-tooltip__popper.is-light .popper__arrow {
            border-right-color: #fff !important;
        }

    }

    /*table自定义*/
    .member-table {
        .el-table--fit {
            border-radius: 10px;
            border: 1px solid #E3E2E5;
        }

        .el-table thead {
            color: #595961;
            font-size: 12px;
        }

        .el-table__row {
            color: #595961;
            font-size: 12px;

            &:nth-child(2n+1) {
                background: #f2f2f6;
            }
        }

        .el-table__row {
            cursor: move;
        }

        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: rgba(0, 0, 0, 0) !important;
        }

    }

    .el-tooltip__popper.is-light .popper__arrow {
        border-right-color: #e3e4e5 !important;
    }

    .el-tooltip__popper .popper__arrow {
        border-right-color: #e3e4e5 !important;
    }

    /*select自定义*/
    .formatType-select {
        position: absolute;
        top: 10px;
        left: 65px;
    }

    /*折叠样式*/
    .table-show {
        display: block !important;
    }

    .table-hide {
        display: none !important;
    }
</style>

<style scoped lang="scss">
    .content {
        height: 100%;

        .member-container {
            margin-bottom: 80px;

        }

        header {
            .title {
                display: inline-block;
                height: 36px;
                line-height: 36px;
                font-size: 16px;
                width: 120px;
                text-align: center;
                border-radius: 6px;
                cursor: pointer;
            }

            .select-active {
                color: #fff;
                background: #2589FF;
            }
        }

        /*表格*/
        .member-table {
            background: #F2F2F6;
            border-radius: 5px;
            margin-top: 10px;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 10px;

            .table-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-height: 50px;

                .item-title {
                    font-size: 14px;
                    color: #595961;

                    span {
                        &:nth-child(2) {
                            color: #aaaaaa;
                            margin-left: 5px;
                        }
                    }
                }

                .item-right-button {
                    .item-button {
                        width: 90px;
                        background-color: white;
                        color: #595961;
                        border-color: #e3e2e5;
                        margin-right: 10px;

                        &:first-child {
                            color: #2589ff !important;
                            background-color: white;
                            border-color: #2589ff;

                        }

                        &:last-child {
                            i {
                                font-size: 13px;
                                margin-right: 5px;
                            }
                        }

                        &:hover {
                            color: #2589ff !important;
                            background-color: white;
                            border-color: #2589ff;
                        }
                    }
                }
            }

        }

        .bottom-add {
            text-align: center;
            margin-top: 10px;
            font-weight: bold;
            font-size: 14px;
            letter-spacing: 0;
            cursor: pointer;
            border: 1px solid #2589FF;
            color: #2589FF;
            border-radius: 6px
        }
    }


    /*底部保存*/
    .member-bottom-card {
        box-shadow: 0 2px 10px 0 rgba(15, 12, 70, 0.16);
        border-radius: 10px 10px 0 0;
        height: 60px;
        background: #fff;
        position: absolute;
        bottom: 0;
        z-index: 100;
        width: 100%;
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: center;

        .member-bottom-button {
            width: 90px;
            background-color: #2589ff;
            border-color: #2589ff;
        }
    }
</style>
