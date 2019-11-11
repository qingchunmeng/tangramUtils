import obj from '../../src/util/validate';

/* eslint-disable */
describe('validate', () => {
    // 每个测试用例执行前都会还原数据，所以下面两个测试可以通过。

    test('isEmpty', () => {
        // expect(obj.isEmpty()).toBeTruthy();
        expect(obj.isEmpty('')).toBeTruthy();
        expect(obj.isEmpty(null)).toBeTruthy();
        expect(obj.isEmpty(undefined)).toBeTruthy();
        expect(!obj.isEmpty(' ')).toBeTruthy();
        expect(!obj.isEmpty('123')).toBeTruthy();
        expect(!obj.isEmpty(123)).toBeTruthy();
        expect(!obj.isEmpty([])).toBeTruthy();
        expect(!obj.isEmpty({})).toBeTruthy();
    });

    test('isMobile', () => {
        expect(!obj.isMobile()).toBeTruthy();
        expect(obj.isMobile('')).toBeTruthy();
        expect(!obj.isMobile(null)).toBeTruthy();
        expect(!obj.isMobile(undefined)).toBeTruthy();
        expect(!obj.isMobile(' ')).toBeTruthy();
        expect(!obj.isMobile('123')).toBeTruthy();
        expect(!obj.isMobile(123)).toBeTruthy();
        expect(!obj.isMobile([])).toBeTruthy();
        expect(!obj.isMobile({})).toBeTruthy();
        expect(!obj.isMobile(22345678901)).toBeTruthy();
        expect(!obj.isMobile(123456789012)).toBeTruthy();
        expect(obj.isMobile(12345678901)).toBeTruthy();
        expect(obj.isMobile('12345678901')).toBeTruthy();
        expect(!obj.isMobile(' 12345678901')).toBeTruthy();
    });

    test('isTelLoose', () => {
        // expect(obj.isTelLoose()).toBe('电话格式不正确');
        // expect(obj.isTelLoose('')).toBeTruthy();
        // expect(obj.isTelLoose(null)).toBe('电话格式不正确');
        // expect(obj.isTelLoose(undefined)).toBe('电话格式不正确');
        // expect(obj.isTelLoose(' ')).toBe('电话格式不正确');
        // expect(obj.isTelLoose('123')).toBe('电话格式不正确');
        // expect(obj.isTelLoose(123)).toBe('电话格式不正确');
        // expect(obj.isTelLoose([])).toBe('电话格式不正确');
        // expect(obj.isTelLoose({})).toBe('电话格式不正确');
        // expect(obj.isTelLoose(22345678901)).toBe('电话格式不正确');
        // expect(obj.isTelLoose(123456789012)).toBe('电话格式不正确');
        expect(obj.isTelLoose(12345678901)).toBeTruthy();
        expect(obj.isTelLoose('12345678901')).toBeTruthy();
        // expect(obj.isTelLoose(' 12345678901')).toBe('电话格式不正确');
    });

    test('mobile', () => {
        expect(!obj.mobile()).toBeTruthy();
        expect(!obj.mobile(0)).toBeTruthy();
        expect(!obj.mobile(NaN)).toBeTruthy();
        expect(obj.mobile('')).toBeTruthy();
        expect(!obj.mobile(null)).toBeTruthy();
        expect(!obj.mobile(undefined)).toBeTruthy();
        expect(!obj.mobile(' ')).toBeTruthy();
        expect(!obj.mobile('123')).toBeTruthy();
        expect(!obj.mobile(123)).toBeTruthy();
        expect(!obj.mobile([])).toBeTruthy();
        expect(!obj.mobile({})).toBeTruthy();
        expect(!obj.mobile(22345678901)).toBeTruthy();
        expect(!obj.mobile(123456789012)).toBeTruthy();
        expect(!obj.mobile(15426789012)).toBeTruthy();
        expect(!obj.mobile(12345678901)).toBeTruthy();
        expect(!obj.mobile(11345678902)).toBeTruthy();
        expect(!obj.mobile(10345678921)).toBeTruthy();
        expect(!obj.mobile(' 12345678901')).toBeTruthy();
        expect(!obj.mobile('14667890173')).toBeTruthy();
        expect(!obj.mobile('16752378901')).toBeTruthy();
        expect(obj.mobile('13345678901')).toBeTruthy();
        expect(obj.mobile('17345678901')).toBeTruthy();
        expect(obj.mobile('18345678901')).toBeTruthy();
        expect(obj.mobile('19345678901')).toBeTruthy();
        expect(obj.mobile('16652378901')).toBeTruthy();
        expect(obj.mobile('14567890173')).toBeTruthy();
        expect(obj.mobile('14785678901')).toBeTruthy();
        expect(obj.mobile(15526789012)).toBeTruthy();
    });

    test('phone', () => {
        expect(!obj.phone()).toBeTruthy();
        expect(!obj.phone(0)).toBeTruthy();
        expect(!obj.phone(NaN)).toBeTruthy();
        expect(obj.phone('')).toBeTruthy();
        expect(!obj.phone(null)).toBeTruthy();
        expect(!obj.phone(undefined)).toBeTruthy();
        expect(!obj.phone(' ')).toBeTruthy();
        expect(!obj.phone('123')).toBeTruthy();
        expect(!obj.phone(123)).toBeTruthy();
        expect(!obj.phone([])).toBeTruthy();
        expect(!obj.phone({})).toBeTruthy();
        expect(!obj.phone(22345678901)).toBeTruthy();
        expect(!obj.phone(123456789012)).toBeTruthy();
        expect(obj.phone(15426789012)).toBeTruthy();
        expect(!obj.phone(12345678901)).toBeTruthy();
        expect(!obj.phone(11345678902)).toBeTruthy();
        expect(!obj.phone(10345678921)).toBeTruthy();
        expect(!obj.phone(' 12345678901')).toBeTruthy();
        expect(obj.phone('14667890173')).toBeTruthy();
        expect(obj.phone('16752378901')).toBeTruthy();
        expect(obj.phone('13345678901')).toBeTruthy();
        expect(obj.phone('17345678901')).toBeTruthy();
        expect(obj.phone('18345678901')).toBeTruthy();
        expect(obj.phone('19345678901')).toBeTruthy();
        expect(obj.phone('16652378901')).toBeTruthy();
        expect(obj.phone('14567890173')).toBeTruthy();
        expect(obj.phone('14785678901')).toBeTruthy();
        expect(obj.phone(15526789012)).toBeTruthy();
    });

    //判断测试是否是固话
 test('homeTel', () => {
    expect(!obj.homeTel()).toBeTruthy();
    expect(obj.homeTel('')).toBeTruthy();
    expect(!obj.homeTel(null)).toBeTruthy();
    expect(!obj.homeTel(undefined)).toBeTruthy();
    expect(!obj.homeTel(' ')).toBeTruthy();
    expect(!obj.homeTel('123')).toBeTruthy();
    expect(!obj.homeTel(123)).toBeTruthy();
    expect(!obj.homeTel([])).toBeTruthy();
    expect(!obj.homeTel({})).toBeTruthy();
    expect(!obj.homeTel(345678901)).toBeTruthy(); //9位固话不存在
    expect(!obj.homeTel(1234567890127)).toBeTruthy(); //13位固话不存在
    expect(!obj.homeTel('a010-67679910')).toBeTruthy();
    expect(!obj.homeTel('#010-67679910')).toBeTruthy();
    expect(!obj.homeTel('号010-67679910')).toBeTruthy();
    expect(!obj.homeTel('z67679910')).toBeTruthy();
    expect(!obj.homeTel('$67679910')).toBeTruthy();
    expect(!obj.homeTel(' 12345678901')).toBeTruthy();
    expect(obj.homeTel('027-89832076')).toBeTruthy();
    expect(obj.homeTel('0445-89832076')).toBeTruthy();
    expect(obj.homeTel('027-8982076')).toBeTruthy();
    expect(obj.homeTel('0445-7323206')).toBeTruthy();
    expect(obj.homeTel('01067679910')).toBeTruthy();
    expect(obj.homeTel('044589832076')).toBeTruthy();
    expect(obj.homeTel('0278982076')).toBeTruthy();
    expect(obj.homeTel('04457323206')).toBeTruthy();
    expect(obj.homeTel('67162855')).toBeTruthy(); //不带区号8位座机
    expect(obj.homeTel('5982076')).toBeTruthy(); //不带区号7位座机
});

//判断测试是否是中间为****格式的手机号
test('phoneNum', () => {
    expect(!obj.phoneNum()).toBeTruthy();
    expect(obj.phoneNum('')).toBeTruthy();
    expect(!obj.phoneNum(null)).toBeTruthy();
    expect(!obj.phoneNum(undefined)).toBeTruthy();
    expect(!obj.phoneNum(' ')).toBeTruthy();
    expect(!obj.phoneNum('123')).toBeTruthy();
    expect(!obj.phoneNum(123)).toBeTruthy();
    expect(!obj.phoneNum([])).toBeTruthy();
    expect(!obj.phoneNum({})).toBeTruthy();
    expect(!obj.phoneNum(22345678901)).toBeTruthy();
    expect(!obj.phoneNum('123*5678901')).toBeTruthy();
    expect(!obj.phoneNum('154**789012')).toBeTruthy();
    expect(!obj.phoneNum('123***78901')).toBeTruthy();
    expect(!obj.phoneNum('113*****902')).toBeTruthy();
    expect(!obj.phoneNum('103*5**7921')).toBeTruthy();
    expect(!obj.phoneNum(' 12345678901')).toBeTruthy();
    expect(!obj.phoneNum('193****901')).toBeTruthy();
    expect(!obj.phoneNum('103****901')).toBeTruthy();
    expect(!obj.phoneNum('113****901')).toBeTruthy();
    expect(!obj.phoneNum('123****901')).toBeTruthy();
    expect(!obj.phoneNum('143****8901')).toBeTruthy();
    expect(!obj.phoneNum('154****8901')).toBeTruthy();
    expect(!obj.phoneNum('168****8901')).toBeTruthy();
    expect(!obj.phoneNum('199****7901')).toBeTruthy();
    expect(!obj.phoneNum('223****8901')).toBeTruthy();
    expect(obj.phoneNum('173****8901')).toBeTruthy();
    expect(obj.phoneNum('183****8901')).toBeTruthy();
    expect(obj.phoneNum('133****8901')).toBeTruthy();
    expect(!obj.phoneNum('166****8901')).toBeTruthy();
    expect(obj.phoneNum('145****0173')).toBeTruthy();
    expect(obj.phoneNum('147****8901')).toBeTruthy();
    expect(obj.phoneNum('155****8901')).toBeTruthy();
    expect(obj.phoneNum('15583348901')).toBeTruthy();
    expect(!obj.phoneNum('1039296901')).toBeTruthy();
    expect(!obj.phoneNum('1135969901')).toBeTruthy();
    expect(!obj.phoneNum('1236858901')).toBeTruthy();
    expect(!obj.phoneNum('14383348901')).toBeTruthy();
    expect(!obj.phoneNum('15479988901')).toBeTruthy();
    expect(!obj.phoneNum('16279988901')).toBeTruthy();
    expect(obj.phoneNum('17302058901')).toBeTruthy();
    expect(obj.phoneNum('18911148901')).toBeTruthy();
    expect(!obj.phoneNum('19996267901')).toBeTruthy();

});

//判断测试是否为电话号码或座机
test('telOrPhone', () => {
        expect(!obj.telOrPhone()).toBeTruthy();
        expect(!obj.telOrPhone(0)).toBeTruthy();
        expect(!obj.telOrPhone(NaN)).toBeTruthy();
        expect(obj.telOrPhone('')).toBeTruthy();
        expect(!obj.telOrPhone(null)).toBeTruthy();
        expect(!obj.telOrPhone(undefined)).toBeTruthy();
        expect(!obj.telOrPhone(' ')).toBeTruthy();
        expect(!obj.telOrPhone('123')).toBeTruthy();
        expect(!obj.telOrPhone(123)).toBeTruthy();
        expect(!obj.telOrPhone([])).toBeTruthy();
        expect(!obj.telOrPhone({})).toBeTruthy();
        expect(obj.telOrPhone(22345678901)).toBeTruthy();//2开头的电话号码不存在但是座机可能存在
        expect(obj.telOrPhone(123456789012)).toBeTruthy();//12位的电话号码不存在但是座机可能存在
        expect(obj.telOrPhone(15426789012)).toBeTruthy();//154开头的电话号码不存在但是座机可能存在
        expect(obj.telOrPhone(12345678901)).toBeTruthy();//12开头的电话号码不存在但是座机可能存在
        expect(obj.telOrPhone(11345678902)).toBeTruthy();//11开头的电话号码不存在但是座机可能存在
        expect(obj.telOrPhone(10345678921)).toBeTruthy();//10开头的电话号码不存在但是座机可能存在
        expect(!obj.telOrPhone(' 12345678901')).toBeTruthy();
        expect(obj.telOrPhone('14667890173')).toBeTruthy(); //146开头的电话号码不存在但是座机可能存在
        expect(obj.telOrPhone('16752378901')).toBeTruthy();//167开头的电话号码不存在但是座机可能存在
        expect(obj.telOrPhone('13345678901')).toBeTruthy();
        expect(obj.telOrPhone('17345678901')).toBeTruthy();
        expect(obj.telOrPhone('18345678901')).toBeTruthy();
        expect(obj.telOrPhone('19345678901')).toBeTruthy();
        expect(obj.telOrPhone('16652378901')).toBeTruthy();
        expect(obj.telOrPhone('14567890173')).toBeTruthy();
        expect(obj.telOrPhone('14785678901')).toBeTruthy();
        expect(obj.telOrPhone(15526789012)).toBeTruthy();
        expect(!obj.telOrPhone(345678901)).toBeTruthy(); //9位固话不存在
        expect(!obj.telOrPhone(1234567890127)).toBeTruthy(); //13位固话不存在
        expect(!obj.telOrPhone('a010-67679910')).toBeTruthy();
        expect(!obj.telOrPhone('#010-67679910')).toBeTruthy();
        expect(!obj.telOrPhone('号010-67679910')).toBeTruthy();
        expect(!obj.telOrPhone('z67679910')).toBeTruthy();
        expect(!obj.telOrPhone('$67679910')).toBeTruthy();
        expect(obj.telOrPhone('027-89832076')).toBeTruthy();
        expect(obj.telOrPhone('0445-89832076')).toBeTruthy();
        expect(obj.telOrPhone('027-8982076')).toBeTruthy();
        expect(obj.telOrPhone('0445-7323206')).toBeTruthy();
        expect(obj.telOrPhone('01067679910')).toBeTruthy();
        expect(obj.telOrPhone('044589832076')).toBeTruthy();
        expect(obj.telOrPhone('0278982076')).toBeTruthy();
        expect(obj.telOrPhone('04457323206')).toBeTruthy();
        expect(obj.telOrPhone('67162855')).toBeTruthy(); //不带区号8位座机
        expect(obj.telOrPhone('5982076')).toBeTruthy(); //不带区号7位座机
    });

    test('isWeiXin isAndroid isIOS', () => {
        expect(!obj.isWeiXin()).toBeTruthy();
        expect(!obj.isAndroid()).toBeTruthy();
        expect(!obj.isIOS()).toBeTruthy();
        // 修改ua
        let ua = 'Mozilla/5.0 (Linux; Android 5.1; HUAWEI TAG-AL00 Build/HUAWEITAG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043622 Safari/537.36 MicroMessenger/6.6.1.1220(0x26060135) NetType/4G Language/zh_CN';
        Object.defineProperties(navigator, {
            userAgent: {
                value: ua,
                configurable: true,
                enumerable: true,
                writable: true
            }
        });
        expect(obj.isWeiXin()).toBeTruthy();
        expect(obj.isAndroid()).toBeTruthy();
        expect(!obj.isIOS()).toBeTruthy();
        navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_1 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B150 MicroMessenger/6.6.1 NetType/WIFI Language/zh_CN';
        expect(obj.isWeiXin()).toBeTruthy();
        expect(!obj.isAndroid()).toBeTruthy();
        expect(obj.isIOS()).toBeTruthy();
    });

    test('isWindow', () => {
        expect(!obj.isWindow({})).toBeTruthy();
        expect(!obj.isWindow(document)).toBeTruthy();
        expect(!obj.isWindow(document.createElement('div'))).toBeTruthy();
        expect(obj.isWindow(window)).toBeTruthy();
    });

    test('beforeToday',() => {
        expect(obj.beforeToday('ddddd')).toBeFalsy();
        expect(obj.beforeToday('1231233')).toBeFalsy();
        expect(obj.beforeToday('2019/2/3')).toBeTruthy();
        expect(obj.beforeToday('2019-2-3')).toBeTruthy();
        expect(obj.beforeToday(new Date())).toBeTruthy();
        expect(obj.beforeToday('2033-12-4')).toBeFalsy();
        expect(obj.beforeToday('Thu Aug 22 2019 17:29:46 GMT+0800 (中国标准时间)')).toBeTruthy();
        // 非法输入校验 指不是字符串、数字
        expect(obj.beforeToday([])).toBeFalsy();
        expect(obj.beforeToday({})).toBeFalsy();
        expect(obj.beforeToday(Symbol('123444324'))).toBeFalsy();
        expect(obj.beforeToday(Symbol('2019/2/3'))).toBeFalsy();
        expect(obj.beforeToday(' ')).toBeFalsy();
    })

    test('afterToday',() => {
        expect(obj.afterToday('ddddd')).toBeFalsy();
        expect(obj.afterToday('1231233')).toBeFalsy();
        expect(obj.afterToday('2019/2/3')).toBeFalsy();
        expect(obj.afterToday('2019-2-3')).toBeFalsy();
        expect(obj.afterToday(new Date())).toBeTruthy();
        expect(obj.afterToday('2033-12-4')).toBeTruthy();
        expect(obj.afterToday('Wed Aug 21 2019 17:29:46 GMT+0800 (中国标准时间)')).toBeFalsy();

        expect(obj.afterToday([])).toBeFalsy();
        expect(obj.afterToday({})).toBeFalsy();
        expect(obj.afterToday(Symbol('123444324'))).toBeFalsy();
        expect(obj.afterToday(Symbol('2019/2/3'))).toBeFalsy();
        expect(obj.afterToday(' ')).toBeFalsy();
    })

    test('beforeDate',() => {
        expect(obj.beforeDate('','2010-2-3')).toBeFalsy();
        expect(obj.beforeDate('2010-2-3')).toBeFalsy();
        expect(obj.beforeDate(new Date() - 1,new Date())).toBeTruthy();
        expect(obj.beforeDate('2019-2-3','2019-2-4')).toBeTruthy();
        expect(obj.beforeDate(new Date(),new Date())).toBeTruthy();
        expect(obj.beforeDate('2033-12-4','2013-12-4')).toBeFalsy();
        expect(obj.beforeDate('2010-2-3','2010/02/3')).toBeTruthy();
        expect(obj.beforeDate('2019-03-02T23:59:59','2019-03-02T23:59:59')).toBeTruthy();
        expect(obj.beforeDate('2019-03-02T23:59:59','2019-03-02')).toBeTruthy();
        expect(obj.beforeDate('2019-03-03T00:00:00','2019-03-02T23:59:59')).toBeFalsy();
        expect(obj.beforeDate('Thu Aug 22 2019 17:29:46 GMT+0800 (中国标准时间)','Wed Aug 21 2019 17:29:46 GMT+0800 (中国标准时间)' )).toBeFalsy();
        expect(obj.beforeDate([],"2033-12-4")).toBeFalsy();
        expect(obj.beforeDate({},[])).toBeFalsy();
        expect(obj.beforeDate('2010-2-3','2010/2/3')).toBeTruthy();
        expect(obj.beforeDate(Symbol('2019/2/3'), '')).toBeFalsy();
        expect(obj.beforeDate(' ', '2019-2-3')).toBeFalsy();
    })

    test('afterDate',() => {
        expect(obj.afterDate('ddddd')).toBeFalsy();
        expect(obj.afterDate('1231233','')).toBeFalsy();
        expect(obj.afterDate('2019/2/3','2019/2/3')).toBeTruthy();
        expect(obj.afterDate('2019/2/4','2019/2/3')).toBeTruthy();
        expect(obj.afterDate('2019/2/2','2019/2/3')).toBeFalsy();
        expect(obj.afterDate('2019-03-02','2019-03-02T23:59:59')).toBeTruthy();
        expect(obj.afterDate('2019-03-02T23:59:59','2019-03-02T23:59:59')).toBeTruthy();
        expect(obj.afterDate('2019-03-03T00:00:00','2019-03-02T23:59:59')).toBeTruthy();
        expect(obj.afterDate('Wed Aug 21 2019 17:29:46 GMT+0800 (中国标准时间)','Wed Aug 21 2019 17:29:46 GMT+0800 (中国标准时间)')).toBeTruthy();
        expect(obj.afterDate('2019-2-3',null)).toBeFalsy();
        expect(obj.afterDate(new Date(),new Date())).toBeTruthy();
        expect(obj.afterDate(new Date() + 2,new Date())).toBeTruthy();
        expect(obj.afterDate([],{})).toBeFalsy();
        expect(obj.afterDate(Symbol('123444324'),new Date())).toBeFalsy();
    })

    test('contractNumber',() => {
        expect(obj.contractNumber('ddddd')).toBeFalsy();
        expect(obj.contractNumber([0])).toBeFalsy();
        expect(obj.contractNumber([1])).toBeFalsy();
        expect(obj.contractNumber({})).toBeFalsy();
        expect(obj.contractNumber(null)).toBeFalsy();
        expect(obj.contractNumber(Date)).toBeFalsy();
        expect(obj.contractNumber(['C1234568'])).toBeFalsy();

        expect(obj.contractNumber('C1234568')).toBeTruthy();
        expect(obj.contractNumber('Cdfasdf7')).toBeTruthy();
        expect(obj.contractNumber('C123df92')).toBeTruthy();
        expect(obj.contractNumber('C1dd9812')).toBeTruthy();
        expect(obj.contractNumber('c1234568')).toBeFalsy();
        expect(obj.contractNumber('C12345682')).toBeFalsy();
    });

    test('dataRange', () => {
        expect(obj.dataRange('',[1,4])).toBeTruthy();
        expect(obj.dataRange(null,[2,4])).toBeTruthy();
        expect(obj.dataRange(undefined,[2,3])).toBeTruthy();
        expect(obj.dataRange(NaN,[2,3])).toBeTruthy();
        expect(!obj.dataRange('ll',[2,4])).toBeTruthy();
        expect(!obj.dataRange({},[3,7])).toBeTruthy();
        expect(!obj.dataRange(-2,[2,8])).toBeTruthy();
        expect(obj.dataRange(2,[2,8])).toBeTruthy();
        expect(obj.dataRange(5,[2,8])).toBeTruthy();
        expect(!obj.dataRange(20,[2,8])).toBeTruthy();
        expect(obj.dataRange(20,[2,8])).toBeFalsy();
        expect(obj.dataRange('3',[2,8])).toBeTruthy();
        expect(!obj.dataRange('A',[2,800])).toBeTruthy();
    });

    test('positiveInteger', () => {
        expect(obj.positiveInteger('')).toBeTruthy();
        expect(obj.positiveInteger(null)).toBeTruthy();
        expect(obj.positiveInteger(undefined)).toBeTruthy();
        expect(obj.positiveInteger(0)).toBeFalsy();
        expect(!obj.positiveInteger('ll')).toBeTruthy();
        expect(!obj.positiveInteger({})).toBeTruthy();
        expect(!obj.positiveInteger(-2)).toBeTruthy();
        expect(obj.positiveInteger(5)).toBeTruthy();
        expect(!obj.positiveInteger(20.5)).toBeTruthy();
        expect(obj.positiveInteger('3')).toBeTruthy();
        expect(!obj.positiveInteger('A')).toBeTruthy();
        expect(!obj.positiveInteger('@')).toBeTruthy();
        expect(!obj.positiveInteger('*')).toBeTruthy();
        expect(!obj.positiveInteger('^')).toBeTruthy();


    });

    test('positiveFloat', () => {
        expect(obj.positiveFloat('')).toBeTruthy();
        expect(obj.positiveFloat(0)).toBeFalsy();
        expect(obj.positiveFloat(null)).toBeTruthy();
        expect(obj.positiveFloat(undefined)).toBeTruthy();
        expect(!obj.positiveFloat('ll')).toBeTruthy();
        expect(!obj.positiveFloat({})).toBeTruthy();
        expect(!obj.positiveFloat(-2)).toBeTruthy();
        expect(obj.positiveFloat(5)).toBeTruthy();
        expect(obj.positiveFloat(20.5)).toBeTruthy();
        expect(obj.positiveFloat('3')).toBeTruthy();
        expect(!obj.positiveFloat('A')).toBeTruthy();
        expect(!obj.positiveFloat('...')).toBeTruthy();
    })

  test('nonNegativeInteger', () => {

    expect(obj.nonNegativeInteger('')).toBeTruthy();
    expect(obj.nonNegativeInteger(null)).toBeTruthy();
    expect(obj.nonNegativeInteger(undefined)).toBeTruthy();
    expect(obj.nonNegativeInteger(0)).toBeTruthy();
    expect(!obj.nonNegativeInteger('ll')).toBeTruthy();
    expect(!obj.nonNegativeInteger({})).toBeTruthy();
    expect(!obj.nonNegativeInteger(-2)).toBeTruthy();
    expect(obj.nonNegativeInteger(5)).toBeTruthy();
    expect(obj.nonNegativeInteger(20.8)).toBeFalsy();
    expect(obj.nonNegativeInteger('3')).toBeTruthy();
    expect(!obj.nonNegativeInteger('A')).toBeTruthy();
    expect(!obj.nonNegativeInteger('@')).toBeTruthy();
    expect(!obj.nonNegativeInteger('*')).toBeTruthy();
    expect(!obj.nonNegativeInteger('^')).toBeTruthy();


  });

  test('nonNegative', () => {
    expect(obj.nonNegative('')).toBeTruthy();
    expect(obj.nonNegative(null)).toBeTruthy();
    expect(obj.nonNegative(undefined)).toBeTruthy();
    expect(!obj.nonNegative('ll')).toBeTruthy();
    expect(!obj.nonNegative({})).toBeTruthy();
    expect(!obj.nonNegative(-2)).toBeTruthy();
    expect(obj.nonNegative(5)).toBeTruthy();
    expect(obj.nonNegative(20.5)).toBeTruthy();
    expect(obj.nonNegative('3')).toBeTruthy();
    expect(!obj.nonNegative('A')).toBeTruthy();
    expect(!obj.nonNegative('...')).toBeTruthy();
  })

    test('minValue', () => {
        expect(obj.minValue('',3)).toBeTruthy();
        expect(obj.minValue('',0)).toBeTruthy();
        expect(obj.minValue(null,4)).toBeTruthy();
        expect(obj.minValue(undefined,0)).toBeTruthy();
        expect(!obj.minValue('ll',6)).toBeTruthy();
        expect(!obj.minValue({},'a')).toBeTruthy();
        expect(!obj.minValue(-2,5)).toBeTruthy();
        expect(obj.minValue(5,3)).toBeTruthy();
        expect(obj.minValue(20.5,0.5)).toBeTruthy();
        expect(!obj.minValue(20,50)).toBeTruthy();
        expect(!obj.minValue('3',4)).toBeTruthy();
        expect(!obj.minValue('A','a')).toBeTruthy();
        expect(obj.minValue('a','A')).toBeTruthy();
    })

    test('maxValue', () => {
        expect(obj.maxValue('',3)).toBeTruthy();
        expect(obj.maxValue('',-1)).toBeTruthy();
        expect(obj.maxValue(null,4)).toBeTruthy();
        expect(obj.maxValue(undefined,-1)).toBeTruthy();
        expect(!obj.maxValue('ll',3)).toBeTruthy();
        expect(obj.maxValue(-2,4)).toBeTruthy();
        expect(obj.maxValue(5,6)).toBeTruthy();
        expect(obj.maxValue(20.5,20.5)).toBeTruthy();
        expect(!obj.maxValue('3',-3)).toBeTruthy();
        expect(!obj.maxValue('A',5)).toBeTruthy();
        expect(obj.maxValue('A','a')).toBeTruthy();
        expect(!obj.maxValue('a','A')).toBeTruthy();
    })

    //对比大于某个数字
    test('greaterThan', () => {
        expect(obj.greaterThan()).toBeTruthy();
        expect(obj.greaterThan(2, 1)).toBeTruthy();
        expect(!obj.greaterThan(2, 2)).toBeTruthy();
    })
    //对比小于某个数字
    test('lessThan', () => {
        expect(obj.lessThan()).toBeTruthy();
        expect(obj.lessThan(2, 3)).toBeTruthy();
        expect(!obj.lessThan(2, 2)).toBeTruthy();
    })
    //数字，年份(1800-3000之间)
    test('year', () => {
        expect(obj.year()).toBeTruthy();
        expect(obj.year(undefined)).toBeTruthy();
        expect(obj.year('')).toBeTruthy();
        expect(!obj.year('s234')).toBeTruthy();
        expect(!obj.year(1799)).toBeTruthy();
        expect(!obj.year(3001)).toBeTruthy();
        expect(obj.year(1800)).toBeTruthy();
        expect(obj.year(3000)).toBeTruthy();
        expect(obj.year(2000)).toBeTruthy();
    })
    // 特殊号码，校验身份证
    test('identityCard', () => {
        expect(obj.identityCard(undefined)).toBeTruthy();
        expect(obj.identityCard('')).toBeTruthy();
        expect(!obj.identityCard('123')).toBeTruthy();
        expect(!obj.identityCard(123)).toBeTruthy();
        expect(!obj.identityCard([])).toBeTruthy();
        expect(!obj.identityCard({})).toBeTruthy();
        expect(!obj.identityCard(22345678901)).toBeTruthy();
        expect(!obj.identityCard(421022122222220000)).toBeTruthy();
        expect(obj.identityCard(421022122222220000)).toBeFalsy();
        expect(obj.identityCard(411325199303242508)).toBeTruthy();
        // expect(obj.identityCard(421022450101123)).toBeTruthy();
        // expect(obj.identityCard('421022199303242508x')).toBeTruthy();
    })
    // 特殊字符-银行卡号
    test('bankCardNumber', () => {
        expect(obj.bankCardNumber('')).toBeTruthy();
        expect(obj.bankCardNumber(null)).toBeTruthy();
        expect(obj.bankCardNumber(undefined)).toBeTruthy();
        expect(obj.bankCardNumber(6216635555555555555)).toBeTruthy();
        expect(obj.bankCardNumber(62166355555555555551)).toBeFalsy();
    })

    test('equal', () => {
        expect(obj.equal(undefined, null)).toBeFalsy();
        expect(obj.equal({x:undefined}, null)).toBeFalsy();
        expect(obj.equal(123, 123)).toBeTruthy();
        expect(obj.equal(123, 321)).toBeFalsy();
        expect(obj.equal(123, '123')).toBeFalsy();
        expect(obj.equal(123, [123])).toBeFalsy();
        expect(obj.equal(123, { a: 123 })).toBeFalsy();
        expect(obj.equal(123, null)).toBeFalsy();
        expect(obj.equal(123, undefined)).toBeFalsy();
        expect(obj.equal('123', '123')).toBeTruthy();
        expect(obj.equal('123', '321')).toBeFalsy();
        expect(obj.equal('', '')).toBeTruthy();
        expect(obj.equal(' ', ' ')).toBeTruthy();
        expect(obj.equal('', ' ')).toBeFalsy();
        expect(obj.equal('123', [123])).toBeFalsy();
        expect(obj.equal('123', { a: 123 })).toBeFalsy();
        expect(obj.equal('123', null)).toBeFalsy();
        expect(obj.equal('123', undefined)).toBeFalsy();
        expect(obj.equal([123], [123])).toBeTruthy();
        expect(obj.equal([123], [321])).toBeFalsy();
        expect(obj.equal([], [])).toBeTruthy();
        expect(obj.equal([], {})).toBeFalsy();
        expect(obj.equal([], null)).toBeFalsy();
        expect(obj.equal([], undefined)).toBeFalsy();
        expect(obj.equal({}, {})).toBeTruthy();
        expect(obj.equal({ a: 123 }, { a: 123 })).toBeTruthy();
        expect(obj.equal({ a: 123 }, { a: 321 })).toBeFalsy();
        expect(obj.equal({}, null)).toBeFalsy();
        expect(obj.equal({}, undefined)).toBeFalsy();
        expect(obj.equal(null, null)).toBeTruthy();
        expect(obj.equal(undefined, null)).toBeFalsy();
        expect(obj.equal(undefined, undefined)).toBeTruthy();
    });

    test('same', () => {
        expect(obj.same(123, 123)).toBeTruthy();
        expect(obj.same(123, 321)).toBeFalsy();
        expect(obj.same(123, '123')).toBeTruthy();
        expect(obj.same(123, [123])).toBeTruthy();
        expect(obj.same(123, { a: 123 })).toBeFalsy();
        expect(obj.same(123, null)).toBeFalsy();
        expect(obj.same(123, undefined)).toBeFalsy();
        expect(obj.same('123', '123')).toBeTruthy();
        expect(obj.same('123', '321')).toBeFalsy();
        expect(obj.same('', '')).toBeTruthy();
        expect(obj.same(' ', ' ')).toBeTruthy();
        expect(obj.same('', ' ')).toBeFalsy();
        expect(obj.same('123', [123])).toBeTruthy();
        expect(obj.same('123', { a: 123 })).toBeFalsy();
        expect(obj.same('123', null)).toBeFalsy();
        expect(obj.same('123', undefined)).toBeFalsy();
        expect(obj.same([123], [123])).toBeFalsy();
        expect(obj.same([123], [321])).toBeFalsy();
        expect(obj.same([], [])).toBeFalsy();
        expect(obj.same([], {})).toBeFalsy();
        expect(obj.same([], null)).toBeFalsy();
        expect(obj.same([], undefined)).toBeFalsy();
        expect(obj.same({}, {})).toBeFalsy();
        expect(obj.same({ a: 123 }, { a: 123 })).toBeFalsy();
        expect(obj.same({ a: 123 }, { a: 321 })).toBeFalsy();
        expect(obj.same({}, null)).toBeFalsy();
        expect(obj.same({}, undefined)).toBeFalsy();
        expect(obj.same(null, null)).toBeTruthy();
        expect(obj.same(undefined, null)).toBeTruthy();
        expect(obj.same(undefined, undefined)).toBeTruthy();
    });

    test('char', () => {
        expect(obj.char(123)).toBeTruthy();
        expect(obj.char('123')).toBeTruthy();
        expect(obj.char('')).toBeTruthy();
        expect(obj.char('   ')).toBeFalsy();
        expect(obj.char('!@#$%^&*()')).toBeFalsy();
        expect(obj.char('中文')).toBeFalsy();
        expect(obj.char([])).toBeFalsy();
        expect(obj.char({})).toBeFalsy();
        expect(obj.char(undefined)).toBeTruthy();
        expect(obj.char(null)).toBeTruthy();
    });

    test('haveTwoChineseChar', () => {
        expect(obj.haveTwoChineseChar(123)).toBeFalsy();
        expect(obj.haveTwoChineseChar(null)).toBeFalsy();
        expect(obj.haveTwoChineseChar(undefined)).toBeFalsy();
        expect(obj.haveTwoChineseChar([])).toBeFalsy();
        expect(obj.haveTwoChineseChar({})).toBeFalsy();
        expect(obj.haveTwoChineseChar('')).toBeFalsy();
        expect(obj.haveTwoChineseChar('123')).toBeFalsy();
        expect(obj.haveTwoChineseChar('123字')).toBeFalsy();
        expect(obj.haveTwoChineseChar('123汉字')).toBeTruthy();
        expect(obj.haveTwoChineseChar('123中国汉字')).toBeTruthy();
    });

    test('illegalChar', () => {
        expect(obj.illegalChar(123)).toBeTruthy();
        expect(obj.illegalChar('123<')).toBeFalsy();
        expect(obj.illegalChar('123>')).toBeFalsy();
        expect(obj.illegalChar('123<>')).toBeFalsy();
        expect(obj.illegalChar('<')).toBeFalsy();
        expect(obj.illegalChar('>')).toBeFalsy();
        expect(obj.illegalChar('<>')).toBeFalsy();
        expect(obj.illegalChar(' ')).toBeTruthy();
        expect(obj.illegalChar(null)).toBeTruthy();
        expect(obj.illegalChar(undefined)).toBeTruthy();
        expect(obj.illegalChar([])).toBeTruthy();
        expect(obj.illegalChar({})).toBeTruthy();
    })
});
