<template>
  <div class="wt-work-tracker">
    <TimeCounter :startTime="currentUserStartTime" 
                  :isWorking="isWorking" />
    <template v-if="!isWorking">
      <button class="wt-button wt-button--green" @click="toggleIsworking">Entrar</button>
    </template>
    <template v-else>
      <button class="wt-button wt-button--gray">Pausar</button>
      <button class="wt-button wt-button--red" @click="toggleIsworking">Salir</button>
    </template>
    <!-- TODO: AVATAR + active / inactive dot -->
    <span class="wt-work-tracker__account" @click="toggleMenuVisibility">{{ currentUserFullName }}</span>
    <Menu v-if="isMenuVisible" />
  </div>
</template>

<script>
import TimeCounter from './components/TimeCounter.vue'
import Menu from './components/Menu.vue';

export default {
  name: 'WorkTracker',
  data() {
    return {
      currentUserId: 0,
      isMenuVisible: false,
      isWorking: false
    };
  },
  components: {
    TimeCounter,
    Menu,
  },
  mounted() {
    //GET data from API, update 'isWorking' 
  },
  computed: {
    users() {
      return [
        {
          "id": "00fe4df9-2ff1-45af-90bb-a95bed1d8c7e",
          "employee": {
              "id": "b0027fe5-f78b-459a-a1b4-0f452a004f87",
              "firstName": "Thomas",
              "lastName": "Anderson",
              "email": "thomas@anderson.com",
              "workStatus": "offline",
              "imageProfileURL": null,
              "code": 3,
              "pin": 1000,
              "phone": null,
              "company": {
                  "id": "d41ec4b5-c20f-4ff6-8bf4-ca6fbd765f56",
                  "name": "Sesame Front",
                  "language": "es-ES",
                  "notificationEmail": "pruebafrontsesame@gmail.com",
                  "createdAt": "2021-02-18T16:35:06+00:00",
                  "updatedAt": "2021-02-18T16:37:28+00:00"
              },
              "gender": null,
              "contractId": null,
              "nid": null,
              "identityNumberType": "nic",
              "ssn": null,
              "pricePerHour": 0,
              "accountNumber": null,
              "dateOfBirth": null,
              "customFields": [],
              "createdAt": "2021-02-18T16:37:45+00:00",
              "updatedAt": "2021-02-18T16:37:45+00:00",
              "status": "active",
              "children": null,
              "disability": null
          },
          "workEntryType": "work",
          "workEntryIn": {
              "origin": "api",
              "date": "2022-03-14T12:44:45+01:00",
              "coordinates": {
                  "latitude": null,
                  "longitude": null
              }
          },
          "workEntryOut": {
              "origin": "api",
              "date": "2022-03-14T12:46:27+01:00",
              "coordinates": {
                  "latitude": null,
                  "longitude": null
              }
          },
          "createdAt": "2022-03-14T11:44:45+00:00",
          "updatedAt": "2022-03-14T11:46:27+00:00",
          "deletedAt": null
        },
        {
            "id": "003fc540-1eb9-4d7c-9a1d-338aaf85b795",
            "employee": {
                "id": "cf4e03eb-6945-4fa5-ada7-f902492303c4",
                "firstName": "Kelly",
                "lastName": "Pierce",
                "email": "pruebafrontsesame@gmail.com",
                "workStatus": "offline",
                "imageProfileURL": null,
                "code": 1,
                "pin": 1000,
                "phone": null,
                "company": {
                    "id": "d41ec4b5-c20f-4ff6-8bf4-ca6fbd765f56",
                    "name": "Sesame Front",
                    "language": "es-ES",
                    "notificationEmail": "pruebafrontsesame@gmail.com",
                    "createdAt": "2021-02-18T16:35:06+00:00",
                    "updatedAt": "2021-02-18T16:37:28+00:00"
                },
                "gender": null,
                "contractId": null,
                "nid": null,
                "identityNumberType": "nic",
                "ssn": null,
                "pricePerHour": 0,
                "accountNumber": null,
                "dateOfBirth": null,
                "customFields": [],
                "createdAt": "2021-02-18T16:35:06+00:00",
                "updatedAt": "2021-02-18T16:35:06+00:00",
                "status": "active",
                "children": null,
                "disability": null
            },
            "workEntryType": "work",
            "workEntryIn": {
                "origin": "api",
                "date": "2021-04-12T15:19:51+02:00",
                "coordinates": {
                    "latitude": null,
                    "longitude": null
                }
            },
            "workEntryOut": {
                "origin": "api",
                "date": "2021-04-12T15:19:55+02:00",
                "coordinates": {
                    "latitude": null,
                    "longitude": null
                }
            },
            "createdAt": "2021-04-12T13:19:51+00:00",
            "updatedAt": "2021-04-12T13:19:55+00:00",
            "deletedAt": null
        }
      ];
    },
    currentUser() {
      return this.users[this.currentUserId];
    },
    currentUserFullName() {
      return `${this.currentUser.employee.firstName} ${this.currentUser.employee.lastName}`;
    },
    currentUserStartTime() {
      return new Date(this.currentUser.workEntryIn.date).getTime();
    },
  },
  methods: {
    toggleMenuVisibility() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    toggleIsworking() {
      //SEND POST REQ IN/OUT depending on isWorking status
      this.isWorking = !this.isWorking;
    },
  }
}
</script>

<style lang="scss">
/* remove default VUE app styles */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wt-work-tracker {
  display: flex;
  align-items: center;
  width: min-content;
  padding: 8px 16px;
  background-color: #DBDBDB;
  border-radius: 24px;

  &__account {
    padding: 0 16px 0 24px;
    white-space: nowrap;
  }
}

.wt-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 40px;
  margin: 8px;
  border-radius: 16px;
  border: none;
  color: #FFF;
  
  &--green {
    background: #5EBEA3;
  }

  &--gray {
    background: #B5B5B5;
  }

  &--red {
    background: #FF9984;
  }
}
</style>
