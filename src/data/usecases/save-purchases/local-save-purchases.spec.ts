import { LocalSavePurchases } from '@/data/usecases'
import { mockPurchases, CacheStoreSpy } from '@/data/tests'

type SutTypes = {
    sut: LocalSavePurchases
    cacheStore: CacheStoreSpy
}

const makeSut = ( timestamp: Date = new Date() ): SutTypes => {
    const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore, timestamp)
    return {
        sut,
        cacheStore
    }
}

test('Should not delete or save cache on sut.init', () => {
    const { cacheStore } = makeSut()
    expect(cacheStore.actions).toEqual([])
})

test('Should delete old cache on sut.save and with the given key', async () => {
    const { cacheStore, sut } = makeSut()
    await sut.save(mockPurchases())
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Actions.DELETE, CacheStoreSpy.Actions.INSERT])
    expect(cacheStore.deleteKey).toBe('purchases')
})

test('Should not insert new Cache data if delete fails', async () => {
    const { cacheStore, sut } = makeSut()
    cacheStore.simulateDeleteError()
    const promise = sut.save(mockPurchases())
    await expect(promise).rejects.toThrow()
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Actions.DELETE])
})

test('Should insert new Cache if delete succeeds', async () => {
    const timestamp = new Date()
    const { cacheStore, sut } = makeSut(timestamp)
    const purchases = mockPurchases()
    await sut.save(purchases)
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Actions.DELETE, CacheStoreSpy.Actions.INSERT])
    expect(cacheStore.insertKey).toBe('purchases')
    expect(cacheStore.insertValues).toEqual({
        timestamp,
        value: purchases
    })
})

test('Should throw if delete throws', () => {
    const { cacheStore, sut } = makeSut()
    const purchases = mockPurchases()
    cacheStore.simulateDeleteError()
    const promise = sut.save(purchases)
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Actions.DELETE])
    expect(promise).rejects.toThrow()
})