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
 * @interface SingleTransaction
 */
export interface SingleTransaction {
    /**
     * 
     * @type {string}
     * @memberof SingleTransaction
     */
    date: string;
    /**
     * 
     * @type {number}
     * @memberof SingleTransaction
     */
    quantityTransacted: number;
    /**
     * 
     * @type {number}
     * @memberof SingleTransaction
     */
    price: number;
    /**
     * 
     * @type {string}
     * @memberof SingleTransaction
     */
    priceCurrency: string;
    /**
     * 
     * @type {number}
     * @memberof SingleTransaction
     */
    fee: number;
    /**
     * 
     * @type {string}
     * @memberof SingleTransaction
     */
    transactionType: string;
    /**
     * 
     * @type {string}
     * @memberof SingleTransaction
     */
    exchange?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SingleTransaction
     */
    numberOfCoinsSold: number;
    /**
     * 
     * @type {string}
     * @memberof SingleTransaction
     */
    notes?: string | null;
}

/**
 * Check if a given object implements the SingleTransaction interface.
 */
export function instanceOfSingleTransaction(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "date" in value;
    isInstance = isInstance && "quantityTransacted" in value;
    isInstance = isInstance && "price" in value;
    isInstance = isInstance && "priceCurrency" in value;
    isInstance = isInstance && "fee" in value;
    isInstance = isInstance && "transactionType" in value;
    isInstance = isInstance && "numberOfCoinsSold" in value;

    return isInstance;
}

export function SingleTransactionFromJSON(json: any): SingleTransaction {
    return SingleTransactionFromJSONTyped(json, false);
}

export function SingleTransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): SingleTransaction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': json['date'],
        'quantityTransacted': json['quantityTransacted'],
        'price': json['price'],
        'priceCurrency': json['priceCurrency'],
        'fee': json['fee'],
        'transactionType': json['transactionType'],
        'exchange': !exists(json, 'exchange') ? undefined : json['exchange'],
        'numberOfCoinsSold': json['numberOfCoinsSold'],
        'notes': !exists(json, 'notes') ? undefined : json['notes'],
    };
}

export function SingleTransactionToJSON(value?: SingleTransaction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'date': value.date,
        'quantityTransacted': value.quantityTransacted,
        'price': value.price,
        'priceCurrency': value.priceCurrency,
        'fee': value.fee,
        'transactionType': value.transactionType,
        'exchange': value.exchange,
        'numberOfCoinsSold': value.numberOfCoinsSold,
        'notes': value.notes,
    };
}
