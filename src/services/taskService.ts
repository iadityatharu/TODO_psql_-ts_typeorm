import { Repository } from "typeorm";
import { Task } from "../entity/task";
import { AppDataSource } from "../source";

export class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  // Get all tasks
  public async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }
  // Get a task by id
  public async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id });
  }
  // Create a new task
  public async createTask(title: string, description: string): Promise<string> {
    const task = new Task();
    task.title = title;
    task.description = description;
    await this.taskRepository.save(task);
    return "Data inserted successfully";
  }
  // Update a task
  public async updateTask(
    id: number,
    updates: Partial<Task>
  ): Promise<Task | null> {
    const task = await this.getTaskById(id);
    if (!task) {
      return null;
    }
    Object.assign(task, updates);
    return await this.taskRepository.save(task);
  }
  // Delete a task
  public async deleteTask(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected !== 0;
  }
}
