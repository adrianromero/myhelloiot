/*
MYHELLOIOT
Copyright (C)  2024 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Buffer } from "buffer";
import { TopicManager, SubscribeHandler } from "./MQTTContext";

export class Timing implements TopicManager {
    handler: number;
    subscriptions: SubscribeHandler[];
    constructor() {
        this.handler = 0;
        this.subscriptions = [];
    }
    disconnect() {
        window.clearInterval(this.handler);
        this.handler = 0;
    }
    connect() {
        window.clearInterval(this.handler);
        this.handler = window.setInterval(() => {
            const now = new Date().getTime();
            for (const s of this.subscriptions) {
                s.listener({
                    topic: s.topic,
                    message: Buffer.from(String(now)),
                    time: new Date().getTime(),
                    qos: 0,
                    retain: false,
                    dup: false,
                });
            }
        }, 100);
    }
    subscribe(subscription: SubscribeHandler): boolean {
        if (subscription.topic === "SYS://timing") {
            this.subscriptions.push(subscription);
            return true;
        }
        return false;
    }
    unsubscribe(subscription: SubscribeHandler): boolean {
        if (subscription.topic === "SYS://timing") {
            const inx: number = this.subscriptions.findIndex(
                s => s === subscription,
            );
            if (inx < 0) {
                throw new Error("Not subscribed");
            }
            this.subscriptions.splice(inx, 1);
            return true;
        }
        return false;
    }
    onMessage(): boolean {
        return false;
    }
}
