
class DataService {
    observers = [];
    setNewData(newData) {
        this.observers.forEach(observer =>
            observer(newData)
        )
    }
    addObserver(observerCallback) {
        this.observers.push(observerCallback);
    }
}

let UserDataService = new DataService();

export default UserDataService;


