# Species Image Placeholders

Drop flower images or GIFs here when ready. Suggested filenames:

- `setosa.gif` (or `.png` / `.jpg`)
- `versicolor.gif`
- `virginica.gif`

To wire them up, edit `src/pages/Predict.jsx` and update the `result-image-slot` block so it renders something like:

```jsx
<img
  src={`/placeholders/${result.prediction}.gif`}
  alt={result.prediction}
  className="result-image"
/>
```

Add the matching `.result-image` styles in `src/styles.css` if needed.
