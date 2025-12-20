---
title: MyST Markdown Widgets
subtitle: Based on the AnYWidget standard
authors:
    - name: Steve Purves
      email: steve@curvenote.com
      affiliation: Curvenote
date: 2025-12-20
---

# Example 1

:::{widget} ./my-js-module.mjs
:css: ./my-styles.css
:class: border border-red-500

{ version: 1, name: "A widget with JSON5 body" }

:::


# Bad Case 1 - no body

:::{widget} ./my-js-module.mjs
:css: ./my-styles.css
:class: border border-red-500

{}

:::