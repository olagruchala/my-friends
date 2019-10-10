import React from 'react';
import StatusCreate from "./StatusCreate";
import StatusAdded from "./StatusAdded";

let testName = "Franek";
let testEmail = "franek@dolas.com";

describe('StatusCreate component', () => {

    let statusCreateWrapper;
    let statusCreateInstance;

    beforeEach(() => {
        statusCreateWrapper = shallow(<StatusCreate maxLetters={300} name={testName} email={testEmail}/>);
        statusCreateInstance = statusCreateWrapper.instance();
    });

    afterEach(() => {
        statusCreateWrapper = undefined;
        statusCreateInstance = undefined;
    });

    it('renders StatusAdded component', () => {
        expect(statusCreateWrapper.find(StatusAdded).length)
            .toBe(1);
    });

    describe('the storeStatus method', () => {

        afterEach(() => {
            localStorage.clear();
        });
        const functionWritingStatus = () => {
            statusCreateWrapper.find('textarea').simulate('change', {target: {value: 'Test status'}});
            statusCreateWrapper.find('button').simulate('click');
        };

        it('should be executed after Send button click', () => {
            const storeStatusSpy = jest.spyOn(StatusCreate.prototype, 'storeStatus');
            statusCreateWrapper = shallow(<StatusCreate maxLetters={300} name={testName} email={testEmail}/>); // repeated shallow after spy
            functionWritingStatus();
            expect(storeStatusSpy).toHaveBeenCalled();
            storeStatusSpy.mockRestore();
        });

        it('checks if the textarea is cleared after clicking the "send" button', () => {
            statusCreateWrapper.find('textarea').simulate('change', {target: {value: 'Test status'}});
            expect(statusCreateInstance.state.textareaValue.length).toEqual(11);
            statusCreateWrapper.find('button').simulate('click');
            expect(statusCreateInstance.state.textareaValue.length).toEqual(0);
        });

        it('checks if number of characters allowed in status is cleared after clicking the "send" button', () => {
            functionWritingStatus();
            expect(statusCreateInstance.state.letters).toEqual(0);
        });

        it('sets new data to localStorage', () => {
            const colorArr = ["#E84291", "#F7AC13", "#2192A6", "#191E44", "#123E92"];
            functionWritingStatus();
            const resultStorage = JSON.parse(localStorage.getItem('statuses'));
            let resultUser1 = resultStorage[0];

            expect(resultUser1.id).toEqual(1);
            expect(resultUser1.name).toEqual(testName);
            expect(resultUser1.email).toEqual(testEmail);
            expect(colorArr).toContain(resultUser1.color);
            expect(Date.parse(resultUser1.date)).not.toBeFalsy();
        });

        it('sets state.textareaValue to empty string', () => {
            functionWritingStatus();
            expect(statusCreateInstance.state.textareaValue).toEqual('');
        });

        it('should not store the status if status is empty', () => {
            const localStorageBeforeStoreStatus = localStorage.getItem('statuses');
            statusCreateWrapper.find('textarea').simulate('change', {target: {value: ''}});
            expect(statusCreateInstance.state.textareaValue.length).toEqual(0);
            statusCreateWrapper.find('button').simulate('click');
            expect(localStorage.getItem('statuses')).toEqual(localStorageBeforeStoreStatus);
        });

        it('should allow sending status when user is not logged in (user is "unknown") ', () => {
            const localStorageBeforeStoreStatus = localStorage.getItem('statuses');
            statusCreateWrapper = shallow(<StatusCreate maxLetters={300} name={"unknown"} email={"unknown"}/>);
            statusCreateInstance = statusCreateWrapper.instance();
            functionWritingStatus();
            const localStorageAfterStoreStatus = localStorage.getItem('statuses');
            expect(localStorageAfterStoreStatus).not.toEqual(localStorageBeforeStoreStatus);
        });
    });

    //todo:

    // describe('the rendered <StatusAdded/>', () => {
    //   const statusAdded = () => statusCreateWrapper.find(StatusAdded);
    //
    //   it('receives this.state.statusArr.date as a "date" prop', () => {
    //     expect(statusAdded().prop('date')).toEqual(statusCreateWrapper.state('statusArr').date);
    //   });
    //
    //   it('recives this.state.statusArr.name as a "name" prop', () => {
    //     expect(statusAdded().prop('name')).toEqual(statusCreateWrapper.state('statusArr').name);
    //   });
    //
    //   it('receives this.state.statusArr.length as a "id" prop', () => {
    //     expect(statusAdded().prop('id')).toEqual(statusCreateWrapper.state('statusArr').length);
    //   });
    // })

});



