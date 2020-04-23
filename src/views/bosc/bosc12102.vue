<template>
  <basic-container>
    <h3>{{$route.query.id?$route.query.id:'测试'}}</h3>
    
    <avue-form :option="option"
               v-model="form" @submit="handleSubmit">
      <template slot="menuForm">
        <el-button icon="el-icon-back"
                   @click="handleBack()">返 回</el-button>
      </template>
    </avue-form>
  </basic-container>
</template>

<script>
import { send,getShow } from '@/api/bosc/bosc';
export default {
  data() {
    return {
      form: {
        
      },
      option: {
        labelWidth: 200,
        column: [
        {"type":"radio",
        "label":"请求方式",
        "dicData":[
              {
              "label":"POST",
              "value":"POST"},
              {
              "label":"HTTP",
              "value":"HTTP"}
              ],
        "span":24,
        "display":true,
        "prop":"METHOD",
        "valueDefault":"POST"},
        {"type":"radio",
        "label":"类型",
        "dicData":[
              {
              "label":"排列型",
              "value":"1"},
              {
              "label":"key-value",
              "value":"2"},
              {
              "label":"jsonBody",
              "value":"3"}
              ],
        "span":24,
        "display":true,
        "prop":"TYPE",
        "valueDefault":"3"}
        ]
      }
    };
  },
  created() {
    this.getThisShow();
  },
  methods: {
    handleBack() {
      this.$router.$avueRouter.closeTag();
      this.$router.back();
    },
    getThisShow(){
      console.warn("warn",this.$route.query.id);
      getShow(this.$route.query.id,this.$route.query.platsysid).then(res => {
          console.warn('12102getShow',res.data);
          this.option.column = res.data.data;
          res.data.value.forEach(ele => {
            this.form[ele.prop] = ele.valueDefault;
          })
      }, error => {
        console.warn('12102getShow',error);
      })
    },
    handleSubmit(form,done){
      this.form['platsysid'] = this.$route.query.platsysid;
      send(this.form).then(res => {
          done();
          console.warn('warn',res.data);
          this.form.res = res.data.retData;
          this.form.req = res.data.reqData;
          this.form.reqSign = res.data.reqSignData;
      }, error => {
          console.error('12102getShow',error);
          done();
      })
    }
  }
};
</script>

<style>
</style>
