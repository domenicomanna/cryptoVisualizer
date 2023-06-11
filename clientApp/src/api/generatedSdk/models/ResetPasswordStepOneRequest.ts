/* tslint:disable */
/* eslint-disable */
/**
 * Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ResetPasswordStepOneRequest
 */
export interface ResetPasswordStepOneRequest {
    /**
     * 
     * @type {string}
     * @memberof ResetPasswordStepOneRequest
     */
    email: string;
}

/**
 * Check if a given object implements the ResetPasswordStepOneRequest interface.
 */
export function instanceOfResetPasswordStepOneRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;

    return isInstance;
}

export function ResetPasswordStepOneRequestFromJSON(json: any): ResetPasswordStepOneRequest {
    return ResetPasswordStepOneRequestFromJSONTyped(json, false);
}

export function ResetPasswordStepOneRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResetPasswordStepOneRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
    };
}

export function ResetPasswordStepOneRequestToJSON(value?: ResetPasswordStepOneRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
    };
}

