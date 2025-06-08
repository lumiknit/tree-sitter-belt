; highlights.scm for belt language

; Names
(binding) @function
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
