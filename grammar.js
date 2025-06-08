/**
 * @file Belt, stack-oriented script language
 * @author lumiknit <aasr4r4@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const NUM_SIGN = token(/[-+]?/);

module.exports = grammar({
  name: "belt",

  extras: ($) => [$.line_comment, /[\x00-\x20]/],
  word: ($) => $._word,

  rules: {
    // Root rule
    source_file: ($) => repeat($._atom),

    // Comments

    line_comment: (_) => token(seq("#", /[^\n]*/)),

    // Word / Whitespaces / Predefined

    // Reserved: [\s\[\](){}`'"@#,;]
    // Op characters: [-~!@#$%^&*=+|\\:.<>/?]
    _word: (_) =>
      /[^-~!@#$%^&*=+|\\:.<>/?\s\[\](){}`'"@#,;0-9][^-~!@#$%^&*=+|\\:.<>/?\s\[\](){}`'"@#,;]*/,

    // Literals

    _decimal_num_literal: (_) => token(seq(NUM_SIGN, /[0-9]+(\.[_0-9]+)?([eE][-+]?[0-9]+)?/)),
    _bin_num_literal: (_) => token(seq(NUM_SIGN, /0b[_01]+/)),
    _oct_num_literal: (_) => token(seq(NUM_SIGN, /0o[_0-7]+/)),
    _hex_num_literal: (_) => token(seq(NUM_SIGN, /0x[_0-9a-fA-F]+/)),
    number: ($) =>
      choice($._decimal_num_literal, $._bin_num_literal, $._oct_num_literal, $._hex_num_literal),

    escape_sequence: (_) =>
      choice(
        seq("\\", /u[0-9a-fA-F]{4}/),
        seq("\\", /U[0-9a-fA-F]{8}/),
        seq("\\", /x[0-9a-fA-F]{2}/),
        /\\[^uUx]/,
      ),
    _str_dq: ($) =>
      seq('"', field("string_content", repeat(choice($.escape_sequence, /[^"]/))), '"'),
    _str_sq: ($) =>
      seq("'", field("string_content", repeat(choice($.escape_sequence, /[^']/))), "'"),
    _str_tripledq: ($) =>
      seq(
        '"""',
        field("string_content", repeat(choice($.escape_sequence, /[^"]/, /"{1,2}/))),
        '"""',
      ),
    _str_triplesq: ($) =>
      seq(
        "'''",
        field("string_content", repeat(choice($.escape_sequence, /[^']/, /'{1,2}/))),
        "'''",
      ),
    string: ($) => choice($._str_tripledq, $._str_triplesq, $._str_dq, $._str_sq),

    _literal: ($) => choice($.number, $.string),

    // Name-like identifiers

    // Identifiers until non-op characters
    ident: ($) => seq($._word, /[-~!@#$%^&*=+|\\:.<>/?]*/),
    operator: ($) => /[-~!@#$%^&*=+|\\:.<>/?]+/,

    binding: ($) => $.ident,
    pop_assign: ($) => seq($.binding, "="),
    assign: ($) => seq($.binding, ":="),
    marker: ($) => seq($.binding, ":"),

    package_name: ($) => $._word,
    package_item: ($) => seq($.package_name, ".", $.ident),

    _name_like: ($) =>
      choice($.package_item, $.assign, $.pop_assign, $.marker, $.ident, $.operator),

    // Separators
    operation: ($) => seq("(", repeat($._atom), ")"),
    array: ($) => seq("[", repeat($._atom), "]"),
    map: ($) => seq("{", repeat($._atom), "}"),
    comma: (_) => /[,;]/,

    // Type notation
    type_notation: ($) => seq("`", /[^`]*/, "`"),

    _atom: ($) =>
      choice($.operation, $.array, $.map, $.comma, $.type_notation, $._literal, $._name_like),
  },
});
