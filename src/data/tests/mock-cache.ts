import { SavePurchases } from "@/domain"
import { CacheStore } from "../protocols/cache"

export class CacheStoreSpy implements CacheStore {
    actions: Array<CacheStoreSpy.Actions> = []
    deleteCallsCount = 0
    insertCallsCount = 0
    deleteKey: string = ''
    insertKey: string = ''
    insertValues: Array<SavePurchases.Params> = []

    delete(key: string): void {
        this.actions.push(CacheStoreSpy.Actions.DELETE)
        this.deleteCallsCount++
        this.deleteKey = key
    }

    insert(key: string, values: any): void {
        this.actions.push(CacheStoreSpy.Actions.INSERT)
        this.insertCallsCount++
        this.insertKey = key
        this.insertValues = values
    }

    simulateDeleteError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { 
            this.actions.push(CacheStoreSpy.Actions.DELETE)
            throw new Error() 
        })
    }

}

export namespace CacheStoreSpy {
    export enum Actions {
        INSERT,
        DELETE
    }
}

