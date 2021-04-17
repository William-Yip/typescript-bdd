interface CacheStore {
    delete(key: string): void
}

class LocalSavePurchases {
    constructor(private readonly cacheStore: CacheStore) {}

    async save(): Promise<void> {
        this.cacheStore.delete('purchases')
    }

}

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0
    key: string = '' 

    delete(key: string): void {
        this.deleteCallsCount++
        this.key = key
    }

}

type SutTypes = {
    sut: LocalSavePurchases
    cacheStore: CacheStoreSpy
}

const makeSut = () :SutTypes =>  {
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
        await sut.save()
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.key).toBe('purchases')
    })
})