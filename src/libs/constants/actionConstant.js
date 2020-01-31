export const SAVE_QUERY_STATE = 'SAVE_QUERY_STATE';
export const SAVE_OBJECT_SURFFING_STATE = 'SAVE_OBJECT_SURFFING_STATE';

export const ACTION_STATES = [
  SAVE_QUERY_STATE,
  SAVE_OBJECT_SURFFING_STATE,
];

const CAN_CREATE = 'c';
const CAN_READ = 'r';
const CAN_UPDATE = 'u';
const CAN_DELETE = 'd';

const CAN_SEND = 's';
const CAN_APPROVE = 'a';
const CAN_PROCESS = 'p';
const CAN_FINISH = 'f';

const CAN_EXPORT = 'e';

export const ACTION = {
  CAN_CREATE,
  CAN_READ,
  CAN_UPDATE,
  CAN_DELETE,

  CAN_SEND,
  CAN_APPROVE,
  CAN_PROCESS,
  CAN_FINISH,

  CAN_EXPORT,
};
