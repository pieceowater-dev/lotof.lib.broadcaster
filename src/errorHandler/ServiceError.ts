export class ServiceError extends Error {

	getError(){
		return {
			message: this.message
		}
	}

}
