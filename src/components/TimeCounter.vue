<template>
  <span class="wt-time wt-time--active">{{ timeWorking }}</span>
  <span v-if="isWorking" 
        class="wt-time wt-time--total">
        / 08:00:00
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

<style scoped>
  .wt-time {
    padding: 0 24px;
    white-space: nowrap;
  }
</style>
