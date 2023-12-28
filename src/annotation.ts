/**
 * Temporary implementation for GitHub Annotations missing feature.
 *
 * There is a working, but undocumented implementation,
 * which is abused by this module.
 *
 * The Whole implementation could break unexpectedly when
 * this issue https://github.com/actions/toolkit/issues/186 will be implemented.
 *
 * Until then, this is our best option.
 */

import * as core from "@actions/core";
import { Line } from "./types";
import * as escapeUtils from "./utils/escape";
``;
import { IAnnotation } from "./types";
import { Option, some, none } from "fp-ts/Option";
import { Message } from "./message";

/**
 * This `Annotation` class matches the GitHub Annotations API annotation object
 * https://developer.github.com/v3/checks/runs/#annotations-object
 *
 * At this point, most of the fields are silently ignored,
 * but callers should fill as many of them as possible,
 * since switch to the correct GitHub implementation will use them later.
 *
 * @see [IAnnotation](./types.ts)
 */
export class Annotation {
    private readonly annotation: IAnnotation;
    private static readonly SEPARATOR: string = "::";

    constructor(annotation: IAnnotation) {
        this.annotation = annotation;
    }

    public toString(): string {
        const entries = [
            ["file", this.annotation.path],
            ["line", this.annotation.start_line],
            ["col", this.annotation.start_column],
        ];

        let cmdStr = `${Annotation.SEPARATOR}${this.annotation.annotation_level} `;

        for (let i = 0; i < entries.length; i++) {
            if (i > 0) {
                cmdStr += ",";
            }

            cmdStr += `${entries[i][0]}=${escapeUtils.escapeProperty(
                entries[i][1],
            )}`;
        }

        cmdStr += `${Annotation.SEPARATOR}${escapeUtils.escapeData(
            this.annotation.message,
        )}`;
        return cmdStr;
    }

    public static fromString(line: string): Option<Annotation> {
        let contents: Line;

        try {
            contents = JSON.parse(line) as Line;
        } catch (error) {
            core.debug(`${line} is not a JSON, ignoring it`);
            return none;
        }

        if (contents.reason != "compiler-message") {
            core.debug(
                `Unexpected reason field, ignoring it: ${contents.reason}`,
            );
            return none;
        }

        if (contents.message.code === null) {
            core.debug("Message code is missing, ignoring it");
            return none;
        }

        return some(new Message(contents.message).annotate());
    }
}
