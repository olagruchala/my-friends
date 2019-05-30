class DataService {
    observers = [];

    setNewData(newData) {
        console.log("newData: ");
        console.log(newData);
        this.observers.forEach(observer =>
            observer(newData)
        )
    }

    addObserver(observerCallback) {
        this.observers.push(observerCallback);
    }
}

export let UserDataService = new DataService();

export let CommentDataObserver = new DataService();