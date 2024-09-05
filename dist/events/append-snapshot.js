class AppendSnapshotEvent extends CustomEvent {
    constructor(init) {
        super(AppendSnapshotEvent.eventName, init);
        this.init = init;
    }
}
AppendSnapshotEvent.eventName = 'append-snapshot';
export default AppendSnapshotEvent;
//# sourceMappingURL=append-snapshot.js.map