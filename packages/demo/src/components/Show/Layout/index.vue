<template>
  <ak-group title="基础用法">
    <ak-row class="exp-layout-row">
      <ak-col class="exp-layout-col">col-24</ak-col>
    </ak-row>
    <ak-row class="exp-layout-row">
      <ak-col class="exp-layout-col" :span="12">col-12</ak-col>
      <ak-col class="exp-layout-col" :span="12">col-12</ak-col>
    </ak-row>
    <ak-row class="exp-layout-row">
      <ak-col class="exp-layout-col" :span="8">col-8</ak-col>
      <ak-col class="exp-layout-col" :span="8">col-8</ak-col>
      <ak-col class="exp-layout-col" :span="8">col-8</ak-col>
    </ak-row>
    <ak-row class="exp-layout-row">
      <ak-col class="exp-layout-col" :span="6">col-6</ak-col>
      <ak-col class="exp-layout-col" :span="6">col-6</ak-col>
      <ak-col class="exp-layout-col" :span="6">col-6</ak-col>
      <ak-col class="exp-layout-col" :span="6">col-6</ak-col>
    </ak-row>
  </ak-group>
  <ak-group title="区块间隔">
    <ak-row class="exp-layout-row" :gutter="10">
      <ak-col class="exp-layout-col" :span="8">col-8</ak-col>
      <ak-col class="exp-layout-col" :span="8">col-8</ak-col>
      <ak-col class="exp-layout-col" :span="8">col-8</ak-col>
    </ak-row>
  </ak-group>
  <ak-group title="左右偏移">
    <ak-row class="exp-layout-row">
      <ak-col class="exp-layout-col" :span="8">col-8</ak-col>
      <ak-col class="exp-layout-col" :span="8" :offset="8"
        >col-8 offset-8</ak-col
      >
    </ak-row>
    <ak-row class="exp-layout-row">
      <ak-col class="exp-layout-col" :span="6" :offset="6"
        >col-6 offset-6</ak-col
      >
      <ak-col class="exp-layout-col" :span="6" :offset="6"
        >col-6 offset-6</ak-col
      >
    </ak-row>
    <ak-row class="exp-layout-row">
      <ak-col class="exp-layout-col" :span="12" :offset="6"
        >col-12 offset-6</ak-col
      >
    </ak-row>
  </ak-group>
  <ak-group title="栅格排序">
    <ak-row class="exp-layout-row">
      <ak-col class="exp-layout-col" :span="18" :push="6">col-18 push-6</ak-col>
      <ak-col class="exp-layout-col" :span="6" :pull="18">col-6 pull-18</ak-col>
    </ak-row>
  </ak-group>
  <ak-group title="水平对齐方式">
    <div class="exp-layout-title">justify: start</div>
    <ak-row class="exp-layout-row" justify="start">
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
    </ak-row>
    <div class="exp-layout-title">justify: center</div>
    <ak-row class="exp-layout-row" justify="center">
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
    </ak-row>
    <div class="exp-layout-title">justify: end</div>
    <ak-row class="exp-layout-row" justify="end">
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
    </ak-row>
    <div class="exp-layout-title">justify: space-around</div>
    <ak-row class="exp-layout-row" justify="space-around">
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
    </ak-row>
    <div class="exp-layout-title">justify: space-between</div>
    <ak-row class="exp-layout-row" justify="space-between">
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col" :span="4">col-4</ak-col>
    </ak-row>
  </ak-group>
  <ak-group title="垂直对齐方式">
    <div class="exp-layout-title">align: top</div>
    <ak-row class="exp-layout-row" justify="space-around" align="top">
      <ak-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</ak-col>
    </ak-row>
    <div class="exp-layout-title">align: middle</div>
    <ak-row class="exp-layout-row" justify="space-around" align="middle">
      <ak-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</ak-col>
    </ak-row>
    <div class="exp-layout-title">align: bottom</div>
    <ak-row class="exp-layout-row" justify="space-around" align="bottom">
      <ak-col class="exp-layout-col exp-layout-h-80" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-40" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-100" :span="4">col-4</ak-col>
      <ak-col class="exp-layout-col exp-layout-h-60" :span="4">col-4</ak-col>
    </ak-row>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpLayout'
})
</script>
