<template>
  <avue-form :option="option" v-model="form"> </avue-form>
</template>

<script>
export default {
   data(){
     return {
       form:{},
       option: {
          labelWidth: 120,
          column: [
            {
              label: '七牛上传',
              prop: 'imgUrl',
              type: 'upload',
              listType: 'picture-img',
              propsHttp: {
                name: 'hash',
                url: "key"
              },
              oss: 'qiniu',
              loadText: '附件上传中，请稍等',
              span: 24,
              tip: '只能上传jpg/png文件，且不超过500kb',
            }
          ]
        }
     }
   }
}
</script>

<style>
</style>
