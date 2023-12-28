import { AnnotationLevel, ClippyMessage, DiagnosticSpan } from "./types";
import { Annotation } from "./annotation";

/**
 * Holds the message output from clippy and abstracts how tp create
 * an [Annotation](./annotation.ts) object from it.
 *
 * @see [ClippyMessage](./types.ts)
 */
export class Message {
    private readonly clippyMessage: ClippyMessage;

    constructor(message: ClippyMessage) {
        this.clippyMessage = message;
    }

    /**
     * Search for the top one span in the message.

     * We will need that to point annotation to that line.
     *
     * @param{DiagnosticSpan[]} spans - spans of the message
     * @returns{DiagnosticSpan} - the span having lowest starting row
     */
    private findFirstSpan(): DiagnosticSpan {
        // TODO: Should it just use `is_primary = true`?
        return this.clippyMessage.spans.reduce(function (a, b) {
            return a.line_start < b.line_start ? a : b;
        });
    }

    /**
     * Maps clippy's level to GitHub's levels.
     *
     * If the annotation level is not recognized by GitHub,
     * the message will not appear in web UI.
     *
     * @returns{AnnotationLevel} - level understood by GitHub
     */
    private level(): AnnotationLevel {
        let level: AnnotationLevel;

        switch (this.clippyMessage.level) {
            case "help":
            case "note":
            case "warning":
                level = "warning";
                break;
            case "error":
            case "error: internal compiler error":
                level = "error";
                break;
            default:
                // Unreachable, unless rustc introduces another severity level
                level = "error";
                break;
        }

        return level;
    }

    public annotate(): Annotation {
        const span = this.findFirstSpan();

        return new Annotation({
            title: this.clippyMessage.message,
            path: span.file_name,
            annotation_level: this.level(),
            message: this.clippyMessage.rendered,
            start_line: span.line_start,
            end_line: span.line_end,
            start_column: span.column_start,
            end_column: span.column_end,
        });
    }
}
