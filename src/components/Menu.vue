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
  overflow: hidden;

  &__option {
    padding: 16px 64px;
    text-align: center;
    border-bottom: 1px solid lightgray;
    
    &:hover {
      color: #FFF;
      background-color: lightgray;
    }

    &:last-of-type {
      border: none;
    }
  }
}

</style>
