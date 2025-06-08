import XCTest
import SwiftTreeSitter
import TreeSitterBelt

final class TreeSitterBeltTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_belt())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Belt grammar")
    }
}
