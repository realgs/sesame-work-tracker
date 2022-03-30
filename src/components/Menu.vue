<template>
  <div class="wt-menu">
    <span class="wt-menu__option" @click="openAccounts">Mis cuentas</span>
    <span class="wt-menu__option">Vista empleado</span>
    <span class="wt-menu__option">Mi perfil</span>
    <span class="wt-menu__option">Cerrar sesión</span>
  </div>
</template>

<script>

export default {
  name: 'TimeCounter',
  //TODO: accounts / profiles
  props: {
    accounts: {
      type: Array,
      required: false
    }
  },
  methods: {
    openAccounts() {
    }
  }
}
</script>

<style lang="scss" scoped>

.wt-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 63px;
  right: 0;
  box-shadow: rgba(17, 17, 26, 0.085) 0px 4px 16px, rgba(17, 17, 26, 0.085) 0px 8px 24px, rgba(17, 17, 26, 0.085) 0px 16px 56px;
  border-radius: 16px;

  &__option {
    padding: 32px 64px 0;
    text-align: center;
    
    &:last-of-type {
      padding-bottom: 32px;
    }
  }
}

</style>
