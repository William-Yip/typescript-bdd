import { SavePurchases } from "@/domain"
import { CacheStore } from "../protocols/cache"

export class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0
    insertCallsCount = 0
    deleteKey: string = ''
    insertKey: string = ''
    insertValues: Array<SavePurchases.Params> = []

    delete(key: string): void {
        this.deleteCallsCount++
        this.deleteKey = key
    }

    insert(key: string, values: any): void {
        this.insertCallsCount++
        this.insertKey = key
        this.insertValues = values
    }

    simulateDeleteError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { throw new Error() })
    }

}