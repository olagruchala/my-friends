import React from 'react';
import StatusCreate from "./StatusCreate";
import StatusAdded from "./StatusAdded";

describe('StatusCreate component', () => {

    let statusCreateWrapper;
    let statusCreateInstance;

    beforeEach(() => {
        statusCreateWrapper = shallow(<StatusCreate />);
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

    describe('the sendStatus method', () => {

        const functionWritingStatus = () => {
            statusCreateWrapper.find('textarea').simulate('change', {target: {value: 'Test status'}});
            statusCreateWrapper.find('button').simulate('click');
        };

        // const mockStatusData = {
        //   "id" : 1,
        //   "txtValue" : "Test status",
        //   "date" : "2019-06-25T08:45:44.130Z",
        //   "name" : "Kacper",
        //   "email" : "ghost@gmail.com",
        //   "color" : "#F7AC13"
        // };

        it('should be executed after Send button click', () => {
            const sendStatusSpy = jest.spyOn(StatusCreate.prototype, 'sendStatus');
            statusCreateWrapper = shallow(<StatusCreate />); // repeated shallow after spy
            functionWritingStatus();
            expect(sendStatusSpy).toHaveBeenCalled();
            sendStatusSpy.mockRestore();
        });

        it('checks if textarea is not empty', () => {

        });

        it('creates statusData object', () => {
            expect().toEqual();
        });

        it('adds statusData object to beginning of this.state.statusArr', () => {

        });

        it('sets state.letters to 0', () => {
            functionWritingStatus();
            expect(statusCreateInstance.state.letters).toEqual(0);
        });

        it('sets state.textareaValue to empty string', () => {
            functionWritingStatus();
            expect(statusCreateInstance.state.textareaValue).toEqual('');
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



