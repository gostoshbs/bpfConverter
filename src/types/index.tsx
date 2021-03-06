import {Action} from 'redux';

import {
  DmEvent,
  DmState
} from '@brightsign/bsdatamodel';

import { HState } from '../HSM/HSM';

import DataFeed from '../entities/dataFeed';
import MRSSDataFeedItem from '../entities/mrssDataFeedItem';

export interface ActionWithPayload extends Action {
  payload : any;
}

export type ArDataFeedLUT = { [ dataFeedId: string ] : DataFeed };
export interface DataFeedShape  {
  dataFeedsById : ArDataFeedLUT
};

export type ArMrssDataFeedItemLUT = { [ dataFeedId: string ] : MRSSDataFeedItem };
export interface MrssDataFeedItemShape  {
  mrssDataFeedItemsByFeedId : ArMrssDataFeedItemLUT
};

export interface ArEventType {
  EventType : string;
  data? : any;
  EventData? : any;
}

export interface HSMStateData {
  nextState : HState;
}

export type ARMediaStateLUT = { [ zoneId : string] : string };
export type ActiveMediaStatesShape = {
  activeMediaStateIdByZone : ARMediaStateLUT
};

export type StateMachineShape = { playbackState : string };

export interface ArState {
  bsdm : DmState;
  stateMachine : StateMachineShape;
  activeMediaStates : ActiveMediaStatesShape;
  dataFeeds : DataFeedShape;
  mrssDataFeedItems : MrssDataFeedItemShape;
}

export interface ArSyncSpecHash {
  method : string;
  hex : string;
}

export interface ArSyncSpecDownload {
  name : string;
  hash : ArSyncSpecHash;
  size : number;
  link : string;
}

export interface ArSyncSpecFiles {
  download : ArSyncSpecDownload[];
  ignore : any;
  delete : any;
}

export interface ArSyncSpec {
  meta : any;
  files : any;
}

export type ArFileLUT = { [fileName:string]: string };

export type LUT = { [key: string] : any };

export type SubscribedEvents = { [ eventKey : string] : HState}

// not working yet
// https://basarat.gitbooks.io/typescript/docs/types/index-signatures.html
// issues with mediaContent, mediaThumbnail, and indexing in general
export interface MediaProps {
  [key : string]: string;
  mediaContent: string;
  mediaThumbnail: string;
}

export interface FeedItem {
  guid : string;
  url : string;
  title : string;
  description : string;
  duration : any;
  fileSize : any;
  medium : string;
  type : string;
  thumbnailUrl : string;
  pubDate : string;
  mediaProps : MediaProps;
}

export enum TextWidgetRotation {
  Rotate_0 = 0,
  Rotate_90 = 3,
  Rotate_180 = 2,
  Rotate_270 = 1
};

export enum TextWidgetAlignment {
  AlignCenter = 1,
  AlignRight = 2,
  AlignLeft = 0
};

