<template>
  <div class="log-wrapper">
    <div class="log-header p-grid p-ai-center vertical-container">
      Log
    </div>
    <div class="log p-col-12 " ref="log" id="log" v-html="highlight()"></div>
  </div>
</template>

<script lang="ts">
import fs from "fs";
import Vue from "vue";
import Component from "vue-class-component";
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
// import DockerProcess from "./module/DockerProcess";
@Component({
  components: {},
})
export default class LogView extends Vue {
  log: string = "";

  mounted() {
    this.readLog();
  }

  readLog() {
    // console.log("call read log")
  let filePath = path.join(
        !isDevelopment ? path.join(process.resourcesPath,"extraResources","log") : "log",
        "project.log"
      );
    console.log(filePath)
    this.log = fs.readFileSync(filePath, "utf8");
    this.highlight();
  }

  updated() {
      //@ts-ignore
    this.$refs.log.scrollTop = this.$refs.log.scrollHeight;
  }

  highlight() {
    var temp = this.log;
    temp = temp.replace(new RegExp("INFO", "gi"), (match) => {
      return '<span class="info">' + match + "</span>";
    });

    temp = temp.replace(new RegExp("WARN", "gi"), (match) => {
      return '<span class="warn">' + match + "</span>";
    });

    temp = temp.replace(new RegExp("ERROR", "gi"), (match) => {
      return '<span class="error">' + match + "</span>";
    });

    temp = temp.replace(
      new RegExp(
        "[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]",
        "gi"
      ),
      (match) => {
        return '<span class="timestamp">' + match + "</span>";
      }
    );
    return temp;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/style/_variables.scss";

.log-header {
  padding: 30px;
  align-items: center;
  background-color: $SubBgColor;
  color: white;
  font-size: 20px;
  font-weight: bold;
  height: 80px;
}
.log {
  background-color: rgb(56, 56, 56);
  color: aliceblue;
  font-size: 12px;
  white-space: break-spaces;
  padding: 1em;
  overflow: auto;
  height: calc(100vh - 112px);
}

.log::-webkit-scrollbar {
  width: 10px;
}

.log::-webkit-scrollbar-track {
  background-color: #414141;
}

.log::-webkit-scrollbar-thumb {
  background: #a3a3a3;
}

.info {
  font-weight: bold;
  color: rgb(103, 184, 255);
}

.warn {
  font-weight: bold;
  color: rgb(255, 190, 93);
}

.error {
  font-weight: bold;
  color: rgb(255, 97, 97);
}

.timestamp {
  font-size: 10px;
  font-weight: lighter;
  color: rgb(134, 134, 134);
}
</style>
