<template>
  <div class="wt-work-tracker"> 
    <TimeCounter :isWorking="isWorking" />
    <template v-if="!isWorking">
      <button class="wt-button wt-button--green" @click="toggleIsworking">Entrar</button>
    </template>
    <template v-else>
      <button class="wt-button wt-button--gray">Pausar</button>
      <button class="wt-button wt-button--red" @click="toggleIsworking">Salir</button>
    </template>
    <div class="wt-work-tracker__avatar-wrapper">
      <span :class="['wt-avatar', {'wt-avatar--active': isWorking}]"> 
        {{ currentUserInitials }}
      </span>
    </div>
    <div v-click-outside="hideMenu">
      <span class="wt-work-tracker__account" 
            @click="toggleMenuVisibility">
        {{ currentUserFullName }}
        <svg v-if="currentUserFullName" 
						:class="menuToggleClass" 
						xmlns="http://www.w3.org/2000/svg" 
						width="14" 
						height="14">
					<path style="fill:transparent" d="M0 0h14v14H0z" transform="rotate(-90 7 7)"/><path d="M12.5 13 9 9.5 12.5 6" transform="rotate(-90 7.625 10.125)" style="stroke:#3f3f3f;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.2px;fill:transparent"/>
				</svg>
      </span>
      <Menu v-if="isMenuVisible" />
    </div>
  </div>
</template>

<script>
import TimeCounter from './components/TimeCounter.vue'
import Menu from './components/Menu.vue';
import { getEntries, checkin, checkout } from './services/api-requests.js';

const EXEMPLARY_USER_ID = 'b0027fe5-f78b-459a-a1b4-0f452a004f87';

export default {
  name: 'WorkTracker',
  data() {
    return {
      workEntries: null,
			currentUserWorkEntries: null,
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
    this.fetchUsersData();
  },
  computed: {
    hardcodedWorkEntries() {
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
		currentWorkEntry() {
			//TODO future:  if working on 'pause' functionality - do not take the first/last work entry
      return this.workEntries && this.workEntries[0];
		},
    currentUser() {
      return this.currentWorkEntry && this.currentWorkEntry.employee;
    },
    currentUserFullName() {
      return this.currentUser && `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    },
    currentUserInitials() {
      return this.currentUser ? (this.currentUser.firstName.charAt(0) + this.currentUser.lastName.charAt(0)) : 'AA';
    },
		//TODO future: use the below and pass it to TimeCounter as a prop if working on 'pause' functionality:
    // currentUserStartTime() {
    //   return new Date(this.currentWorkEntry && this.currentWorkEntry.workEntryIn.date).getTime();
    // },
    menuToggleClass() {
      return this.isMenuVisible ? 'wt-work-tracker__menu-toggle  wt-work-tracker__menu-toggle--up' : 'wt-work-tracker__menu-toggle';
    },
  },
  methods: {
    toggleMenuVisibility() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    hideMenu() {
      this.isMenuVisible = false;
    },
    toggleIsworking() {
			if (this.isWorking) {
				checkout({
					"employeeId": EXEMPLARY_USER_ID,
					"workEntryOut": {
							"coordinates": {
									"latitude": null,
									"longitude": null
							}
					}
				});
			} else {
				checkin({
					"employeeId": EXEMPLARY_USER_ID,
					"workEntryIn": {
							"coordinates": {
									"latitude": null,
									"longitude": null
							}
					}
				});
			}
			//TODO future: switch isWorking status only if response from API checkin/checkout is 200, (+update fetchUsersData)
      this.isWorking = !this.isWorking;
    },
		fetchUsersData() {
			getEntries.then( response => {
			this.workEntries = response;
			this.currentUserWorkEntries = this.workEntries.filter( workEntry => workEntry.employee.id === EXEMPLARY_USER_ID );
		} ).catch(
			e => console.log('Error loading users from API work-entries', e)
		);
		},
  }
}
</script>

<style lang="scss">

html, body {
  height: 100%;
}

#app {
  display: flex;
  justify-content: center;
}

.wt-work-tracker {
  position: relative;
  display: flex;
  align-items: center;
  width: min-content;
  padding: 8px 32px;
  margin-top: 64px;
  background-color: #DBDBDB;
  border-radius: 40px;

  &__account {
		display: block;
		min-width: 150px;
    padding: 8px 0;
    margin-left: 16px;
    white-space: nowrap;
    font-weight: bold;;
  }

  &__avatar-wrapper {
    padding-left: 14px;
    margin-left: 8px;
    border-left: 1px solid #B5B5B5;
  }

  &__menu-toggle {
    margin: 0 0 -3px 4px;
    transition: transform 0.3s 0.1s;

    &--up {
      transform: rotateX(180deg);
      transform-origin: center center;
    }
  }
}

.wt-avatar {
    display: block;
    position: relative;
    padding: 7px;
    font-size: 11px;
    letter-spacing: 0.05em;
    color: #FFF;
    background-color: #707070;
    border-radius: 50%;

  &--active {
    &:after {
      position: absolute;
      top: 4px;
      right: -2px;
      display: block;
      content: '';
      width: 8px;
      height: 8px;
      background: #5EBEA3;
      border-radius: 50%;
    }
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
