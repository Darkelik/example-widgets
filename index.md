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

:::{tip} Note aux enseignants
:class: hidden notes-enseignants
Voici une note aux enseignants.
:::

```{anywidget} ./modules/button.mjs
:css: ./css/button.css
{
  "title" : "Cliquez moi!",
  "content" : "J'ai été cliqué!"
}
```

:::{note} Question 1
:class: 
Ecrivez le début d'une simple boucle "for" en python.
```{anywidget} ./modules/solution.mjs
:css: ./css/solution-notes.css
{
  "title" : "Solution",
  "content" : "Voici un exemple : 'for i in range(5):'"
}
```
:::{tip} Note aux enseignants
:class: hidden notes-enseignants
Voir les boucles "while" pour le prochain exercice.
:::