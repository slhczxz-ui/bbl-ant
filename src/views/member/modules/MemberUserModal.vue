<template>
  <a-modal
    title="操作"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['id']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号">
        <a-input placeholder="手机号" v-decorator="['mobile']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="密码">
        <a-input placeholder="密码" v-decorator="['password', {rules: [{required: true, message: '请输入密码'}]}]"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="注册 IP">
        <a-input placeholder="注册 IP" v-decorator="['registerIp', {rules: [{required: true, message: '请输入注册 IP'}]}]"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="注册终端">
        <a-input placeholder="注册终端" v-decorator="['registerTerminal']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最后登录IP">
        <a-input placeholder="最后登录IP" v-decorator="['loginIp']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户昵称">
        <a-input placeholder="用户昵称" v-decorator="['nickname', {rules: [{required: true, message: '请输入用户昵称'}]}]"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="真实名字">
        <a-input placeholder="真实名字" v-decorator="['name']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在地">
        <a-input placeholder="所在地" v-decorator="['areaId']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="会员备注">
        <a-input placeholder="会员备注" v-decorator="['mark']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="积分">
        <a-input placeholder="积分" v-decorator="['point', {rules: [{required: true, message: '请输入积分'}]}]"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户标签编号列表，以逗号分隔">
        <a-input placeholder="用户标签编号列表，以逗号分隔" v-decorator="['tagIds']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="等级编号">
        <a-input placeholder="等级编号" v-decorator="['levelId']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经验">
        <a-input placeholder="经验" v-decorator="['experience', {rules: [{required: true, message: '请输入经验'}]}]"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户分组编号">
        <a-input placeholder="用户分组编号" v-decorator="['groupId']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="创建者">
        <a-input placeholder="创建者" v-decorator="['creator']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="更新者">
        <a-input placeholder="更新者" v-decorator="['updater']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="租户编号">
        <a-input placeholder="租户编号" v-decorator="['tenantId', {rules: [{required: true, message: '请输入租户编号'}]}]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { saveMemberUser } from '@/api/member/memberUser'
import pick from 'lodash.pick'
export default {
  name: 'MemberUserModal',
  props: {
  },
  components: {
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      mdl: {},
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    add () {
      this.form.resetFields()
      this.edit({ id: 0 })
    },
    edit (record) {
      this.mdl = Object.assign(record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'mobile', 'password', 'status', 'registerIp', 'registerTerminal', 'loginIp', 'loginDate', 'nickname', 'avatar', 'name', 'sex', 'areaId', 'birthday', 'mark', 'point', 'tagIds', 'levelId', 'experience', 'groupId', 'creator', 'createTime', 'updater', 'updateTime', 'deleted', 'tenantId'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveMemberUser(values).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
