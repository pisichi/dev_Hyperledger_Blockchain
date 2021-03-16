const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
import logger from "../module/Logger";
import { DirBuilder } from "../module/DirBuilder";

export class ProjectConfig {
  file: any;

  constructor() {
    try {
      // check dev mode function
      // used this style for base to write function who work with files
      if (!isDevelopment) {
        // logger.log("info",(path.dirname(__dirname)))
      }
      let filePath = path.join(
        !isDevelopment ? path.join(path.dirname(__dirname), "bin") : "tests",
        "projects.json"
      );
      this.file = editJsonFile(filePath);
    } catch (e) {
      logger.log("error", "projects.json path");
    }
  }

  addProject(project: any) {
    project.id = this.file.data.length++;
    project.date_modify = +new Date();
    this.file.data[project.id] = project;
    this.file.save();
    logger.log("info", "project-config: add new element");
    return project.id;
  }

  deleteProject(id: number) {
    let dirBuilder = new DirBuilder();
    let target = this.file.data.find((element: any) => element.id == id);
    let dir = target.directory;

    console.log(dir);

    // dirBuilder.deleteDir(dir);

    logger.log(
      "warn",
      "project-config: delete project id: " + target.id + "at: " + dir
    );

    if (target.id > -1) {
      this.file.data.splice(
        this.file.data.findIndex((element: any) => element.id == id),
        1
      );
    }
    this.file.save();
  }

  getPath(id: number) {
    return this.file.data[id].directory;
  }

 getPathResolve(id: number) {
 //  console.log( path.resolve(this.file.data[id].directory))
    return  path.resolve(this.file.data[id].directory)
  }

  updateDate(id: number) {
    this.file.data[id].set("date_modify", +new Date());
    logger.log("info", "project-config: update date_modify");
  }

  updateProjectConfig(id: number, key: string, value: any) {
    this.file.data[id].set(key, value);
    this.file.save();
    logger.log("info", "project-config: update key-value");
  }

  getValue(key: string) { }
}
export default new ProjectConfig();
