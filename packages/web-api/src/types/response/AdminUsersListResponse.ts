/* eslint-disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type AdminUsersListResponse = WebAPICallResult & {
  error?:             string;
  needed?:            string;
  ok?:                boolean;
  provided?:          string;
  response_metadata?: ResponseMetadata;
  users?:             User[];
};

export interface ResponseMetadata {
  messages?:    string[];
  next_cursor?: string;
}

export interface User {
  email?:               string;
  expiration_ts?:       number;
  id?:                  string;
  is_admin?:            boolean;
  is_bot?:              boolean;
  is_owner?:            boolean;
  is_primary_owner?:    boolean;
  is_restricted?:       boolean;
  is_ultra_restricted?: boolean;
}