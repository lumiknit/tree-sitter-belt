; highlights.scm for belt language

; Names
(assign (binding) @variable)
(assign (binding) @function (operation))
(line_comment) @comment
(operator) @operator
(package_name) @module

; Marker (symbol)
(marker) @string.special.symbol
(string (str_marker)) @string.special.symbol

; Literals
(number) @number
(string) @string
(escape_sequence) @string.escape

; Import
(import_name (ident) @module)

; Type notation
(type_notation) @type

; Other symbols
"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket
"@" @keyword.import
(comma) @punctuation.delimiter
"=" @operator
":=" @operator

; Keywords
[
  "null"
  "true"
  "false"
] @constant.builtin

[
  "print"
  "println"
  "scanln"
  "if"
  "range"
  "each"
  "map"
  "filter"
  "fold"
  "dup"
  "dup2"
  "pop"
  "swap"
  "rot"
  "and"
  "or"
  "not"
] @function.builtin
