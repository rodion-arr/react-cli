# tools-react-cli

[![Node.js CI](https://github.com/rodion-arr/react-cli/actions/workflows/ci.yaml/badge.svg)](https://github.com/rodion-arr/react-cli/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/rodion-arr/react-cli/branch/main/graph/badge.svg)](https://codecov.io/gh/rodion-arr/react-cli)
<span class="badge-npmversion"><a href="https://npmjs.org/package/tools-react-cli" title="View this project on NPM"><img src="https://img.shields.io/npm/v/tools-react-cli.svg" alt="NPM version" /></a></span>

React CLI is a tool that automates frequent tasks during developing of React apps

## Installation

### As global package

```bash
npm i -g tools-react-cli
```

`rc` global command will be available after installation:

```bash
rc <command> [options]
```

### As `npx` script

```bash
npx tools-react-cli <command> [options]
```

## Usage

### List of commands

```
rc <command> [options]

Commands:
  rc generate  Generates files based on templates                                       [aliases: g]

Options:
  --help     Show help                                                                     [boolean]
  --version  Show version number                                                           [boolean]
```

### Generate command

```
rc generate

Generates files based on templates

Commands:
  rc g component  Generates component                                                   [aliases: c]
```

### Generate component

```
rc g component

Generates component

Options:
      --help        Show help                                                              [boolean]
      --version     Show version number                                                    [boolean]
  -n, --name        Component name                                               [string] [required]
  -p, --path        Generation target path. Default - cwd
                     [string] [required]
  -s, --styles      Style file format to generate. Use false to not generate styles file. Default -
                    scss     [string] [required] [choices: "css", "scss", "false"] [default: "scss"]
  -t, --typescript  Pass true to generate typescript files      [boolean] [required] [default: true]
  -c, --connected   Pass true to generate redux-connected component
                                                               [boolean] [required] [default: false]
```

#### Generate component examples

- Generate simple component Typescript/SCSS/
```
rc g c -n ComponentName -s scss -t
```

- Generate simple component Typescript(by default)/no styles/
```
rc g c -n ComponentName -s false
```

- Generate component Typescript/SCSS/[Redux-connected](https://react-redux.js.org/using-react-redux/connect-mapstate)
```
rc g c -n ComponentName -s scss -t -c
```


