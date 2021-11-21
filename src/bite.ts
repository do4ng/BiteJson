import lintJson from "./lint";
import { History } from "./types/options";
import { LintOutputConfig } from "./types/output";
import "colors";

class BiteJSON {
  private defaultSource: string;
  private defaultSourceObj: Object;
  private history: History[];

  public source: object;
  public config: LintOutputConfig;

  constructor(source: string | object) {
    const src = lintJson(source.toString());

    this.defaultSourceObj = src.outputObject;
    this.history = [];

    this.source = src.outputObject;
    this.config = src.config;
  }

  getHistory(key: string = ""): History[] {
    let output: History[] = [];
    if (key === "") {
      output = this.history;
    } else {
      this.history.forEach((h) => {
        if (key === h.key) {
          output.push(h);
        }
      });
    }
    return output;
  }

  pushHistory(key: string = "", p: any, c: any): void {
    this.history.push({ key, previous: p, changed: c });
  }

  reset(key: string = ""): object {
    if (key === "") {
      this.source = this.defaultSourceObj;
    } else {
      this.source[key] = this.defaultSourceObj[key];
    }
    return this.source;
  }

  set(key: string = "", value: any): object {
    if (
      typeof this.source[key] !== typeof value &&
      typeof this.source[key] !== "undefined" &&
      this.config.strictMode
    ) {
      console.log(
        `${"warn".yellow} Different Type \n${
          `At '${key}', ${this.source[key]} (${typeof this.source[
            key
          ]}) > ${value} (${typeof value})`.gray
        }`
      );
    } else {
      this.pushHistory(key, this.source[key], value);
      this.source[key] = value;
    }

    return this.source;
  }

  get(key: string = ""): any {
    if (key === "") {
      return this.source;
    }
    return this.source[key];
  }

  remove(key: string = ""): object {
    this.pushHistory(key, this.source[key], null);
    if (key === "") {
      this.source = null;
    } else {
      this.source[key] = null;
    }
    return this.source;
  }
}

export default BiteJSON;
