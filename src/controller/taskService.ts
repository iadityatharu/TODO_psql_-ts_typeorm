import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public getTasks = async (req: Request, res: Response): Promise<void> => {
    const tasks = await this.taskService.getAllTasks();
    res.json(tasks);
  };

  public getTask = async (req: Request, res: Response): Promise<void> => {
    const task = await this.taskService.getTaskById(Number(req.params.id));
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  };

  public createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;
    const task = await this.taskService.createTask(title, description);
    res.status(201).json(task);
  };

  public updateTask = async (req: Request, res: Response): Promise<void> => {
    const updates = req.body;
    const task = await this.taskService.updateTask(
      Number(req.params.id),
      updates
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  };

  public deleteTask = async (req: Request, res: Response): Promise<void> => {
    const success = await this.taskService.deleteTask(Number(req.params.id));
    if (!success) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json({ message: "Task deleted successfully" });
  };
}
