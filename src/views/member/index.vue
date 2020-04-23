<template>
    <div class="content">
        <basic-container class="member-container">
            <header>
                <span @click="customActive" :class="['title',avtive ? '':'select-active']">客户资料</span>
                <span @click="storesActive" :class="['title',avtive ? 'select-active':'']">归属门店</span>
            </header>
            <!--表格-->
            <section class="member-table">
                <div class="table-title">
                    <div class="item-title">
                        <span>基础信息</span>
                        <el-tooltip
                                popper-class="tooltip-top"
                                effect="light" content="拖拽可调整信息在买家手机端显示的顺序，保存生效"
                                placement="right">
                            <span><i class="el-icon-question"></i></span>
                        </el-tooltip>
                    </div>
                    <div class="item-right-button">
                        <el-button @click="addMessage" class="item-button" size="small">新增信息</el-button>
                        <el-button @click="openTable" type="text" class="item-button" size="small"><i
                                :class="[tableStatus ? 'el-icon-full-screen':'el-icon-aim']"></i>{{ tableStatus ?
                            '折叠':'展开' }}
                        </el-button>
                    </div>
                </div>
                <template v-if="tableStatus">
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="信息"
                                width="160">
                            <template></template>
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
                                {{scope.row.formatType.type}}
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
                        </el-table-column>
                    </el-table>
                </template>
            </section>
            <!--底部新增-->
            <section class="bottom-add">
                <h4>新增自定义分组</h4>
            </section>
        </basic-container>
        <div class=" member-bottom-card">
            <el-button class="member-bottom-button" size="mini" type="primary">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                avtive: false,
                tableStatus: true,
                checked: false,
                value: '',
                tableData: [{
                    date: '手机号',
                    isUse: true,
                    isDisable: true,
                    isMust: true,
                    isEdit: false,
                    formatType: {
                        type: '文本'
                    }

                }, {
                    date: '身份证',
                    isUse: false,
                    isDisable: false,
                    isMust: false,
                    isEdit: false,
                    formatType: {
                        type: '文本'
                    }
                }, {
                    date: '地址',
                    isUse: false,
                    isDisable: false,
                    isMust: false,
                    isEdit: false,
                    formatType: {
                        type: '文本'
                    }
                }, {
                    date: '姓名',
                    isUse: false,
                    isDisable: false,
                    isMust: false,
                    isEdit: false,
                    formatType: {
                        type: '文本'
                    }
                }, {
                    date: '邮箱',
                    isUse: false,
                    isDisable: false,
                    isMust: false,
                    isEdit: false,
                    formatType: {
                        type: '文本'
                    }
                }, {
                    date: '生日',
                    isUse: false,
                    isDisable: false,
                    isMust: false,
                    isEdit: false,
                    formatType: {
                        type: '日期'
                    }
                }, {
                    date: '性别',
                    isUse: false,
                    isDisable: false,
                    isMust: false,
                    isEdit: false,
                    formatType: {
                        type: '预设选项',
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
                    date: '教育背景',
                    isUse: false,
                    isDisable: false,
                    isMust: false,
                    isEdit: false,
                    formatType: {
                        type: '预设选项',
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
                        date: '爱改',
                        isUse: false,
                        isDisable: false,
                        isMust: false,
                        isEdit: false,
                        formatType: {
                            type: '预设选项',
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
                        date: '收入',
                        isUse: false,
                        isDisable: false,
                        isMust: false,
                        isEdit: false,
                        formatType: {
                            type: '预设选项',
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
                        date: '行业',
                        isUse: false,
                        isDisable: false,
                        isMust: false,
                        isEdit: false,
                        formatType: {
                            type: '预设选项',
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
                ]
            }
        },
        methods: {
            customActive() {
                this.avtive = !this.avtive
            },
            storesActive() {
                this.avtive = !this.avtive
            },
            addMessage() {

            },
            openTable() {
                this.tableStatus = !this.tableStatus;
            }
        }
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

    }

    /*提示自定义*/
    .tooltip-top {
        padding: 8px 10px;
        font-size: 12px;
        color: #333333;
        border-color: #e3e2e5 !important;

        .el-tooltip__popper.is-light .popper__arrow {
            border-right-color: #c2c9d9;
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

        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: rgba(0, 0, 0, 0) !important;
        }

    }

    /*select自定义*/
    .formatType-select {
        position: absolute;
        top: 10px;
        left: 65px;

    }
</style>
<style scoped lang="scss">
    .content {
        position: relative;
        .member-container{
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

                        &:first-child {
                            color: #2589ff !important;
                            background-color: white;
                            border-color: #2589ff;
                            margin-right: 10px;
                        }

                        &:last-child {
                            background-color: white;
                            color: #595961;
                            border-color: #e3e2e5;

                            i {
                                font-size: 15px;
                                margin-right: 5px;
                            }

                        }

                        &:last-child:hover {
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
        position: fixed;
        z-index: 9999;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */

        .member-bottom-button {
            width: 90px;
            background-color: #2589ff;
            border-color: #2589ff;
        }
    }


</style>
