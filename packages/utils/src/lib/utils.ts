import * as constantsModule from '@litprotocol-dev/constants'
import { ELeft, EncryptFileAndZipWithMetadataProps, ERight, IEither, LIT_AUTH_SIG_CHAIN_KEYS, LIT_ERROR_TYPE, paramsValidators } from '@litprotocol-dev/constants';
import { ILitError } from '@litprotocol-dev/constants'

// ----- Testing Modules -----
export const utils = () => {
  console.log("[utils] has been called!");
  return 'utils()';
}

export const testImportedConstantModules = () => {

  console.log("[utils] import<constantsModule>:", constantsModule);

  return { 
    constantsModule
  }
}

// ----- Real Modules -----
/**
 * 
 * Print error message based on Error interface
 * 
 * @param { Error } e
 * @returns { void } 
 */
export const printError = (e: Error) : void => {
  console.log("Error Stack", e.stack);
  console.log("Error Name", e.name);
  console.log("Error Message", e.message);
};



/**
 * 
 * Find the element that occurs the most in an array
 * 
 * @param { Array<any> } arr
 * @returns { any } the element that appeared the most
 */
export const mostCommonString = (arr: Array<any>) : any => {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
};



/**
 * 
 * Standardized way to throw error in Lit Protocol projects
 * TODO: remove errorCode and use standardized ILitError type instead
 * 
 * @param { ILitError }
 * @property { string } message
 * @property { string } name
 * @property { string } errorCode
 */
export const throwError = ({ 
  message, 
  name, 
  errorCode,
  error,
}: ILitError) : never => {

  const errConstructorFunc = function(
    this: any, 
    message: string, 
    name: string, 
    errorCode: string
  ){
    this.message = message;
    this.name = name;
    this.errorCode = errorCode;
  }

  throw new (errConstructorFunc as any)(
    message, 
    name = error?.NAME ?? name,
    errorCode = error?.CODE ?? errorCode,
  );
};

declare global {
  var litConfig: any;
}

export const throwRemovedFunctionError = (functionName: string) => {
  throwError({
    message: `This function "${functionName}" has been removed. Please use the old SDK.`,
    error: LIT_ERROR_TYPE['REMOVED_FUNCTION_ERROR']
  });
}



/**
 * 
 * console.log but prepend [Lit-JS-SDK] before the message
 * 
 * @param { any } args
 *  
 * @returns { void }
 */
export const log = (...args: any) : void => {

  // -- validate
  if (
    globalThis &&
    globalThis?.litConfig &&
    globalThis?.litConfig.debug === false
  ) {
    return;
  }

  // -- execute
  args.unshift("[Lit-JS-SDK]");
  console.log(...args);
};



/**
 *
 * Get the type of a variable, could be an object instance type.
 * eg Uint8Array instance should return 'Uint8Array` as string
 * or simply a `string` or `int` type
 *
 * @param { any } value
 * @returns { string } type
 */
 export const getVarType = (value: any) : string => {
  return Object.prototype.toString.call(value).slice(8, -1);
};



/**
 *
 *  Check if the given value is the given type
 *  If not, throw `invalidParamType` error
 *
 * @property { any } value
 * @property { Array<String> } allowedTypes
 * @property { string } paramName
 * @property { string } functionName
 * @property { boolean } throwOnError
 * 
 * @returns { Boolean } true/false
 * 
 */
 export const checkType = ({
  value,
  allowedTypes,
  paramName,
  functionName,
  throwOnError = true,
}: {
  value: any,
  allowedTypes: Array<string> | any,
  paramName: string,
  functionName : string,
  throwOnError?: boolean,
}) : boolean => {

  // -- validate
  if (!allowedTypes.includes(getVarType(value))) {

    const message = `Expecting ${allowedTypes.join(
      " or "
    )} type for parameter named ${paramName} in Lit-JS-SDK function ${functionName}(), but received "${getVarType(
      value
    )}" type instead. value: ${
      value instanceof Object ? JSON.stringify(value) : value
    }`;

    if (throwOnError) {
      throwError({
        message,
        name: LIT_ERROR_TYPE['INVALID_PARAM'].NAME,
        errorCode: LIT_ERROR_TYPE['INVALID_PARAM'].CODE,
      });
    }
    return false;
  }

  // -- else
  return true;
};

export const safeParams = ({
  functionName,
  params,
}: {
  functionName: string,
  params: any[] | any,
}) => {

  const validator = paramsValidators[functionName](params);

  if ( ! validator ){
    log(`This function ${functionName} is skipping params safe guarding.`);
    return true;
  }

  return validator;

}

/**
 * 
 * @param { object } authSig 
 * @param { string } chain 
 * @param { string } functionName 
 * 
 * @returns { boolean }
 */
export const checkIfAuthSigRequiresChainParam = (
  authSig: object,
  chain: string,
  functionName: string,
) : boolean => {

  
  console.log("checkIfAuthSigRequiresChainParam");
  for (const key of LIT_AUTH_SIG_CHAIN_KEYS) {
    if (key in authSig) {
      console.log("Testing 1");
      return true;
    }
  }

  // if we're here, then we need the chain param
  if (
    !checkType({
      value: chain,
      allowedTypes: ["String"],
      paramName: "chain",
      functionName,
    })
  ){
    console.log("Testing 2");
    return false;
  }

  console.log("Testing 3");
  return true;
};

/**
 * TODO: Fix "any"
 * Sort object
 * 
 * @param { any } obj
 * @returns { any }
 */
 export const sortedObject = (obj: any) : any => {

  if (typeof obj !== "object" || obj === null) {
      return obj;
  }
  if (Array.isArray(obj)) {
      return obj.map(sortedObject);
  }
  const sortedKeys = Object.keys(obj).sort();
  const result : any = {};

  // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
  sortedKeys.forEach((key) => {
      result[key] = sortedObject(obj[key]);
  });

  return result;
}

/**
 * 
 * Convert number to hex
 * @param { number } v
 * @return { string } hex value prexied with 0x
 */
export const numberToHex = (v: number) : string => {
  return "0x" + v.toString(16);
}


/**
 * 
 * Get the local storage item by key
 * 
 * @param { string } key 
 */
export const getStorageItem = (key: string) : IEither => {

  const item = localStorage.getItem(key);

  let keyOrError : IEither;

  if( ! item ){
    keyOrError = ELeft({
      message: `Failed to get ${key} from local storage`,
      error: LIT_ERROR_TYPE['LOCAL_STORAGE_ITEM_NOT_FOUND_EXCEPTION']
    });
  }else{
    keyOrError = ERight(item);
  }

  return keyOrError;
  
}