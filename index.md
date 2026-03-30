---
title: MyST Markdown Custom Widgets Testing
subtitle: Based on the AnyWidget standard
---

```{anywidget} ./modules/slider.mjs
:css: ./css/slider-style.css
```

```{anywidget} ./modules/notes-controller.mjs
:css: ./css/solution-notes.css
```

## Sliders Solutions & Notes enseignants

```{anywidget} ./modules/solution.mjs
:css: ./css/solution-notes.css
{
  "title" : "Solution",
  "content" : "Voici la solution."
}
```

:::::{tip} Note aux enseignants
:class: hidden notes-enseignants
Voici une note aux enseignants.
:::::