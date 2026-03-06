<script setup></script>

<template>
  <RouterView />
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f2f5;
  color: #333;
}

a {
  color: #1976D2;
  text-decoration: none;
}
a:hover { text-decoration: underline; }

button {
  cursor: pointer;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  background: #1976D2;
  color: white;
  transition: background 0.2s;
}
button:hover { background: #1256a0; }

input, textarea, select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
}
input:focus, textarea:focus {
  outline: none;
  border-color: #1976D2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 0.9rem;
}

form > div {
  margin-bottom: 16px;
}

form h2 {
  margin-bottom: 20px;
  font-size: 1.4rem;
}
</style>
