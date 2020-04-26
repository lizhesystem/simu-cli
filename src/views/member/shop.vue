<template>
    <section class="content-shop">
        <header>
            <div class="title-shop">归属优先级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导购门店 > 开卡门店
                <el-tooltip
                        popper-class="tooltip-top"
                        effect="light"
                        placement="right">
                    <div slot="content"><h4>优先级在同一场景触发多种规则时生效</h4>
                        举例：绑定导购节点设置为开卡，<br/>客户访问A门店绑定导购为A门店，开卡门店为B门店，<br/>
                        根据优先级规则，客户归属为A门店
                    </div>
                    <span>&nbsp;&nbsp;示例</span>
                </el-tooltip>
            </div>
        </header>
        <article>
            <h3>归属设置</h3>
            <p>开卡门店作为客户归属
                <el-switch class="switch-shop"
                           :width=35
                           v-model="value1"
                           active-color="#13ce66"
                >
                </el-switch>
                每7天可以修改一次，下次可修改时间为2020-04-29 00:00:00
            </p>
            <p>导购门店作为客户归属
                <el-switch
                        class="switch-shop"
                        disabled
                        :width=35
                        v-model="value2"
                        active-color="#13ce66"
                >
                </el-switch>
                绑定导购门店默认作为归属门店，不可修改
            </p>
            <h3>解绑/换绑设置</h3>
            <p>手机端解绑/换绑
                <el-switch
                        @change="clickSwitch"
                        :width=35
                        class="switch-shop"
                        v-model="value3"
                        active-color="#13ce66"
                >
                </el-switch>
                开启后客户可以在手机端“我的门店”中解绑或换绑门店
            </p>
        </article>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                value1: true,
                value2: false,
                value3: false
            }
        },
        methods: {
            clickSwitch() {
                let flag = this.value3;
                this.$confirm('是否确认开启手机端解绑/换绑门店', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.values3 = !flag;
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    return this.values3 = false;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
            }
        }
    }
</script>
<style>

</style>

<style scoped lang="scss">
    .content-shop {
        font-size: 12px;
        color: #595961;
        padding-bottom: 250px;

        header {
            height: 60px;
            background: #f2f2f6;
            border-radius: 5px;
            display: flex;
            align-items: center;
            margin-top: 10px;

            .title-shop {
                margin-left: 20px;

                > span {
                    cursor: pointer;
                    color: #2589FF;
                }
            }
        }

        article {
            background: #f2f2f6;
            border-radius: 5px;
            height: 400px;

            > h3 {
                padding: 20px 0 15px 20px;
            }

            > p {
                padding-left: 20px;
                padding-bottom: 10px;
            }
        }

    }

</style>
