<template>
  <div>
    <small class="p-error" v-if="invalidName">{{ errorName }}</small>
    <DataTable :value="object" :autoLayout="true">
      <Column header="Name">
        <template #body="slotProps">
          <InputText v-model="slotProps.data.name" @input="check(slotProps.data.name)" />
        </template>
      </Column>
      <Column header="Type">
        <template #body="slotProps">
          <span v-if="slotProps.data.isOrderer">Orderer</span>
          <span v-else>Peer</span>
        </template>
      </Column>

      <Column header="CA" headerStyle="width: 6rem">
        <template #body="slotProps">
          <InputSwitch v-model="slotProps.data.useCA" v-if="!slotProps.data.isOrderer" @click="caWarn" />
        </template>
      </Column>
      <Column header="PeerNode" headerStyle="width: 4rem">
        <template #body="slotProps">
          <p v-if="!slotProps.data.isOrderer">
            {{ slotProps.data.peerList.length }}
          </p>
        </template>
      </Column>
      <Column headerStyle="width: 10rem">
        <template #body="slotProps">
          <span v-if="!slotProps.data.isOrderer">
            <Button
              icon="pi pi-plus"
              class="p-button p-button-sm p-button-success p-mr-2"
              @click="addPeer(slotProps.data)"
            />
            <Button
              icon="pi pi-minus"
              class="p-button p-button-sm p-button-warning"
              @click="removePeer(slotProps.data)"
            />
          </span>
        </template>
      </Column>
      <Column headerStyle="width: 3rem">
        <template #body="slotProps">
          <Button
            v-if="slotProps.data.name != 'example.com'"
            icon="pi pi-trash"
            class="p-button-outlined p-button-sm p-button-danger p-mr-auto"
            @click="removeOrg(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
/* eslint-disable no-unused-vars */
import OrgData from "../../models/OrgData";
@Component({
  props: {
    object: Array,
  },
})
export default class OrgEditButton extends Vue {
  invalidName: boolean = false;
  errorName: string = "";
  caWarn() {
    this.$emit("ca-warn");
  }
  removeOrg(target: OrgData) {
    this.$emit("remove-org", target);
  }
  addPeer(target: OrgData) {
    target.addPeer();
  }
  removePeer(target: OrgData) {
    target.removePeer();
  }
  check(data: string) {
    this.invalidName = false;
    var falsy;
    if (!data) {
      this.errorName = "organization name and domain cannot be empty.";
      this.invalidName = true;
      falsy = true;
    }
    //eslint-disable-next-line
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(data)) {
      this.errorName = "organization name and domain cannot contain special character.";
      this.invalidName = true;
      falsy = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
</style>
