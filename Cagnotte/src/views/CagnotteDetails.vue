<template>
  <div>
    <h2>Détails de la cagnotte {{ $route.params.id }}</h2>
    <RouterLink to="/cagnottes">Retour à la liste</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'CagnotteDetails'
}
</script>
