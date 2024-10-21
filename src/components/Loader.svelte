<script>
  // Toute l'attribution de ces loaders revient à CSS Loaders
  // https://css-loaders.com/hypnotic/
</script>

<div class="loader"></div>

<style>
  /* HTML: <div class="loader"></div> */
  .loader {
    display: inline-grid;
    font-size: 30px;
  }
  .loader:before,
  .loader:after {
    content: '☕️';
    grid-area: 1/1;
  }
  .loader:after {
    animation: l10 1s infinite;
  }
  @keyframes l10 {
    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
</style>
