<template>
  <div id="app">
    <router-view />
    <notifications group="error" position="top right" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
    height: 100%;
    width: 100%;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  max-width: 8px;
  max-height: 2px;
}

::-webkit-scrollbar-thumb {
  border-radius: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
</style>
