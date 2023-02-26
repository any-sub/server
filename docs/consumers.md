## Consumer philosophy:

1. Parse the source:
    - convert the passed string into a workable type (e.g. HTML DOM, JSON Object)
2. Look up container
    - search the object for the reference point
3. Get contents of watched section(s)
4. Return state object


## Lookup containers:

* CSS selector
* XPATH selector
* REGEX, return parent element

## Lookup element(s):

* All direct children
* CSS selector
* XPATH selector
* REGEX, return parent element