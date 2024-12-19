export enum DataTransferTypeEnum { // utilisé pour savoir de quel type est l'élément obtenu après drag & drop
  TASK = 'task',
  TIMER = 'timer'
}

export class DataTransferType {

  private static getDataTransferTypeEnumFromString(type: string): DataTransferTypeEnum {
    switch (type.toLowerCase()) {
      case 'task':
        return DataTransferTypeEnum.TASK;
      case 'timer':
        return DataTransferTypeEnum.TIMER;
      default:
        throw new Error(`Type inconnu : ${type}`);
    }
  }

  static isTask(type: string) {
    return DataTransferType.getDataTransferTypeEnumFromString(type) === DataTransferTypeEnum.TASK;
  }

  static isTimer(type: string) {
    return DataTransferType.getDataTransferTypeEnumFromString(type) === DataTransferTypeEnum.TIMER;
  }
}

