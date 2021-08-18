import { Test, TestingModule } from '@nestjs/testing';
import { StoreChainController } from './store-chain.controller';
import { StoreChainService } from './store-chain.service';
import { DatabaseModule } from '../database/database.module';
import { CategoryModule } from '../category/category.module';

describe('StoreChainController', () => {
  let controller: StoreChainController;
  let service: StoreChainService;
  const testStore = { id: 1, name: 'my-store' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, CategoryModule],
      controllers: [StoreChainController],
      providers: [StoreChainService],
    }).compile();

    controller = module.get<StoreChainController>(StoreChainController);
    service = module.get<StoreChainService>(StoreChainService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get item by id', async function () {
    const getSpy = jest.spyOn(service, 'get').mockResolvedValue(testStore);

    const result = await controller.get(testStore.id);

    expect(getSpy).toHaveBeenCalledWith(testStore.id);
    expect(result).toMatchObject(testStore);
  });

  it('should get all items paginated', async function () {
    const getAllSpy = jest
      .spyOn(service, 'getAll')
      .mockResolvedValue([testStore]);
    const take = 10;
    const skip = 0;

    const result = await controller.getAll(take, skip);

    expect(getAllSpy).toHaveBeenCalledWith(take, skip);
    expect(result).toHaveLength(1);
  });

  it('should create a new store', async function () {
    const name = 'new-store';
    const newStore = { ...testStore, name };
    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValue(newStore);

    const result = await controller.create(name);

    expect(createSpy).toHaveBeenCalledWith(name);
    expect(result).toMatchObject(newStore);
  });

  it('should update store', async function () {
    const name = 'updated-store';
    const updatedStore = { ...testStore, name };
    const updateSpy = jest
      .spyOn(service, 'update')
      .mockResolvedValue(updatedStore);

    const result = await controller.update(testStore.id, name);

    expect(updateSpy).toHaveBeenCalledWith(testStore.id, name);
    expect(result).toMatchObject(updatedStore);
  });

  it('should delete store', async function () {
    const deleteSpy = jest
      .spyOn(service, 'delete')
      .mockResolvedValue(testStore);

    const result = await controller.delete(testStore.id);

    expect(deleteSpy).toHaveBeenCalledWith(testStore.id);
    expect(result).toMatchObject(testStore);
  });
});
