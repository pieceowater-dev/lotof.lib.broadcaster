export class ServiceError extends Error {

	public static error = 'ServiceError'

	getError(){
		return {
			name: ServiceError.error,
			message: this.message
		}
	}

}
