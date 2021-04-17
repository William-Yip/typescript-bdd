interface CacheStore {
    delete(): void
}

class LocalSavePurchases {
    constructor(private readonly cacheStore: CacheStore) {}

    async save(): Promise<void> {
        this.cacheStore.delete()
    }

}

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0

    delete(): void {
        this.deleteCallsCount++
    }
}

describe('LocalSavePurchases', () => {
    test('Should not delete cache on sut.init', () => {
        const cacheStore = new CacheStoreSpy()
        new LocalSavePurchases(cacheStore)
        expect(cacheStore.deleteCallsCount).toBe(0)
    })
})

describe('LocalSavePurchases', () => {
    test('Should delete old cache on sut.save', async () => {
        const cacheStore = new CacheStoreSpy()
        const sut = new LocalSavePurchases(cacheStore)
        sut.save()
        expect(cacheStore.deleteCallsCount).toBe(1)
    })
})