import * as io from "@actions/io";
import * as core from "@actions/core";
import * as exec from "@actions/exec";
import { ExecOptions } from "@actions/exec";

export class Cargo {
    private readonly path: string;

    private constructor(path: string) {
        this.path = path;
    }

    public static async get(): Promise<Cargo> {
        try {
            const path = await io.which("cargo", true);
            return new Cargo(path);
        } catch (error) {
            const msg = `
            cargo is not installed by default for some virtual environments, \
            see https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions.\n
            To install it, use this action: https://github.com/crusty-pie/toolchain
            `;
            core.error(msg);

            throw error;
        }
    }

    public async call(args: string[], options?: ExecOptions): Promise<number> {
        return exec.exec(this.path, args, options);
    }
}
