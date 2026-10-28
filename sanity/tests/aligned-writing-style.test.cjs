const {test} = require('node:test')
const assert = require('node:assert/strict')
const {readFileSync} = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const React = require('react')
const {renderToStaticMarkup} = require('react-dom/server')

// Load the TSX component with the project's existing TypeScript dependency.
const source = readFileSync(path.join(__dirname, '../components/AlignedWritingStyle.tsx'), 'utf8')
const {outputText} = ts.transpileModule(source, {
  compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX},
})
const compiled = {exports: {}}
new Function('require', 'module', 'exports', outputText)(require, compiled, compiled.exports)
const {createAlignedWritingStyle} = compiled.exports

for (const [style, tag] of [
  ['normal', 'p'],
  ['h2', 'h2'],
  ['h3', 'h3'],
]) {
  for (const alignment of ['center', 'right']) {
    test(`${style}-${alignment} renders dropdown labels without a block prop`, () => {
      const Component = createAlignedWritingStyle(style, alignment)
      const html = renderToStaticMarkup(React.createElement(Component, null, 'Style label'))
      assert.equal(html, `<${tag} style="text-align:${alignment}">Style label</${tag}>`)
    })

    test(`${style}-${alignment} preserves formatted editor children`, () => {
      const Component = createAlignedWritingStyle(style, alignment)
      const html = renderToStaticMarkup(
        React.createElement(
          Component,
          {block: {style: `${style}-${alignment}`}},
          React.createElement('strong', null, 'Writing'),
        ),
      )
      assert.equal(
        html,
        `<${tag} style="text-align:${alignment}"><strong>Writing</strong></${tag}>`,
      )
    })
  }
}
