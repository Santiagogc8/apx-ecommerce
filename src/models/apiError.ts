// Exportamos una clase ApiError que hereda de Error
export class ApiError extends Error {
	statusCode: number; // Recibe un statusCode
	constructor(message: string, statusCode: number) {
		// Y construye el mensaje y el statusCode
		super(message);
		this.statusCode = statusCode;
	}
}