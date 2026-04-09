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
<!--
```{anywidget} ./modules/solution-controller.mjs
```
-->
## Sliders Solutions & Notes enseignants

```{anywidget} ./modules/solution.mjs
:css: ./css/solution-notes.css
{
  "title" : "Solution",
  "content" : "Voici la solution."
}
```

:::{admonition} Note aux enseignants
:class: hidden
Voici une note aux enseignants.
:::

```{anywidget} ./modules/button.mjs
:css: ./css/button.css
{
  "title" : "Cliquez moi!",
  "content" : "J'ai été cliqué!"
}
```

:::{admonition} Question 1
:class: 
Ecrivez le début d'une simple boucle "for" en python.
```{anywidget} ./modules/solution.mjs
:css: ./css/solution-notes.css
{
  "title" : "Solution",
  "content" : "Voici un exemple : 'for i in range(5):'"
}
```
:::{admonition} Note aux enseignants
:class: hidden
Voir les boucles "while" pour le prochain exercice.
:::