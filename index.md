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

```{anywidget} ./modules/solution-controller.mjs
```

## Sliders Solutions & Notes enseignants

BEGIN SOLUTION

Voici la solution.

END SOLUTION

```{code-cell}
/** Distance de deux points sur une droite
 * @param a un entier: la coordonnée du premier point
 * @param b un entier: la coordonnée du deuxième point
 * @return la valeur absolue de la différence entre a et b
 **/
int distance(int a, int b) {
    /// BEGIN SOLUTION
    return abs(b - a);
    /// END SOLUTION
}
```

:::{admonition} Note aux enseignants
Voici une note aux enseignants.
:::

:::{admonition} Question 1

Ecrivez le début d'une simple boucle "for" en python.

BEGIN SOLUTION

Voici un exemple : 'for i in range(5):'

END SOLUTION
:::{admonition} Note aux enseignants
Voir les boucles "while" pour le prochain exercice.
:::
