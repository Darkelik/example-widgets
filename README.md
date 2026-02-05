# Examples of the MyST Markdown Widget directive (AnyWidget)

For testing purposes.

## Running the examples

Some of the examples in `index.md` load **local modules** (e.g. `confetti.mjs` and `divmap.mjs`) via paths like `/confetti.mjs`. For those to work, a dev server must be serving this project.

1. **Start the local module server** (required for local widget examples):

   ```bash
   npm run serve
   ```

2. **Run the site** with one of the following:

   - **Development (MySTMD + Book Theme):** Use MySTMD on the appropriate branch/version and run `myst start --headless` with the Book Theme development server running locally.

   - **After release:** If the AnyWidget support is already released in MyST themes and the CLI, you can run:

     ```bash
     myst start
     ```
