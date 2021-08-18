import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../database/database.module';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;
  const testCategory = { id: 1, name: 'my-category' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get item by id', async function () {
    const getSpy = jest.spyOn(service, 'get').mockResolvedValue(testCategory);

    const result = await controller.get(testCategory.id);

    expect(getSpy).toHaveBeenCalledWith(testCategory.id);
    expect(result).toMatchObject(testCategory);
  });

  it('should get all items paginated', async function () {
    const getAllSpy = jest
      .spyOn(service, 'getAll')
      .mockResolvedValue([testCategory]);
    const take = 10;
    const skip = 0;

    const result = await controller.getAll(take, skip);

    expect(getAllSpy).toHaveBeenCalledWith(take, skip);
    expect(result).toHaveLength(1);
  });

  it('should create a new category', async function () {
    const name = 'new-category';
    const newCategory = { ...testCategory, name };
    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValue(newCategory);

    const result = await controller.create(name);

    expect(createSpy).toHaveBeenCalledWith(name);
    expect(result).toMatchObject(newCategory);
  });

  it('should update category', async function () {
    const name = 'updated-category';
    const updatedCategory = { ...testCategory, name };
    const updateSpy = jest
      .spyOn(service, 'update')
      .mockResolvedValue(updatedCategory);

    const result = await controller.update(testCategory.id, name);

    expect(updateSpy).toHaveBeenCalledWith(testCategory.id, name);
    expect(result).toMatchObject(updatedCategory);
  });

  it('should delete category', async function () {
    const deleteSpy = jest
      .spyOn(service, 'delete')
      .mockResolvedValue(testCategory);

    const result = await controller.delete(testCategory.id);

    expect(deleteSpy).toHaveBeenCalledWith(testCategory.id);
    expect(result).toMatchObject(testCategory);
  });
});
