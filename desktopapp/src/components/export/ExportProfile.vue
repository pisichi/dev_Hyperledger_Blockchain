<template>
  <div>
    <div class="p-grid p-fluid">
      <div class="p-col-12">
        <small>Selected Channel </small>
        <br />
        <Dropdown
          v-model="selectedChannel"
          :options="channelList"
          optionLabel="name"
        />
      </div>
      <div class="p-col-12">
        <small>Organization identity to exports</small>
        <hr/>
        <div
          class="p-field-checkbox"
          v-for="(item, index) in orgList"
          :key="index"
        >
          <Checkbox v-model="item.checked" :binary="true" />
          <label for="city1">{{ item.name }}</label>
        </div>
      </div>
    </div>
    <div class="p-grid p-jc-end">
             <Button
        label="Cancle"
        icon="pi pi-times"
        @click="close()"
        class="p-button-outlined p-button-danger p-button-sm p-mx-3"
      />
    <Button
      label="Export"
      icon="pi pi-download"
      @click="generate()"
         class="p-button-outlined p-button-primary p-px-3 p-button-sm"
    />
     </div>
  </div>
</template>

<script lang="ts">
import { netWorkConfigPath } from "@/models/EnvProject";
import ExportAppProcess from "@/module/ExportAppProcess";
import NetworkConfig from "@/models/NetworkConfig";
import Vue from "vue";
import Component from "vue-class-component";

//import IdentityManger from "@/module/Minifabric/IdentityManger";
const ExportConnectionProfileProps = Vue.extend({
  props: {
    _display: Boolean,
  },
});
@Component({
  components: {},
})
export default class ExportConnectionProfile extends ExportConnectionProfileProps {
  selectedChannel = { name: "" };
  channelList = [];
  orgList: Array<object> = [];
    close() {
    this.$emit("closeExportCon");
  }
  created() {
    this.channelList = NetworkConfig.getValue(netWorkConfigPath.channelPath);
    this.selectedChannel = this.channelList[0];
    this.orgList = this.setOrgList();
  }
  generate() {
    ExportAppProcess.generateProcess(this.selectedChannel.name,this.orgList);
    this.close()
  }
  setOrgList() {
    let newArray: Array<object> = [];
    NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath).forEach(
      (res: any) => {
        newArray.push({ name: res, checked: true });
      }
    );
    return newArray;
  }

}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
</style>
