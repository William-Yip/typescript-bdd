import { LocalSavePurchases } from '@/data/usecases'
import { mockPurchases, CacheStoreSpy } from '@/data/tests'


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