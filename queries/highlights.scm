; highlights.scm for belt language

; Literals
(number) @number
(string) @string
(escape_sequence) @string.special.symbol

; Marker (symbol)
(marker) @constant.builtin

; Names
(binding) @function
(line_comment) @comment
(operator) @operator
(package_name) @module

; Type notation
(type_notation) @type

; Other symbols
"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket
(comma) @punctuation.delimiter
