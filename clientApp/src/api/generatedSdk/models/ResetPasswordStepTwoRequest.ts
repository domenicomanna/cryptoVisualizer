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
 * @interface ResetPasswordStepTwoRequest
 */
export interface ResetPasswordStepTwoRequest {
    /**
     * 
     * @type {string}
     * @memberof ResetPasswordStepTwoRequest
     */
    resetPasswordToken: string;
    /**
     * 
     * @type {string}
     * @memberof ResetPasswordStepTwoRequest
     */
    newPassword: string;
    /**
     * 
     * @type {string}
     * @memberof ResetPasswordStepTwoRequest
     */
    confirmedNewPassword: string;
}

/**
 * Check if a given object implements the ResetPasswordStepTwoRequest interface.
 */
export function instanceOfResetPasswordStepTwoRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "resetPasswordToken" in value;
    isInstance = isInstance && "newPassword" in value;
    isInstance = isInstance && "confirmedNewPassword" in value;

    return isInstance;
}

export function ResetPasswordStepTwoRequestFromJSON(json: any): ResetPasswordStepTwoRequest {
    return ResetPasswordStepTwoRequestFromJSONTyped(json, false);
}

export function ResetPasswordStepTwoRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResetPasswordStepTwoRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'resetPasswordToken': json['resetPasswordToken'],
        'newPassword': json['newPassword'],
        'confirmedNewPassword': json['confirmedNewPassword'],
    };
}

export function ResetPasswordStepTwoRequestToJSON(value?: ResetPasswordStepTwoRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'resetPasswordToken': value.resetPasswordToken,
        'newPassword': value.newPassword,
        'confirmedNewPassword': value.confirmedNewPassword,
    };
}

