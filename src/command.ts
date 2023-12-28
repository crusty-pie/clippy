import { Command, Option } from "commander";
import * as inputUtils from "./utils/input";
import { RawInput } from "./types";
import { Cargo } from "./cargo";
import * as core from "@actions/core";
import { Annotation } from "./annotation";
import * as os from "os";

export const clippyCommand = (): Command => {
    return new Command()
        .addOption(
            new Option("--args [args...]", "Arguments for clippy")
                .argParser(inputUtils.collect)
                .default(process.env["INPUT_ARGS"]?.split(" ") || []),
        )
        .action(async (options: RawInput) => {
            // `--message-format=json` should just right after the `cargo clippy`
            // because usually people are adding the `-- -D warnings` at the end
            // of arguments, and it will mess up the output.
            const args = ["clippy", "--message-format=json"].concat(
                options.args,
            );
            let clippyExitCode = 0;

            const cargo = await Cargo.get();
            const annotations: Annotation[] = [];

            core.startGroup("Executing cargo clippy (JSON output)");
            clippyExitCode = await cargo.call(args, {
                ignoreReturnCode: true,
                failOnStdErr: false,
                listeners: {
                    stdline: (line: string): void => {
                        const annotation = Annotation.fromString(line);

                        if (annotation._tag == "Some") {
                            annotations.push(annotation.value);
                        }
                    },
                },
            });
            core.endGroup();

            for (const annotation of annotations) {
                process.stdout.write(`${annotation.toString()}${os.EOL}`);
            }

            if (clippyExitCode != 0) {
                throw new Error(`Clippy exited with ${clippyExitCode} code`);
            }
        });
};
