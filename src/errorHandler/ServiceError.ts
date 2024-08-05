export class ServiceError extends Error {

	public static name = 'ServiceError'

	getError(){
		return {
			name: ServiceError.name,
			message: this.message
		}
	}

}
