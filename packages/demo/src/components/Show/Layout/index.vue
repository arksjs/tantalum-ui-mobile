<template>
  <fx-group title="基础用法">
    <fx-row class="exp-layout-row">
      <fx-col class="exp-layout-col">col-24</fx-col>
    </fx-row>
    <fx-row class="exp-layout-row">
      <fx-col class="exp-layout-col" :span="12">col-12</fx-col>
      <fx-col class="exp-layout-col" :span="12">col-12</fx-col>
    </fx-row>
    <fx-row class="exp-layout-row">
      <fx-col class="exp-layout-col" :span="8">col-8</fx-col>
      <fx-col class="exp-layout-col" :span="8">col-8</fx-col>
      <fx-col class="exp-layout-col" :span="8">col-8</fx-col>
    </fx-row>
    <fx-row class="exp-layout-row">
      <fx-col class="exp-layout-col" :span="6">col-6</fx-col>
      <fx-col class="exp-layout-col" :span="6">col-6</fx-col>
      <fx-col class="exp-layout-col" :span="6">col-6</fx-col>
      <fx-col class="exp-layout-col" :span="6">col-6</fx-col>
    </fx-row>
  </fx-group>
  <fx-group title="区块间隔">
    <fx-row class="exp-layout-row" :gutter="10">
      <fx-col class="exp-layout-col" :span="8">col-8</fx-col>
      <fx-col class="exp-layout-col" :span="8">col-8</fx-col>
      <fx-col class="exp-layout-col" :span="8">col-8</fx-col>
    </fx-row>
  </fx-group>
  <fx-group title="左右偏移">
    <fx-row class="exp-layout-row">
      <fx-col class="exp-layout-col" :span="8">col-8</fx-col>
      <fx-col class="exp-layout-col" :span="8" :offset="8"
        >col-8 offset-8</fx-col
      >
    </fx-row>
    <fx-row class="exp-layout-row">
      <fx-col class="exp-layout-col" :span="6" :offset="6"
        >col-6 offset-6</fx-col
      >
      <fx-col class="exp-layout-col" :span="6" :offset="6"
        >col-6 offset-6</fx-col
      >
    </fx-row>
    <fx-row class="exp-layout-row">
      <fx-col class="exp-layout-col" :span="12" :offset="6"
        >col-12 offset-6</fx-col
      >
    </fx-row>
  </fx-group>
  <fx-group title="栅格排序">
    <fx-row class="exp-layout-row">
      <fx-col class="exp-layout-col" :span="18" :push="6">col-18 push-6</fx-col>
      <fx-col class="exp-layout-col" :span="6" :pull="18">col-6 pull-18</fx-col>
    </fx-row>
  </fx-group>
  <fx-group title="水平对齐方式">
    <div class="exp-layout-title">justify: start</div>
    <fx-row class="exp-layout-row" justify="start">
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
    </fx-row>
    <div class="exp-layout-title">justify: center</div>
    <fx-row class="exp-layout-row" justify="center">
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
    </fx-row>
    <div class="exp-layout-title">justify: end</div>
    <fx-row class="exp-layout-row" justify="end">
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
    </fx-row>
    <div class="exp-layout-title">justify: space-around</div>
    <fx-row class="exp-layout-row" justify="space-around">
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
    </fx-row>
    <div class="exp-layout-title">justify: space-between</div>
    <fx-row class="exp-layout-row" justify="space-between">
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col" :span="4">col-4</fx-col>
    </fx-row>
  </fx-group>
  <fx-group title="垂直对齐方式">
    <div class="exp-layout-title">align: top</div>
    <fx-row class="exp-layout-row" justify="space-around" align="top">
      <fx-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</fx-col>
    </fx-row>
    <div class="exp-layout-title">align: middle</div>
    <fx-row class="exp-layout-row" justify="space-around" align="middle">
      <fx-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</fx-col>
    </fx-row>
    <div class="exp-layout-title">align: bottom</div>
    <fx-row class="exp-layout-row" justify="space-around" align="bottom">
      <fx-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</fx-col>
      <fx-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</fx-col>
    </fx-row>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpLayout'
})
</script>
