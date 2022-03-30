<template>
    <span class="wt-time">
        <span class="wt-time__accomplished">{{ timeWorking }}</span>
        <span v-if="isWorking"
              class="wt-time__total">
            / 08:00:00
        </span>
    </span>
</template>

<script>
    export default {
        name: 'TimeCounter',
        data() {
            return {
                startTime: null,
                currentTime: null
            };
        },
        props: {
            isWorking: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            timeWorking() {
                if (this.startTime && this.currentTime) {
                    const timePassed = this.currentTime - this.startTime;
                    const hours = this.formatTimeUnit(timePassed / (1000 * 60 * 60));
                    const minutes = this.formatTimeUnit(timePassed % (1000 * 60 * 60) / (1000 * 60));
                    const seconds = this.formatTimeUnit(timePassed % (1000 * 60) / 1000);
                    return [hours, minutes, seconds].join(':');
                } else {
                    return '00:00:00';
                }
            },
        },
        methods: {
            padTo2Digits(num) {
                return num.toString().padStart(2, '0');
            },
            formatTimeUnit(unit) {
                return this.padTo2Digits(Math.floor(unit));
            },
            updateTime() {
                this.currentTime = new Date().getTime();
            },
        },
        watch: {
            isWorking: function (val) {
                if (val && !this.interval) {
                    this.startTime = new Date().getTime();
                    this.currentTime = this.startTime;
                    this.interval = setInterval(() => {
                        this.updateTime();
                    }, 1000);
                } else {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .wt-time {
        letter-spacing: 0.34px;
        white-space: nowrap;
        margin-right: 12px;

        &__accomplished {
            display: inline-block;
            min-width: 72px;
        }

        &__total {
            margin-right: 8px;
            color: #B5B5B5;
        }
    }
</style>
