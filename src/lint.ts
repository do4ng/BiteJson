import { LintOutput, LintOutputConfig } from "./types/output";
/**
 * Lint JSON source
 * @param source JSON source (string)
 */
export default function lintJson(
  source: string,
  allowComment: boolean = true
): LintOutput {
  let multiComSec: boolean = false;
  let FirstSection: boolean = false;
  let out: string = "";
  let section: string[] = source.split(/\r?\n/);
  let config: LintOutputConfig = { allowComment: true, strictMode: false };
  section.forEach((e, lineIndex) => {
    // Single Line
    let strSec: boolean = false;
    let comSec: boolean = false;
    let comScore: number = 0;

    // Check Config

    if (e.trim().startsWith("//")) {
      let comment: string = e.replace("//", "").trim();
      if (comment.startsWith("@bite/")) {
        comment = comment.replace("@bite/", "");
        if (comment.startsWith("allowComment")) {
          comment = comment.replace("allowComment", "").replace("=", "").trim();
          if (comment === "true") {
            config.allowComment = true;
          } else if (comment === "false") {
            config.allowComment = false;
          }
        } else if (comment.startsWith("strictMode")) {
          comment = comment.replace("strictMode", "").replace("=", "").trim();
          if (comment === "true") {
            config.strictMode = true;
          } else if (comment === "false") {
            config.strictMode = false;
          }
        }
      }
    } else {
      for (let index = 0; index < e.length; index++) {
        const element = e[index];
        const nextElement = e[index + 1];

        if ((comSec || multiComSec) && !allowComment) {
          console.log(
            `${"error".red} Comment Disabled\n${
              `${e.substr(0)}`.gray
            } (${lineIndex}:${index + 1})`
          );
          process.exit(1);
        }

        if (element === "/" && !strSec) {
          comScore = comScore + 1;
          if (comScore === 2) {
            comSec = true;
          } else if (nextElement === "*") {
            multiComSec = true;
          }
        } else if (element === "*" && nextElement === "/" && !strSec) {
          multiComSec = false;
        } else if (element === '"' && e[index - 1] !== "\\") {
          if (strSec) {
            strSec = false;
          } else {
            strSec = true;
          }
          out = out + element;
        } else if (element !== " " && !comSec && !multiComSec) {
          out = out + element;
        } else if (element === " " && strSec) {
          out = out + element;
        }
      }
    }
  });
  return {
    outputString: out,
    outputObject: JSON.parse(out),
    config: config,
  };
}
