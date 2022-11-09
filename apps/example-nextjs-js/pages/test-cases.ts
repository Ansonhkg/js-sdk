import {
 CASE_000_EXPORTS
} from './cases/CASE_000_EXPORTS';

import {
 CASE_001_ENCRYPT_AND_DECRYPT_STRING
} from './cases/CASE_001_ENCRYPT_AND_DECRYPT_STRING';

import {
 CASE_002_ENCRYPT_AND_DECRYPT_ZIP
} from './cases/CASE_002_ENCRYPT_AND_DECRYPT_ZIP';

import {
 CASE_003_UTILS
} from './cases/CASE_003_UTILS';

import {
 CASE_004_ENCRYPT_AND_DECRYPT_FILE
} from './cases/CASE_004_ENCRYPT_AND_DECRYPT_FILE';

import {
 CASE_005_ENCRYPT_AND_DECRYPT_FILE
} from './cases/CASE_005_ENCRYPT_AND_DECRYPT_FILE';

import {
 CASE_006_ENCRYPT_AND_ZIP_METADATA
} from './cases/CASE_006_ENCRYPT_AND_ZIP_METADATA';

import {
 CASE_007_TEST_BLSSDK
} from './cases/CASE_007_TEST_BLSSDK';

import {
 CASE_008_TEST_ECDSA_SDK
} from './cases/CASE_008_TEST_ECDSA_SDK';

import {
 CASE_009_GET_EXECUTION_SHARES
} from './cases/CASE_009_GET_EXECUTION_SHARES'

export const testCases = [
...CASE_000_EXPORTS,
...CASE_001_ENCRYPT_AND_DECRYPT_STRING,
...CASE_002_ENCRYPT_AND_DECRYPT_ZIP,
...CASE_003_UTILS,
...CASE_004_ENCRYPT_AND_DECRYPT_FILE,
...CASE_005_ENCRYPT_AND_DECRYPT_FILE,
...CASE_006_ENCRYPT_AND_ZIP_METADATA,
...CASE_007_TEST_BLSSDK,
...CASE_008_TEST_ECDSA_SDK,
...CASE_009_GET_EXECUTION_SHARES
]