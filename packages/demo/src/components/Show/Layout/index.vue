<template>
  <ta-group title="基础用法">
    <ta-row class="exp-layout-row">
      <ta-col class="exp-layout-col">col-24</ta-col>
    </ta-row>
    <ta-row class="exp-layout-row">
      <ta-col class="exp-layout-col" :span="12">col-12</ta-col>
      <ta-col class="exp-layout-col" :span="12">col-12</ta-col>
    </ta-row>
    <ta-row class="exp-layout-row">
      <ta-col class="exp-layout-col" :span="8">col-8</ta-col>
      <ta-col class="exp-layout-col" :span="8">col-8</ta-col>
      <ta-col class="exp-layout-col" :span="8">col-8</ta-col>
    </ta-row>
    <ta-row class="exp-layout-row">
      <ta-col class="exp-layout-col" :span="6">col-6</ta-col>
      <ta-col class="exp-layout-col" :span="6">col-6</ta-col>
      <ta-col class="exp-layout-col" :span="6">col-6</ta-col>
      <ta-col class="exp-layout-col" :span="6">col-6</ta-col>
    </ta-row>
  </ta-group>
  <ta-group title="区块间隔">
    <ta-row class="exp-layout-row" :gutter="10">
      <ta-col class="exp-layout-col" :span="8">col-8</ta-col>
      <ta-col class="exp-layout-col" :span="8">col-8</ta-col>
      <ta-col class="exp-layout-col" :span="8">col-8</ta-col>
    </ta-row>
  </ta-group>
  <ta-group title="左右偏移">
    <ta-row class="exp-layout-row">
      <ta-col class="exp-layout-col" :span="8">col-8</ta-col>
      <ta-col class="exp-layout-col" :span="8" :offset="8">col-8 offset-8</ta-col>
    </ta-row>
    <ta-row class="exp-layout-row">
      <ta-col class="exp-layout-col" :span="6" :offset="6">col-6 offset-6</ta-col>
      <ta-col class="exp-layout-col" :span="6" :offset="6">col-6 offset-6</ta-col>
    </ta-row>
    <ta-row class="exp-layout-row">
      <ta-col class="exp-layout-col" :span="12" :offset="6">col-12 offset-6</ta-col>
    </ta-row>
  </ta-group>
  <ta-group title="栅格排序">
    <ta-row class="exp-layout-row">
      <ta-col class="exp-layout-col" :span="18" :push="6">col-18 push-6</ta-col>
      <ta-col class="exp-layout-col" :span="6" :pull="18">col-6 pull-18</ta-col>
    </ta-row>
  </ta-group>
  <ta-group title="水平对齐方式">
    <div class="exp-layout-title">justify: start</div>
    <ta-row class="exp-layout-row" justify="start">
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
    </ta-row>
    <div class="exp-layout-title">justify: center</div>
    <ta-row class="exp-layout-row" justify="center">
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
    </ta-row>
    <div class="exp-layout-title">justify: end</div>
    <ta-row class="exp-layout-row" justify="end">
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
    </ta-row>
    <div class="exp-layout-title">justify: space-around</div>
    <ta-row class="exp-layout-row" justify="space-around">
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
    </ta-row>
    <div class="exp-layout-title">justify: space-between</div>
    <ta-row class="exp-layout-row" justify="space-between">
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col" :span="4">col-4</ta-col>
    </ta-row>
  </ta-group>
  <ta-group title="垂直对齐方式">
    <div class="exp-layout-title">align: top</div>
    <ta-row class="exp-layout-row" justify="space-around" align="top">
      <ta-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</ta-col>
    </ta-row>
    <div class="exp-layout-title">align: middle</div>
    <ta-row class="exp-layout-row" justify="space-around" align="middle">
      <ta-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</ta-col>
    </ta-row>
    <div class="exp-layout-title">align: bottom</div>
    <ta-row class="exp-layout-row" justify="space-around" align="bottom">
      <ta-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</ta-col>
      <ta-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</ta-col>
    </ta-row>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpLayout'
})
</script>
