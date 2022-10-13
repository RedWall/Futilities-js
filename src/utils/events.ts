//Don't blame me, this is from: https://eddieabbondanz.io/post/typescript/events/

/**
 * Event handler that can subscribe to a dispatcher.
 */
 export type EventHandler<E> = (event: E) => void;

 /**
  * Event that can be subscribed to.
  */
 export interface Event<E> {
     /**
      * Register a new handler with the dispatcher. Any time the event is
      * dispatched, the handler will be notified.
      * @param handler The handler to register.
      */
     bind(handler: EventHandler<E>): void;
 
     /**
      * Desubscribe a handler from the dispatcher.
      * @param handler The handler to remove.
      */
     unbind(handler: EventHandler<E>): void;
 }
 
 /**
  * Dispatcher that can propogate events to subscribers.
  */
 export class EventDispatcher<E> implements Event<E> {
     /**
      * The handlers that want to be notified when an event occurs.
      */
     private _handlers: EventHandler<E>[];
 
     /**
      * Create a new event dispatcher.
      */
     constructor() {
         this._handlers = [];
     }
 
     /**
      * Register a new handler with the dispatcher. Any time the event is
      * dispatched, the handler will be notified.
      * @param handler The handler to register.
      */
     public bind(handler: EventHandler<E>): void {
         this._handlers.push(handler);
     }
 
     /**
      * Desubscribe a handler from the dispatcher.
      * @param handler The handler to remove.
      */
     public unbind(handler: EventHandler<E>): void {
         for (let i = 0; i < this._handlers.length; i++) {
             if (this._handlers[i] === handler) {
                 this._handlers.splice(i, 1);
             }
         }
     }
 
     /**
     * Dispatch an event to all the subscribers.
     * @param event The data of the event that occured.
     */
     public dispatch(event: E): void {
         for (let handler of this._handlers) {
             handler(event);
         }
     }
 }