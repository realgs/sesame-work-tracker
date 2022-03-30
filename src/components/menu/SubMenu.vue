<template>
    <div class="wt-submenu">
        <span class="wt-submenu__option">
            <ProfileMenuRow :profile="profiles[0]" />
        </span>
        <span class="wt-submenu__option">
            <ProfileMenuRow :profile="profiles[1]" />
        </span>
    </div>
</template>

<script>
import ProfileMenuRow from './ProfileMenuRow.vue';

const PROFILES = [
    { shortName: 'S1', name: 'Sesame1', userName: 'Thomas Anderson' },
    { shortName: 'S2', name: 'Sesame2', userName: 'Thomas Anderson' },
];

export default {
    name: 'SubMenu',
    components: {
        ProfileMenuRow,
    },
    computed: {
        profiles(){
            return PROFILES;
        }
    }
}
</script>

<style lang="scss" scoped>
    .wt-submenu {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: -310px;
        width: 300px;
        box-shadow: rgba(17, 17, 26, 0.085) 0px 4px 16px, rgba(17, 17, 26, 0.085) 0px 8px 24px, rgba(17, 17, 26, 0.085) 0px 16px 56px;
        border-radius: 16px;
        overflow: hidden;
    
    &__option {
        padding: 12px 16px;
        text-align: center;
        border-bottom: 1px solid lightgray;
      
        &:hover {
            background-color: #BEE5DA;
        }

        &:last-of-type {
            border: none;
        }
    }
  }
</style>
