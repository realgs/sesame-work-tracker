<template>
  <div class="wt-menu">
    <span class="wt-menu__arrow"></span>
    <span class="wt-menu__option" @click="toggleSubMenu">
      <SubMenu v-if="isSubmenuVisible" />
      <svg class="wt-menu__show-more" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path style="fill:transparent" d="M0 0h14v14H0z"/><path d="M12.5 13 9 9.5 12.5 6" transform="translate(-3.75 -2.5)" style="stroke:#3f3f3f;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.2px;fill:transparent"/></svg>
      Mis cuentas
    </span>
    <span class="wt-menu__option">Vista empleado</span>
    <span class="wt-menu__option">Mi perfil</span>
    <span class="wt-menu__option">Cerrar sesión</span>
  </div>
</template>

<script>
import SubMenu from './SubMenu.vue';

export default {
  name: 'TimeCounter',
  data() {
    return {
      isSubmenuVisible: false,
    };
  },
  components: {
    SubMenu,
  },
  //TODO future: accounts / profiles in props:
  props: {
    accounts: {
      type: Array,
      required: false
    }
  },
  methods: {
    toggleSubMenu() {
      this.isSubmenuVisible = !this.isSubmenuVisible;
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
  color: #707070;
  box-shadow: rgba(17, 17, 26, 0.085) 0px 4px 16px, rgba(17, 17, 26, 0.085) 0px 8px 24px, rgba(17, 17, 26, 0.085) 0px 16px 56px;
  border-radius: 16px;

  &__arrow {
    position: absolute;
    top: -12px;
    right: 32px;
    width: 16px;
    height: 16px;
    margin-left: -24px;
    border-top: 1px solid #E9E9E9;
    border-left: 1px solid #E9E9E9;
    background-color: #fff;
    transform: rotate(45deg);
    border-top-left-radius: 8px;
  }

  &__option {
    position: relative;
    padding: 16px 64px;
    text-align: center;
    
    &:hover {
      color: black;
    }

    &:last-of-type {
      border: none;
    }
  }

  &__show-more {
    position: absolute;
    top: 18px;
    left: 12px;
  }
}

</style>
