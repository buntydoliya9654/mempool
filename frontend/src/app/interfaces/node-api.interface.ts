import { Block, Transaction } from "./electrs.interface";

export interface OptimizedMempoolStats {
  added: number;
  vbytes_per_second: number;
  total_fee: number;
  mempool_byte_weight: number;
  vsizes: number[];
}

interface Ancestor {
  txid: string;
  weight: number;
  fee: number;
}

interface BestDescendant {
  txid: string;
  weight: number;
  fee: number;
}

export interface CpfpInfo {
  ancestors: Ancestor[];
  descendants?: Ancestor[];
  bestDescendant?: BestDescendant | null;
  effectiveFeePerVsize?: number;
}

export interface TransactionExtras extends CpfpInfo {
  firstSeen?: number;
}

export interface DifficultyAdjustment {
  progressPercent: number;
  difficultyChange: number;
  estimatedRetargetDate: number;
  remainingBlocks: number;
  remainingTime: number;
  previousRetarget: number;
  nextRetargetHeight: number;
  timeAvg: number;
  timeOffset: number;
}

export interface AddressInformation {
  isvalid: boolean;                //  (boolean) If the address is valid or not. If not, this is the only property returned.
  isvalid_parent?: boolean;        //  (boolean) Elements only
  address: string;                 //  (string) The bitcoin address validated
  scriptPubKey: string;            //  (string) The hex-encoded scriptPubKey generated by the address
  isscript: boolean;               //  (boolean) If the key is a script
  iswitness: boolean;              //  (boolean) If the address is a witness
  witness_version?: number;        //  (numeric, optional) The version number of the witness program
  witness_program: string;         //  (string, optional) The hex value of the witness program
  confidential_key?: string;       //  (string) Elements only
  unconfidential?: string;         //  (string) Elements only
}

export interface LiquidPegs {
  amount: string;
  date: string;
}

export interface ITranslators { [language: string]: string; }

/**
 * PoolRanking component
 */
export interface SinglePoolStats {
  poolId: number;
  name: string;
  link: string;
  blockCount: number;
  emptyBlocks: number;
  rank: number;
  share: number;
  lastEstimatedHashrate: string;
  emptyBlockRatio: string;
  logo: string;
  slug: string;
}
export interface PoolsStats {
  blockCount: number;
  lastEstimatedHashrate: number;
  pools: SinglePoolStats[];
}

/**
 * Pool component
 */
export interface PoolInfo {
  id: number | null; // mysql row id
  name: string;
  link: string;
  regexes: string; // JSON array
  addresses: string; // JSON array
  emptyBlocks: number;
}
export interface PoolStat {
  pool: PoolInfo;
  blockCount: {
    all: number,
    '24h': number,
    '1w': number,
  };
  blockShare: {
    all: number,
    '24h': number,
    '1w': number,
  };
  estimatedHashrate: number;
  reportedHashrate: number;
  luck?: number;
}

export interface BlockExtension {
  totalFees?: number;
  medianFee?: number;
  feeRange?: number[];
  reward?: number;
  coinbaseTx?: Transaction;
  coinbaseRaw?: string;
  matchRate?: number;
  pool?: {
    id: number;
    name: string;
    slug: string;
  }

  stage?: number; // Frontend only
}

export interface BlockExtended extends Block {
  extras?: BlockExtension;
}

export interface BlockAudit extends BlockExtended {
  missingTxs: string[],
  addedTxs: string[],
  matchRate: number,
  template: TransactionStripped[],
  transactions: TransactionStripped[],
}

export interface TransactionStripped {
  txid: string;
  fee: number;
  vsize: number;
  value: number;
  status?: 'found' | 'missing' | 'fresh' | 'added' | 'censored' | 'selected';
}

export interface RewardStats {
  startBlock: number;
  endBlock: number;
  totalReward: number;
  totalFee: number;
  totalTx: number;
}

export interface AuditScore {
  hash: string;
  matchRate?: number;
}

export interface ITopNodesPerChannels {
  publicKey: string,
  alias: string,
  channels?: number,
  capacity: number,
  firstSeen?: number,
  updatedAt?: number,
  city?: any,
  country?: any,
  subdivision?: any,
  iso_code?: string,
  geolocation?: any;
}

export interface ITopNodesPerCapacity {
  publicKey: string,
  alias: string,
  capacity: number,
  channels?: number,
  firstSeen?: number,
  updatedAt?: number,
  city?: any,
  country?: any,
  subdivision?: any,
  iso_code?: string,
  geolocation?: any;
}

export interface INodesRanking {
  topByCapacity: ITopNodesPerCapacity[];
  topByChannels: ITopNodesPerChannels[];
}

export interface IOldestNodes {
  publicKey: string,
  alias: string,
  firstSeen: number,
  channels?: number,
  capacity: number,
  updatedAt?: number,
  city?: any,
  country?: any,
  subdivision?: any,
  iso_code?: string,
  geolocation?: any;
}

export interface IChannel {
  id: number;
  short_id: string;
  capacity: number;
  transaction_id: string;
  transaction_vout: number;
  closing_transaction_id: string;
  closing_reason: string;
  updated_at: string;
  created: string;
  status: number;
  node_left: INode,
  node_right: INode,
}


export interface INode {
  alias: string;
  public_key: string;
  channels: number;
  capacity: number;
  base_fee_mtokens: number;
  cltv_delta: number;
  fee_rate: number;
  is_disabled: boolean;
  max_htlc_mtokens: number;
  min_htlc_mtokens: number;
  updated_at: string;
  longitude: number;
  latitude: number;
  funding_balance?: number;
  closing_balance?: number;
}
