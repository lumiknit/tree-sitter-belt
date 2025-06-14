package tree_sitter_belt_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_belt "github.com/lumiknit/tree-sitter-belt/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_belt.Language())
	if language == nil {
		t.Errorf("Error loading Belt grammar")
	}
}
