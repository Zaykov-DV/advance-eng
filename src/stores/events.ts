import {defineStore} from 'pinia'
import axios from "axios";
interface IEvent {
    id: number,
    name: string,
    address: string,
    date: Date,
    status: string,
    comment?: string
}
export const useEventStore = defineStore('eventStore', {
    state: (): { baseURL: string, events: IEvent[] } => ({
        baseURL: 'http://localhost:3000',
        events: [],
    }),
    actions: {
        async getEvents(): Promise<void> {
            await axios.get(this.baseURL + '/events/')
                .then(res => {
                    this.events = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        async deleteEvent(id: number): Promise<void> {
            await axios.delete(this.baseURL + `/events/${id}`)
                .then(response => {
                    console.log('Resource deleted successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error deleting resource:', error);
                })
                .then(() => {
                    this.getEvents()
                })
        },
        async addEvent(data: IEvent): Promise<void> {
            await axios.post(`http://localhost:3000/events`, {
                ...data,
                status: "Новый",
                date: new Date().toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'})
            }).then(() => {
                this.getEvents()
            })
        },
        async changeStatus(id: number): Promise<void> {
            await axios.patch(this.baseURL + `/events/${id}`, {
                status: "Выполнен"
            })
                .then(() => {
                    this.getEvents()
                })
        }
    }
})
