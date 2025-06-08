# Tree Sitter Grammar for the Belt Programming Language

Belt is a stack-oriented script language.

https://github.com/lumiknit/belt

## Installation for Editors

### Neovim

See [Advanced setup](https://github.com/nvim-treesitter/nvim-treesitter?tab=readme-ov-file#advanced-setup).

First of all, add the following to your `init.lua`.

```lua
-- In init.lua, add the following lines:
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.belt = {
  install_info = {
    url = "https://github.com/lumiknit/tree-sitter-belt.git",
    files = {"src/parser.c"},
    branch = "main",
    requires_generate_from_grammar = true,
  },
  filetype = "belt",
}

-- Also, add the following lines to add filetype
vim.filetype.add({extension = {belt = "belt"}})
vim.treesitter.language.register("belt", "belt")
```

Then, run `:TSInstall belt` in Neovim. It'll install the parser.

After that, you should create `queries` in your RTP.
For example, in most cases, the path is `~/.config/nvim`.

```bash
mkdir -p ~/.config/nvim/queries/belt
cp PATH/OF/tree-sitter-belt/queries/highlights.scm ~/.config/nvim/queries/belt/highlights.scm
```

Now you can use the parser in Neovim.

If not works, run the script `:lua vim.treesitter.start(0, "belt")` to check if the parser
installed correctly.
