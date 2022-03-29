<template>
  <span class="wt-time">
    {{ timeWorking }}
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
      currentTime: new Date().getTime()
    };
  },
  props: {
    startTime: {
      type: Number,
      required: true
    },
    isWorking: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.startInterval();
  },
  computed: {
    timeWorking() {
      const timePassed = this.currentTime - this.startTime;
      const hours = this.formatTimeUnit(timePassed / (1000 * 60 * 60));
      const minutes = this.formatTimeUnit(timePassed % (1000 * 60 * 60) / (1000 * 60));
      const seconds = this.formatTimeUnit(timePassed % (1000 * 60) / 1000);
      return [hours, minutes, seconds].join(':');
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
    startInterval() {
      setInterval(() => {
        this.updateTime();
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
  .wt-time {
    letter-spacing: 0.34px;
    white-space: nowrap;
    margin-right: 24px;


    &__total {
      margin-right: 24px;
      color: #B5B5B5;
    }
  }
</style>
