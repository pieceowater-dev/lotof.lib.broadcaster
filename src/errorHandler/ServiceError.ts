export class ServiceError extends Error {

	getError(){
		return {
			name: 'ServiceError',
			message: this.message
		}
	}

}
