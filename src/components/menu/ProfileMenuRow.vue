<template>
    <div class="wt-profile-menu-row">
        <span class="wt-profile-menu-row__avatar">
            {{ profile.shortName }}
        </span>
        <div class="wt-profile-menu-row__info">
            <span class="wt-profile-menu-row__profile">
                <span class="wt-profile-menu-row__profile-name">
                    {{ profile.name }}
                </span>
                <span>{{ profile.userName }}</span>
            </span>
            <span class="wt-profile-menu-row__time-spent">
                Hoy llevas 00:00
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProfileMenuRow',
    props: {
        profile: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .wt-profile-menu-row {
        display: flex;
        align-items: center;

        &__avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 16px;
            padding: 4px;
            margin-right: 16px;
            font-size: 12px;
            border-radius: 50%;
            background-color: lightgray;
            border: 1px solid #707070;
        }

        &__info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        &__time-spent {
            white-space: nowrap;;
        }

        &__profile {
            font-size: 12px;
            letter-spacing: 0.24px;
        }

        &__profile-name {
            margin-right: 8px;
            font-weight: bold;
        }

        &__time-spent {
            margin-top: 4px;
            color: lightgray;
            font-size: 10px;
            letter-spacing: 0.2px;
        }
    }
</style>
