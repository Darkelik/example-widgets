---
title: MyST Markdown Widgets
subtitle: Based on the AnyWidget standard
authors:
    - name: Steve Purves
      email: steve@curvenote.com
      affiliation: Curvenote
date: 2025-12-20
---

# Tests

```{anywidget} ./modules/example-widget.mjs
:css: ./css/example-widget-style.css
{
  "count": 0
}
```

# Examples

![](./image.jpg)

## Confetti

::::{figure}
:::{anywidget} http://localhost:3000/modules/confetti.mjs
:::
Ensure `npm run serve` is running locally.
::::

:::::{note} Usage
:class: dropdown
Ensure `npm run serve` is running locally.
::::{code} myst
:::{anywidget} http://localhost:3200/modules/confetti.mjs
{}
:::
::::
:::::

## div-map

::::{figure}
:::{anywidget} http://localhost:3200/modules/divmap.mjs
{
  colors: "reds",
  data: [
    [1.913, -2.015, -3.579, 7.942, -0.753, -8.792, 5.895, 2.438, -3.707, 0.575],
    [1.909, -6.927, 2.001, 13.484, -14.331, -5.773, 15.662, -4.404, -5.126, 3.333],
    [-1.634, -9.17, 15.401, 5.533, -29.443, 14.156, 16.63, -17.228, 0.004, 5.62],
    [-7.333, -1.894, 24.622, -19.564, -23.69, 39.573, -3.462, -22.724, 11.417, 3.192],
    [-9.156, 11.772, 14.721, -40.415, 9.472, 40.785, -32.445, -8.714, 18.36, -3.946],
    [-3.946, 18.36, -8.714, -32.445, 40.785, 9.472, -40.415, 14.721, 11.772, -9.156],
    [3.192, 11.417, -22.724, -3.462, 39.573, -23.69, -19.564, 24.622, -1.894, -7.333],
    [5.62, 0.004, -17.228, 16.63, 14.156, -29.443, 5.533, 15.401, -9.17, -1.634],
    [3.333, -5.126, -4.404, 15.662, -5.773, -14.331, 13.484, 2.001, -6.927, 1.909],
    [0.575, -3.707, 2.438, 5.895, -8.792, -0.753, 7.942, -3.579, -2.015, 1.913]
  ]
}
:::
Ensure `npm run serve` is running locally.
::::

:::::{note} Usage
:class: dropdown

Ensure `npm run serve` is running locally.

::::{code} myst
:::{anywidget} http://localhost:3200/modules/divmap.mjs
{
  colors: "reds",
  data: [
    [1.913, -2.015, -3.579, 7.942, -0.753, -8.792, 5.895, 2.438, -3.707, 0.575],
    [1.909, -6.927, 2.001, 13.484, -14.331, -5.773, 15.662, -4.404, -5.126, 3.333],
    [-1.634, -9.17, 15.401, 5.533, -29.443, 14.156, 16.63, -17.228, 0.004, 5.62],
    [-7.333, -1.894, 24.622, -19.564, -23.69, 39.573, -3.462, -22.724, 11.417, 3.192],
    [-9.156, 11.772, 14.721, -40.415, 9.472, 40.785, -32.445, -8.714, 18.36, -3.946],
    [-3.946, 18.36, -8.714, -32.445, 40.785, 9.472, -40.415, 14.721, 11.772, -9.156],
    [3.192, 11.417, -22.724, -3.462, 39.573, -23.69, -19.564, 24.622, -1.894, -7.333],
    [5.62, 0.004, -17.228, 16.63, 14.156, -29.443, 5.533, 15.401, -9.17, -1.634],
    [3.333, -5.126, -4.404, 15.662, -5.773, -14.331, 13.484, 2.001, -6.927, 1.909],
    [0.575, -3.707, 2.438, 5.895, -8.792, -0.753, 7.942, -3.579, -2.015, 1.913]
  ]
}
:::
::::
:::::

## Vizarr

::::{figure}
:::{anywidget} https://curvenote.github.io/widgets/widgets/vizarr-viewer.js
:class: w-full

{
  "source": "https://uk1s3.embassy.ebi.ac.uk/idr/zarr/v0.3/9836842.zarr",
  "height": "300px"
}

:::
Module is remotely hosted
::::

:::::{note} Usage
:class: dropdown
::::{code} myst
:::{anywidget} https://curvenote.github.io/widgets/widgets/vizarr-viewer.js
:class: w-full

{
  "source": "https://uk1s3.embassy.ebi.ac.uk/idr/zarr/v0.3/9836842.zarr",
  "height": "300px"
}

:::
::::
:::::

## scikit-image version

::::{figure}
:::{anywidget} http://localhost:3200/modules/scikit-image-version.mjs
:::
Version sidebar (GitHub API); ensure `npm run serve` is running locally.
::::

:::::{note} Usage
:class: dropdown
Ensure `npm run serve` is running locally.
::::{code} myst
:::{anywidget} http://localhost:3200/modules/scikit-image-version.mjs
:::
::::
:::::
