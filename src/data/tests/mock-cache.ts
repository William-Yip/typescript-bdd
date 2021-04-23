import { SavePurchases } from "@/domain"
import { CacheStore } from "../protocols/cache"

export class CacheStoreSpy implements CacheStore {
    actions: Array<CacheStoreSpy.Actions> = []
    deleteKey: string = ''
    insertKey: string = ''
    insertValues: Array<SavePurchases.Params> = []

    delete(key: string): void {
        this.actions.push(CacheStoreSpy.Actions.DELETE)
        this.deleteKey = key
    }

    insert(key: string, values: any): void {
        this.actions.push(CacheStoreSpy.Actions.INSERT)
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