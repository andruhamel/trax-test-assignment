import { Test, TestingModule } from '@nestjs/testing';
import { MlModelController } from './ml-model.controller';
import { DatabaseModule } from '../database/database.module';
import { MlModelService } from './ml-model.service';

describe('MlModelController', () => {
  let controller: MlModelController;
  let service: MlModelService;
  const testModel = { id: 1, url: 'url', createdAt: new Date(), categoryId: 2 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [MlModelController],
      providers: [MlModelService],
    }).compile();

    controller = module.get<MlModelController>(MlModelController);
    service = module.get<MlModelService>(MlModelService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get item by id', async function () {
    const getSpy = jest.spyOn(service, 'get').mockResolvedValue(testModel);

    const result = await controller.get(testModel.id);

    expect(getSpy).toHaveBeenCalledWith(testModel.id);
    expect(result).toMatchObject(testModel);
  });

  it('should get all items paginated', async function () {
    const getAllSpy = jest
      .spyOn(service, 'getAll')
      .mockResolvedValue([testModel]);
    const take = 10;
    const skip = 0;

    const result = await controller.getAll(take, skip);

    expect(getAllSpy).toHaveBeenCalledWith(take, skip);
    expect(result).toHaveLength(1);
  });

  it('should create a new model', async function () {
    const url = 'new-model';
    const categoryId = 3;
    const newModel = { ...testModel, categoryId, url };
    const createSpy = jest.spyOn(service, 'create').mockResolvedValue(newModel);

    const result = await controller.create(categoryId, url);

    expect(createSpy).toHaveBeenCalledWith(categoryId, url);
    expect(result).toMatchObject(newModel);
  });

  it('should update model', async function () {
    const url = 'updated-model';
    const updatedModel = { ...testModel, url };
    const updateSpy = jest
      .spyOn(service, 'update')
      .mockResolvedValue(updatedModel);

    const result = await controller.update(testModel.id, url);

    expect(updateSpy).toHaveBeenCalledWith(testModel.id, url);
    expect(result).toMatchObject(updatedModel);
  });

  it('should delete model', async function () {
    const deleteSpy = jest
      .spyOn(service, 'delete')
      .mockResolvedValue(testModel);

    const result = await controller.delete(testModel.id);

    expect(deleteSpy).toHaveBeenCalledWith(testModel.id);
    expect(result).toMatchObject(testModel);
  });
});
