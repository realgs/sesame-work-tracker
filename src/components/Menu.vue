<template>
  <div class="wt-menu">
    <span class="wt-menu__option">Mis cuentas</span>
    <span class="wt-menu__option">Vista empleado</span>
    <span class="wt-menu__option">Mi perfil</span>
    <span class="wt-menu__option">Cerrar sesión</span>
  </div>
</template>

<script>

export default {
  name: 'TimeCounter',
  props: {
    accounts: {
      type: Array,
      required: true
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
