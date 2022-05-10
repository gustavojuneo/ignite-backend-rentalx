import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      category_id: "category",
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toHaveProperty("id");
  });

  it("should not be able to create a new car with existing license plate", () => {
    expect(async () => {
      const car = {
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        category_id: "category",
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
      };

      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = {
      name: "Car Available",
      description: "Description Car",
      daily_rate: 100,
      category_id: "category",
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated.available).toBe(true);
  });
});
