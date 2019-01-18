#!/usr/bin/env node
"use strict"
const program = require("commander")

program.version("0.0.1 ", "-v, --version")

program.parse(process.argv)

// print help if no command given
if (!process.argv.slice(2).length) program.outputHelp()
