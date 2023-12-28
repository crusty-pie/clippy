import * as fs from "fs";
import { Annotation } from "../src/annotation";

describe("Annotation tests", () => {
    test("Annotation looks as expected", () => {
        const annotation = Annotation.fromString(
            fs.readFileSync("tests/data/clippy-data.json", "utf8"),
        );

        if (annotation._tag == "Some") {
            expect(annotation.value.toString()).toBe(
                "::error file=src/docker/image/config.rs,line=430,col=13::error: returning the result of a `let` binding from a block%0A   --> src/docker/image/config.rs:431:13%0A    |%0A430 |             let x = true;%0A    |             ------------- unnecessary `let` binding%0A431 |             x%0A    |             ^%0A    |%0A    = help: for further information visit https://rust-lang.github.io/rust-clippy/master/index.html#let_and_return%0A    = note: `-D clippy::let-and-return` implied by `-D warnings`%0A    = help: to override `-D warnings` add `#[allow(clippy::let_and_return)]`%0Ahelp: return the expression directly%0A    |%0A430 ~             %0A431 ~             true%0A    |%0A%0A",
            );
            return;
        }

        expect(false).toBe(true);
    });
});
