import { CacheStore } from '@/data/protocols/cache'
import { SavePurchases } from '@/domain/usecases/save-purchases'
import { LocalSavePurchases } from './local-save-purchases'

class CacheStoreSpy implements CacheStore {
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


const mockPurchases = (): Array<SavePurchases.Params> =>
    [
        {
            id: '1',
            date: new Date(),
            value: 20
        },
        {
            id: '2',
            date: new Date(),
            value: 40
        }
    ]

type SutTypes = {
    sut: LocalSavePurchases
    cacheStore: CacheStoreSpy
}

const makeSut = (): SutTypes => {
    const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore)
    return {
        sut,
        cacheStore
    }
}

describe('LocalSavePurchases', () => {
    test('Should not delete cache on sut.init', () => {
        const { cacheStore } = makeSut()
        expect(cacheStore.deleteCallsCount).toBe(0)
    })
})

describe('LocalSavePurchases', () => {
    test('Should delete old cache on sut.save and with the given key', async () => {
        const { cacheStore, sut } = makeSut()
        await sut.save(mockPurchases())
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.deleteKey).toBe('purchases')
    })
})

describe('LocalSavePurchases', () => {
    test('Should not insert new Cache data if delete fails', async () => {
        const { cacheStore, sut } = makeSut()
        cacheStore.simulateDeleteError()
        const promise = sut.save(mockPurchases())
        expect(cacheStore.insertCallsCount).toBe(0)
        expect(promise).rejects.toThrow()
    })
})

describe('LocalSavePurchases', () => {
    test('Should insertt new Cache if delete succeeds', async () => {
        const { cacheStore, sut } = makeSut()
        await sut.save(mockPurchases())
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.insertCallsCount).toBe(1)
        expect(cacheStore.insertKey).toBe('purchases')
    })
})


describe('LocalSavePurchases', () => {
    test('Should insert new Cache if delete succeeds', async () => {
        const { cacheStore, sut } = makeSut()
        const purchases = mockPurchases()
        await sut.save(purchases)
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.insertCallsCount).toBe(1)
        expect(cacheStore.insertValues).toBe(purchases)
    })
})