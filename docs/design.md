# Lookups

# HTML Lookup
1. parse web page
1. select an HTML element (CSS, XPATH, ATTRIBUTE)
    - container for text, other elements, etc

## Single Element Lookup
- default:
    - get content, compare to stored version
    - `'foo'` ?= `'fooz'`
    - useful for:
        - last updated label on forum messages
        - price changes on ecommerce sites
- regex:
    1. run expression
    1. get all groups
    1. stringify
    1. compare to stored version
    - `['foo','bar']` ?= `['fooz','bar']`
    - useful for:
        - fine grained comparison in big chunk of text

## Multiple Element Lookup
- define side of list to trim (elements list trimmed automatically)
1. create selection for inner elements of container (e.g. `CSS: 'li.deal>a.free'`)
2. find last element that matches and use rest of list (else, use whole list)
3. store list of element text content
- stored:`['foo', 'bar', 'fooz', 'foobar']` captured:`['fooz', 'foobar', 'barz', 'barfoo']`
    - alert `['barz', 'barfoo']`
    - store `['fooz', 'foobar', 'barz', 'barfoo']`
- useful for:
    - new forum posts/threads
