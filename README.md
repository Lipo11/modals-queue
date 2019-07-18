# Modals queue
Simple no dependencies queue library for modals and etc... The best usage is for task which should run after another task.

### Installing
```
npm install modals-queue --save
- or -
yarn add modals-queue
```

### Usage
```
const queue = require('modals-queue');

queue.showModal( ( modal_id ) =>
{
    //Your logic here and if the modal has ended you should call
    queue.onModalClosed( modal_id );
}, flow_id/*optional*/);

//Cancel all modals for flow_id
queue.cancelModals( flow_id );
```
### API

#### showModal( callback, flow_id )
Show modal, first param is callback with modal id and second is optional for your flow id.
#### onModalClosed( modal_id )
Close the modal.
#### cancelModals( flow_id )
Cancel all modals for flow_id. You don't have to insert the flow_id, but then all modals will be canceled.