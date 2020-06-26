/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const user = [
            {
                name: 'kim',
                phonenum: '010-2222-3333',
                email: '1@naver.com'
            },
            {
                name: 'park',
                phonenum: '010-3333-3333',
                email: '2@naver.com'
            },
            {
                name: 'song',
                phonenum: '010-4444-4444',
                email: '3@naver.com'
            },
            {
                name: 'min',
                phonenum: '010-223-3333',
                email: '4@naver.com'
            },
            {
                name: 'choi',
                phonenum: '010-323-3333',
                email: '5@naver.com'
            },
        ];

        const report = [
            {
                reportType: 'book',// 1:book 2:bike
                user: 'kim',
                barcode: 'fn3o2o42j3o4j329nr23nfl2',
                timeStamp:Date.now,
                contexReport:"Test",
                status:"reported" // 1:reported 2:validated 3:compansated 4:rejected
            },
            {
                reportType: 'book',// 1:book 2:bike
                user: 'song',
                barcode: 'fn3fewfo2o42j3o4j329nr23nfl2',
                timeStamp:Date.now,
                contexReport:"Test",
                status:"reported" // 1:reported 2:validated 3:compansated 4:rejected
            },
            {
                reportType: 'bike',// 1:book 2:bike
                user: 'kim',
                barcode: 'fn3o2o42j3o4j3ff29nr23nfl2',
                timeStamp:Date.now,
                contexReport:"Test",
                status:"validated" // 1:reported 2:validated 3:compansated 4:rejected
            },
            {
                reportType: 'bike',// 1:book 2:bike
                user: 'song',
                barcode: 'fffn3o2o42j3o4j329nr23nfl2',
                timeStamp:Date.now,
                contexReport:"Test",
                status:"reported" // 1:reported 2:validated 3:compansated 4:rejected
            },
        ];
        for (let i = 0; i < user.length; i++) {
            user[i].docType = 'user';
            await ctx.stub.putState('USER' + i, Buffer.from(JSON.stringify(user[i])));
            console.info('Added <--> ', user[i]);
        }

        for (let i = 0; i < report.length; i++) {
            report[i].docType = 'report';
            await ctx.stub.putState('REPORT' + i, Buffer.from(JSON.stringify(report[i])));
            console.info('Added <--> ', report[i]);
        } 
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryUser(ctx, userName) {
        const userAsBytes = await ctx.stub.getState(userName); // get the car from chaincode state
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${userName} does not exist`);
        }
        console.log(userAsBytes.toString());
        return userAsBytes.toString();
    }

    async queryReport(ctx, reportType) {
        const reportAsBytes = await ctx.stub.getState(reportType); // get the car from chaincode state
        if (!reportAsBytes || reportAsBytes.length === 0) {
            throw new Error(`${reportType} does not exist`);
        }
        console.log(userAsBytes.toString());
        return reportAsBytes.toString();
    }
    async createReport(ctx, reportType, user, barcode, timeStamp,contexReport, status ) {
        console.info('============= START : Create User ===========');

        const report = {
            reportType,
            user,
            barcode,
            timeStamp,
            contexReport,
            status
        };

        await ctx.stub.putState(reportType, Buffer.from(JSON.stringify(report)));
        console.info('============= END : Create REPORT ===========');
    }


    async createUser(ctx, userName, name, phonenum, email) {
        console.info('============= START : Create User ===========');

        const user = {
            name,
            docType: 'user',
            phonenum,
            email,
        };

        await ctx.stub.putState(userName, Buffer.from(JSON.stringify(user)));
        console.info('============= END : Create USER ===========');
    }
    async queryAllUsers(ctx) {
        const startKey = 'USER0';
        const endKey = 'USER999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async queryAllReports(ctx) {
        const startKey = 'REPORT0';
        const endKey = 'REPORT999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = FabCar;
