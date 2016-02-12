#!/usr/bin/env node

require('babel-register')

var path = require('path')
var program = require('commander')
var render = require('..')

var version = '3.0.0'

program
  .version(version)
  .option('[component]', 'Root React component')
  .option('-p, --props [props]', 'Props')
  .option('--no-doctype', 'Remove <!DOCTYPE html> from beginning of string')
  .parse(process.argv)

if (program.args.length) {
  var html
  var props = {}
  var dir = process.cwd()
  var file = path.join(dir, program.args[0])
  var Component = require(file)

  if (!Component) {
    console.error('No component found at', file)
    return false
  }

  if (Component.default) {
    Component = Component.default
  }

  if (program.props) {
    props = require(path.join(dir, program.props))
  }

  html = render(Component, props)

  if (program.doctype) {
    html = '<!DOCTYPE html>' + html
  }

  process.stdout.write(html)
}
