<template>
	<div class="wt-work-tracker"> 
		<TimeCounter :isWorking="isWorking" />
		<template v-if="!isWorking">
			<button class="wt-button wt-button--green" @click="toggleIsworking">Entrar</button>
		</template>
		<template v-else>
			<button class="wt-button wt-button--gray" @click="pauseWorking">Pausar</button>
			<button class="wt-button wt-button--red" @click="toggleIsworking">Salir</button>
		</template>
		<div class="wt-work-tracker__avatar-wrapper">
			<span :class="['wt-avatar', {'wt-avatar--active': isWorking}]"> 
				{{ currentUserInitials }}
			</span>
		</div>
		<div v-click-outside="hideMenu">
			<span class="wt-work-tracker__account" @click="toggleMenuVisibility">
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
	import Menu from './components/menu/Menu.vue';
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
				isWorking: false,
				position: null,
			};
		},
		components: {
			TimeCounter,
			Menu,
		},
		mounted() {
			this.fetchUsersData();
			this.updatePosition();
		},
		computed: {
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
			updatePosition() {
				navigator.geolocation && navigator.geolocation.getCurrentPosition( (position) => {
					this.position = position;
				}, () => {
					this.position = null;
				});
			},
			toggleIsworking() {
				this.updatePosition();

				if (this.isWorking) {
					checkout({
						"employeeId": EXEMPLARY_USER_ID,
						"workEntryOut": {
							"coordinates": {
								"latitude": this.position.coords.latitude,
								"longitude": this.position.coords.longitude
							}
						}
					});
				} else {
					checkin({
						"employeeId": EXEMPLARY_USER_ID,
						"workEntryIn": {
							"coordinates": {
								"latitude": this.position.coords.latitude,
								"longitude": this.position.coords.longitude
							}
						}
					});
				}
				//TODO future: switch isWorking status only if response from API checkin/checkout is 200, (+handle error user side)
				this.isWorking = !this.isWorking;
			},
			fetchUsersData() {
				getEntries.then(response => {
					this.workEntries = response;
					this.currentUserWorkEntries = this.workEntries.filter(workEntry => workEntry.employee.id === EXEMPLARY_USER_ID);
				}).catch(
					e => console.log('Error loading entries from API work-entries', e)
				);
			},
			pauseWorking() {
				alert('well done tester! You found the missing part ;)');
			},
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: "CeraPro";
		src: url('./assets/fonts/Cera-Pro-Bold.ttf') format("truetype");
		font-weight: bold;
	}

	@font-face {
		font-family: "CeraPro";
		src: url('./assets/fonts/Cera-Pro-Light.ttf') format("truetype");
		font-weight: normal;
	}

	html, body {
		height: 100%;
		font-family: CeraPro;
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
		padding: 4px 32px;
		margin-top: 64px;
		background-color: #E9E9E9;
		border-radius: 40px;

		&__account {
			display: block;
			min-width: 156px;
			padding: 8px 0;
			margin-left: 16px;
			white-space: nowrap;
			font-weight: bold;
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
		display: flex;
		justify-content: center;
		position: relative;
		width: 14px;
		height: 14px;
		padding: 7px;
		font-size: 11px;
		letter-spacing: 0.05px;
		color: #FFF;
		background-color: #707070;
		border-radius: 50%;

		&--active {
			&:after {
				content: '';
				position: absolute;
				top: 4px;
				right: -2px;
				display: block;
				width: 10px;
				height: 10px;
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
