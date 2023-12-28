/**
 * `RawInput` holds the basic allowed options the user can input to the action.
 */
export interface RawInput {
    args: string[];
    cargo: string;
}

export type AnnotationLevel = "notice" | "warning" | "error";

/**
 * `IAnnotation` holds the annotation data parsed from clippy.
 */
export interface IAnnotation {
    path: string;
    start_line: number;
    end_line: number;
    start_column?: number;
    end_column?: number;
    annotation_level: AnnotationLevel;
    message: string;
    title?: string;
    raw_details?: string;
}

/**
 * `cargo clippy` JSON-parsed output line.
 */
export interface Line {
    reason: string;
    message: ClippyMessage;
}

/**
 * Models the `message` field from clippy's output
 */
export interface ClippyMessage {
    code: string;
    level: string;
    message: string;
    rendered: string;
    spans: DiagnosticSpan[];
}

/**
 * `DiagnosticSpan` holds span information from an annotation.
 */
export interface DiagnosticSpan {
    file_name: string;
    is_primary: boolean;
    line_start: number;
    line_end: number;
    column_start: number;
    column_end: number;
}
