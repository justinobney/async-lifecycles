# Async lifecycles

Utility function to reduce branching of async function states

## Install

`yarn add async-lifecycles`

## Reasoning

This was primarily born out of wanting something better with `react` and `setState` though not tied to `react` at all.
I found myself repeating code like this:

```js
// ...
someAsyncCall = async () => {
  this.setState({
    loading: true,
    error: null
  });
  try {
    let data = await api.getData("...");
    this.setState({
      loading: false,
      data: data,
      error: null
    });
  } catch (error) {
    this.setState({
      loading: false,
      error: error
    });
  }
};
// ...
```

Instead of littering my code with all the `try/catch` or `promise.then(/*...*/).catch(/*...*/)`, I found it more pleasant to have code like so:

```js
// ...
someAsyncCall = async () => {
  asyncLifecycles(
    () => api.getData("..."),
    ({ loading, data, error }) => {
      this.setState({
        loading,
        error,
        data
      });

      if (data) {
        // do something on successfull if you chose
      }
    }
  );
};
// ...
```
