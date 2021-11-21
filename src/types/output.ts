export interface LintOutput {
  config?: LintOutputConfig;
  outputString: string;
  outputObject: object;
}

export interface LintOutputConfig {
  allowComment: boolean;
  strictMode: boolean;
}
