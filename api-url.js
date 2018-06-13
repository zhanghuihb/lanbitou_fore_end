const ENV = 'dev';
// const ENV = 'test';
// const ENV = 'prod';

let baseUrl = {
  lanbitou: {
    dev: 'http://192.168.2.132:8080/lanbitou',
    test: 'http://192.168.2.132:8080/lanbitou',
    prod: 'http://192.168.2.132:8080/lanbitou'
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
    login: b('lanbitou') + '/user/skip/login',
    getConsumerInfos: b('lanbitou') +'/consumerInfo/getConsumerInfos'
  }
}