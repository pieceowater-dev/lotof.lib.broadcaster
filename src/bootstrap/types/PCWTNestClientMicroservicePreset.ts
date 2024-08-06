import {ValidationPipeOptions} from "../validation/options";
import {Transport} from "@nestjs/microservices";

/**
 * Interface representing the configuration preset for PCWT Nest Client Microservice.
 *
 * @interface PCWTNestClientMicroservicePreset
 * @property {string} portEnvVar - The environment variable for the port. Default is 'PORT'.
 * @property {Array<{transport: Transport, urlEnvVars: string[], queue: string}>} microservices - The microservices configuration array.
 */
export interface PCWTNestClientMicroservicePreset {
  portEnvVar: string | 'PORT';
  microservices: Array<{
    transport: Transport;
    urlEnvVars: string[] | ['MQ_URL'];
    queue: string;
  }>;
  validation?: ValidationPipeOptions;
}
