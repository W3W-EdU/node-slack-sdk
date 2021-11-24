/* eslint-disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../WebClient';
export type ImOpenResponse = WebAPICallResult & {
  ok?:                boolean;
  channel?:           Channel;
  warning?:           string;
  response_metadata?: ResponseMetadata;
  no_op?:             boolean;
  already_open?:      boolean;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface Channel {
  id?: string;
}

export interface ResponseMetadata {
  messages?: string[];
  warnings?: string[];
}