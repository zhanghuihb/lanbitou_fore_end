// const ENV = 'dev';
// const ENV = 'test';
const ENV = 'prod';

let baseUrl = {
  lanbitou: {
    dev: 'http://192.168.2.132:8080/lanbitou',
    // dev: 'http://192.168.0.104:8080/lanbitou',
    test: 'http://192.168.2.132:8080/lanbitou',
    prod: 'http://118.25.59.203:9080/lanbitou'
    // prod: 'http://www.zhanghuihb.com:9080/lanbitou'
  },
  user: {
    dev: 'http://192.168.2.132:8080/lanbitou',
    // dev: 'http://192.168.0.104:8081/lanbitou',
    test: 'http://192.168.2.132:8081/lanbitou',
    prod: 'http://118.25.59.203:9080/lanbitou'
    // prod: 'http://www.zhanghuihb.com:9080/lanbitou'
  }
};

const b = (c = 'lanbitou', e = 'dev') => {
  if (ENV !== 'dev') {
    return baseUrl[c][ENV];
  } else {
    return baseUrl[c][e];
  }
};

export default {
  lanbitou: {
    getConsumerInfos: b('lanbitou') +'/consumerInfo/getConsumerInfos',
    getAllCodes: b('lanbitou') + '/consumerCategory/getAllCodes',
    getConsumerInfoById: b('lanbitou') + '/consumerInfo/getConsumerInfoById',
    editConsumerInfo: b('lanbitou') + '/consumerInfo/editConsumerInfo',
    addConsumerInfo: b('lanbitou') + '/consumerInfo/addConsumerInfo',
    getAccountInfo: b('lanbitou') + '/consumerInfo/getAccountInfo',
    staticsConsumerInfoByMonth: b('lanbitou') + '/consumerInfo/staticsConsumerInfoByMonth'
  },
  user: {
    login: b('user') + '/user/skip/login',
    saveOpinion: b('user') + '/opinion/saveOpinion'
  }
}