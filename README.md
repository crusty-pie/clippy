# GitHub Action - `rust-clippy`

![GitHub](https://img.shields.io/github/license/crusty-pie/clippy?label=License&color=blue&logo=gitbook)
![Continuous integration](https://github.com/crusty-pie/clippy/workflows/Unit%20tests/badge.svg)
![CodeQL](https://github.com/crusty-pie/clippy/workflows/CodeQL/badge.svg)
![Dependabot enabled](https://img.shields.io/badge/Dependabot-Enabled-brightgreen?logo=dependabot)
![GitHub contributors](https://img.shields.io/github/contributors/crusty-pie/clippy?logo=github&label=Contributors)
[![Codecov](https://img.shields.io/codecov/c/github/crusty-pie/clippy?logo=codecov&label=Coverage)](https://app.codecov.io/gh/crusty-pie/clippy)
![GitHub release (with filter)](https://img.shields.io/github/v/release/crusty-pie/clippy?logo=github&label=Release&color=brightgreen)
![GitHub issues](https://img.shields.io/github/issues-raw/crusty-pie/clippy?label=Open%20Issues&logo=github&color=blue)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/crusty-pie/clippy?label=Closed%20Issues&logo=github&color=blue)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/crusty-pie/clippy/main?label=Last%20Commit&logo=github&color=blue)
[![Snyk Security](https://img.shields.io/badge/Snyk%20Security-monitored-8731E8?logo=snyk)](https://snyk.io/test/github/crusty-pie/clippy)
[![Depfu](https://badges.depfu.com/badges/8e038d781d5d5ea4c2be016401319803/status.svg)](https://depfu.com)
[![Depfu](https://img.shields.io/depfu/dependencies/github/crusty-pie%2Fclippy?logo=depfu)](https://depfu.com/repos/github/crusty-pie/clippy)
[![Depfu](https://badges.depfu.com/badges/07d8712d1903c3495e6cfeacd170c437/count.svg)](https://depfu.com/github/crusty-pie/clippy?project_id=39503)
[![Static Badge](https://img.shields.io/badge/Code%20Climate-enabled-brightgreen?logo=codeclimate)](https://codeclimate.com/)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/crusty-pie/clippy?label=Maintainability&logo=codeclimate)](https://codeclimate.com/github/crusty-pie/clippy)
[![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/crusty-pie/clippy?label=Technical%20Debt&logo=codeclimate)](https://codeclimate.com/github/crusty-pie/clippy/trends/technical_debt)
[![Code Climate issues](https://img.shields.io/codeclimate/issues/crusty-pie/clippy?label=Issues&logo=codeclimate)](https://codeclimate.com/github/crusty-pie/clippy/issues)
[![Public workflows that use this action](https://img.shields.io/endpoint?label=Used%20By&url=https%3A%2F%2Fused-by.vercel.app%2Fapi%2Fgithub-actions%2Fused-by%3Faction%3Dplacintaalexandru%2Fclippy%26badge%3Dtrue)](https://sourcegraph.com/search?q=context:global+crusty-pie/clippy+file:.github/workflows&patternType=literal)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-rust-clippy-b7410e?logo=github)](https://github.com/marketplace/actions/rust-clippy)

Clippy lints in your commits and Pull Requests

**Table of Contents**

- [GitHub Action - `rust-clippy`](#github-action---rust-clippy)
  - [Motivation](#motivation)
  - [Example workflow](#example-workflow)
    - [With stable clippy](#with-stable-clippy)
  - [Inputs](#inputs)
  - [Contribute and support](#contribute-and-support)

## Motivation

This is a **next gen** version of [actions-rs/clippy-check](https://github.com/actions-rs/clippy-check) and it's in an **unstable** state right now, as it uses unstable/undocumented GitHub Actions features and potentially can break at any time.

Compared to [actions-rs/clippy-check](https://github.com/actions-rs/clippy-check)
it has few advantages:

 1. `GITHUB_TOKEN` secret is not required anymore, using this Action is much safer in terms of security
 2. It works correctly for Pull Requests created from forked repositories

## Example workflow

This example is using the [`toolchain`](https://github.com/crusty-pie/toolchain)
action to install the most recent `nightly` clippy version.

```yaml
on: [push, pull_request]
name: Clippy
jobs:
  clippy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: crusty-pie/toolchain@v1
        with:
          toolchain: nightly
          components: clippy
          override: true
      - uses: crusty-pie/rust-clippy@v1
        with:
          args: --all-features --all-targets
```

### With stable clippy

```yaml
on: [push, pull_request]
name: Clippy
jobs:
  clippy_check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: crusty-pie/toolchain@v1
        with:
          toolchain: stable
          components: clippy
      - uses: crusty-pie/rust-clippy@v1
        with:
          args: --all-features --all-targets
```

## Inputs

| Name         | Required | Description                              | Type   | Default |
|--------------|:--------:|------------------------------------------|--------|---------|
| `args`       |  false   | Arguments for the `cargo clippy` command | string | ''      |

## Contribute and support

Any contributions are welcomed!

If you want to report a bug or have a feature request,
check the [Contributing guide](https://github.com/crusty-pie/clippy/blob/main/CONTRIBUTING.md).
